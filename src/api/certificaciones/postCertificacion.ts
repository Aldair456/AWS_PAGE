import { ApiError, buildCertificacionesUrl } from '../client'
import { CERTIFICACIONES_POST } from './routes'
import { parseCertificacionId } from './parseCertificacionId'
import type { CertificacionCreated, PostCertificacionBody, PostCertificacionResponse } from './types'

export async function postCertificacion(resultadoId: string): Promise<CertificacionCreated> {
  const url = buildCertificacionesUrl(CERTIFICACIONES_POST)
  const body: PostCertificacionBody = { resultado_id: resultadoId.trim() }

  console.log('[API certificaciones] POST', url, body)

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
    console.log('[API certificaciones] POST error', { status: response.status, body: errorBody })
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  const data = (await response.json()) as PostCertificacionResponse
  const id = parseCertificacionId(data)
  if (!id) {
    throw new ApiError('La API no devolvió el id de la certificación.', response.status, data)
  }

  console.log('[API certificaciones] POST OK', { certificacion_id: id, ...data })
  return { ...data, id }
}
