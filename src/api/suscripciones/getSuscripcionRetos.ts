import { ApiError, buildSuscripcionesUrl } from '../client'
import type { RetosListResponse } from '../retos/types'
import { SUSCRIPCIONES_RETOS } from './routes'

/**
 * GET …/dev/suscripciones/retos?estudiante_id={uuid}
 */
export async function getSuscripcionRetos(estudianteId: string): Promise<RetosListResponse> {
  const params = new URLSearchParams({ estudiante_id: estudianteId })
  const url = `${buildSuscripcionesUrl(SUSCRIPCIONES_RETOS)}?${params.toString()}`

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    let errorBody: unknown
    try {
      errorBody = await response.json()
    } catch {
      errorBody = undefined
    }
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  return (await response.json()) as RetosListResponse
}
