import { ApiError, buildSuscripcionesUrl } from '../client'
import { SUSCRIPCIONES_POST } from './routes'

export { getSuscripcionRetos } from './getSuscripcionRetos'
export { parseInscripcionFromReto, parseInscripcionId } from './parseInscripcion'

export type CreateSuscripcionBody = {
  estudiante_id: string
  reto_id: string
}

export type CreateSuscripcionResponse = Record<string, unknown>

/**
 * POST https://d2lszp0r0g.execute-api.us-east-1.amazonaws.com/dev/suscripciones
 */
export async function postSuscripcion(
  body: CreateSuscripcionBody,
): Promise<CreateSuscripcionResponse> {
  const url = buildSuscripcionesUrl(SUSCRIPCIONES_POST)
  console.log('[API suscripciones] POST', url, body)

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
    console.log('[API suscripciones] error', { status: response.status, body: errorBody })
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  if (response.status === 204) {
    console.log('[API suscripciones] OK', { status: response.status, data: null })
    return {}
  }

  const contentType = response.headers.get('Content-Type') ?? ''
  if (contentType.includes('application/json')) {
    const data = (await response.json()) as CreateSuscripcionResponse
    console.log('[API suscripciones] OK', { status: response.status, data })
    return data
  }

  const text = await response.text()
  console.log('[API suscripciones] OK', { status: response.status, data: text })
  return {}
}
