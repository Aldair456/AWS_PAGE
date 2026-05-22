import { ApiError, buildEmailsUrl } from '../client'
import { EMAILS_CERTIFICACION_POST } from './routes'
import type { PostEmailCertificacionBody } from './types'

export async function postEmailCertificacion(
  certificacionId: string,
  link: string,
): Promise<void> {
  const url = buildEmailsUrl(EMAILS_CERTIFICACION_POST)
  const body: PostEmailCertificacionBody = {
    certificacion_id: certificacionId.trim(),
    link: link.trim(),
  }

  console.log('[API emails] POST certificacion', url, body)

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
    console.log('[API emails] POST error', { status: response.status, body: errorBody })
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  console.log('[API emails] POST OK')
}
