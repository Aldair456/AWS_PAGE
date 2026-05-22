import { ApiError } from '../client'
import { getEvaluacionResultado } from './getEvaluacionResultado'
import { triggerEvaluacionPost } from './postEvaluacion'
import type { EvaluacionDisplayResult } from './types'

/** Ignora resultados del GET anteriores al POST de esta corrida. */
function isStaleEvaluacionResult(
  result: EvaluacionDisplayResult,
  evaluationStartedAtMs: number,
): boolean {
  if (!result.evaluadoAt) return false
  const evaluatedMs = Date.parse(result.evaluadoAt)
  if (Number.isNaN(evaluatedMs)) return false
  return evaluatedMs < evaluationStartedAtMs - 3000
}

/** Intervalo entre consultas GET /evaluaciones/resultado */
const POLL_INTERVAL_MS = 60_000
const MAX_POLL_ATTEMPTS = 30

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(new DOMException('Evaluación cancelada', 'AbortError'))
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    const onAbort = () => {
      clearTimeout(timer)
      reject(new DOMException('Evaluación cancelada', 'AbortError'))
    }

    signal?.addEventListener('abort', onAbort)
  })
}

export type EvaluacionFlowCallbacks = {
  onProgress?: (percent: number, message: string) => void
}

/**
 * Dispara POST /evaluaciones (sin esperar) y hace polling GET /evaluaciones/resultado.
 */
export type RunEvaluacionFlowOptions = {
  /** true al pulsar «Volver a evaluar» para reenviar el POST */
  forcePost?: boolean
  /** Cancela polling anterior si el usuario vuelve a evaluar */
  signal?: AbortSignal
}

export async function runEvaluacionFlow(
  inscripcionId: string,
  callbacks?: EvaluacionFlowCallbacks,
  options?: RunEvaluacionFlowOptions,
): Promise<EvaluacionDisplayResult> {
  const { onProgress } = callbacks ?? {}
  const signal = options?.signal

  // El POST solo se dispara cuando el usuario subió archivos o pidió re-evaluar
  // explícitamente (forcePost=true). En carga inicial se va directo al polling GET.
  const postSent = options?.forcePost
    ? triggerEvaluacionPost(inscripcionId, { force: true })
    : false

  const evaluationStartedAtMs = postSent ? Date.now() : 0

  if (postSent) {
    console.log('[API evaluaciones] POST disparado (nueva subida / re-evaluación)', {
      inscripcion_id: inscripcionId,
    })
    onProgress?.(8, 'Enviando evaluación con IA…')
  } else {
    onProgress?.(8, 'Consultando resultado de evaluación…')
  }

  onProgress?.(15, 'Analizando tus archivos en la nube…')

  for (let attempt = 1; attempt <= MAX_POLL_ATTEMPTS; attempt++) {
    if (signal?.aborted) {
      throw new DOMException('Evaluación cancelada', 'AbortError')
    }
    const percent = Math.min(92, 20 + attempt * 2)
    const poll = { attempt, maxAttempts: MAX_POLL_ATTEMPTS }

    console.log('[API evaluaciones] polling: consultando GET resultado…', poll)

    let resultado = await getEvaluacionResultado(inscripcionId, poll)

    if (
      resultado &&
      evaluationStartedAtMs > 0 &&
      isStaleEvaluacionResult(resultado, evaluationStartedAtMs)
    ) {
      console.log('[API evaluaciones] polling: resultado anterior ignorado, esperando el nuevo', {
        evaluado_at: resultado.evaluadoAt,
        evaluationStartedAtMs,
      })
      resultado = null
    }

    if (resultado) {
      console.log('[API evaluaciones] polling: resultado nuevo recibido en intento', attempt)
      onProgress?.(100, 'Resultados listos')
      return resultado
    }

    console.log(
      '[API evaluaciones] polling: sin resultado aún, esperando',
      POLL_INTERVAL_MS / 1000,
      's antes del siguiente GET',
    )

    onProgress?.(
      percent,
      `Generando resultados… próxima consulta en 1 min (${attempt}/${MAX_POLL_ATTEMPTS})`,
    )

    await wait(POLL_INTERVAL_MS, signal)
  }

  throw new ApiError(
    'La evaluación está tardando más de lo esperado. Intenta recargar esta página en unos momentos.',
    504,
  )
}
