import { ApiError, buildEvaluacionesUrl } from '../client'
import { mapEvaluacionResultFromPostResponse } from './mapEvaluacionResult'
import { EVALUACIONES_POST } from './routes'
import type { EvaluacionDisplayResult, PostEvaluacionBody, PostEvaluacionResponse } from './types'

/** Una sola vez por inscripción (evita doble POST en React Strict Mode). */
const postSentForInscripcion = new Set<string>()
const postInFlightForInscripcion = new Set<string>()

export function clearEvaluacionPostSent(inscripcionId: string): void {
  postSentForInscripcion.delete(inscripcionId)
}

/**
 * Dispara POST /evaluaciones sin esperar respuesta (fire-and-forget).
 * El resultado se obtiene solo con GET /evaluaciones/resultado.
 * @returns false si ya se envió para esta inscripción (salvo force).
 */
export function triggerEvaluacionPost(inscripcionId: string, options?: { force?: boolean }): boolean {
  const id = inscripcionId.trim()

  if (postInFlightForInscripcion.has(id)) {
    console.log('[API evaluaciones] POST omitido (ya en vuelo)', { inscripcion_id: id })
    return false
  }

  if (!options?.force && postSentForInscripcion.has(id)) {
    console.log('[API evaluaciones] POST omitido (ya enviado una vez)', { inscripcion_id: id })
    return false
  }

  postSentForInscripcion.add(id)
  postInFlightForInscripcion.add(id)

  const url = buildEvaluacionesUrl(EVALUACIONES_POST)
  const body: PostEvaluacionBody = { inscripcion_id: inscripcionId }

  if (options?.force) {
    console.log('[API evaluaciones] POST reenviado (nueva evaluación)', url, body)
  } else {
    console.log('[API evaluaciones] POST (fire-and-forget, una vez)', url, body)
  }

  void fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      let responseBody: unknown
      try {
        responseBody = await response.json()
      } catch {
        responseBody = undefined
      }

      if (response.status === 504) {
        console.log(
          '[API evaluaciones] POST 504 Gateway Timeout (esperado si la IA tarda; no bloquea — el GET hace polling)',
          { inscripcion_id: inscripcionId, body: responseBody },
        )
        return
      }

      if (!response.ok) {
        console.log('[API evaluaciones] POST respuesta no OK (no bloquea UI)', {
          status: response.status,
          inscripcion_id: inscripcionId,
          body: responseBody,
        })
        return
      }

      console.log('[API evaluaciones] POST OK (fire-and-forget)', {
        status: response.status,
        inscripcion_id: inscripcionId,
        body: responseBody,
      })
    })
    .catch((error) => {
      console.log('[API evaluaciones] POST error de red (no bloquea UI)', error)
    })
    .finally(() => {
      postInFlightForInscripcion.delete(id)
    })

  return true
}

export async function postEvaluacion(
  inscripcionId: string,
): Promise<{ raw: PostEvaluacionResponse; mapped: EvaluacionDisplayResult | null }> {
  const url = buildEvaluacionesUrl(EVALUACIONES_POST)
  const body: PostEvaluacionBody = { inscripcion_id: inscripcionId }

  console.log('[API evaluaciones] POST', url, body)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let errorBody: unknown
    try {
      errorBody = await response.json()
    } catch {
      errorBody = undefined
    }
    console.log('[API evaluaciones] POST error', { status: response.status, body: errorBody })
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  const data = (await response.json()) as PostEvaluacionResponse
  console.log('[API evaluaciones] POST OK', data)

  return {
    raw: data,
    mapped: mapEvaluacionResultFromPostResponse(data),
  }
}
