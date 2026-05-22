import { ApiError, buildEvaluacionesUrl } from '../client'
import { mapEvaluacionResultFromRecord } from './mapEvaluacionResult'
import { EVALUACIONES_RESULTADO } from './routes'
import type { EvaluacionDisplayResult, GetResultadoResponse } from './types'

export type GetEvaluacionPollContext = {
  attempt: number
  maxAttempts: number
}

async function readJsonBody(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return undefined
  }
}

function messageFromBody(body: unknown): string {
  if (!body || typeof body !== 'object') return ''
  const record = body as Record<string, unknown>
  return String(record.message ?? record.error ?? '').toLowerCase()
}

/** Sin resultado aún: 404, 504 o 400 "La inscripcion no tiene resultado". */
function isNotReadyResponse(status: number, body?: unknown): boolean {
  if (status === 404 || status === 502 || status === 503 || status === 504) return true
  if (status === 400) {
    const msg = messageFromBody(body)
    return (
      msg.includes('no tiene resultado') ||
      msg.includes('sin resultado') ||
      msg.includes('not found')
    )
  }
  return false
}

export async function getEvaluacionResultado(
  inscripcionId: string,
  poll?: GetEvaluacionPollContext,
): Promise<EvaluacionDisplayResult | null> {
  const params = new URLSearchParams({ inscripcion_id: inscripcionId })
  const url = `${buildEvaluacionesUrl(EVALUACIONES_RESULTADO)}?${params.toString()}`
  const pollLabel = poll ? ` [polling ${poll.attempt}/${poll.maxAttempts}]` : ''

  console.log(`[API evaluaciones] GET resultado${pollLabel}`, { url, inscripcion_id: inscripcionId })

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  const body = await readJsonBody(response)

  console.log(`[API evaluaciones] GET resultado${pollLabel} ← status`, response.status, body)

  if (isNotReadyResponse(response.status, body)) {
    console.log(
      `[API evaluaciones] GET resultado${pollLabel} aún no listo (${response.status}), sigue polling`,
      body,
    )
    return null
  }

  if (!response.ok) {
    console.log(`[API evaluaciones] GET resultado${pollLabel} error`, {
      status: response.status,
      body,
    })
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, body)
  }

  const data = body as GetResultadoResponse
  const mapped = mapEvaluacionResultFromRecord(data?.resultado)

  if (!mapped) {
    console.log(
      `[API evaluaciones] GET resultado${pollLabel} 200 sin contenido usable, sigue polling`,
      data,
    )
    return null
  }

  console.log(`[API evaluaciones] GET resultado${pollLabel} OK`, {
    puntuacion: mapped.puntuacion,
    estado: mapped.estado,
  })

  return mapped
}
