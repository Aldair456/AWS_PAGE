import { ApiError } from '../client'
import { buildPublicCertificacionUrl } from '../../utils/certificacionLinks'
import { postEmailCertificacion } from '../emails/postEmailCertificacion'
import { postCertificacion } from './postCertificacion'
import type { CertificacionCreated } from './types'

export type CreateCertificacionWithEmailResult = {
  certificacion: CertificacionCreated
  link: string
  emailSent: boolean
  emailError?: string
}

const certificacionPromises = new Map<string, Promise<CreateCertificacionWithEmailResult>>()

export function clearCertificacionDedupe(resultadoId?: string): void {
  if (resultadoId) certificacionPromises.delete(resultadoId.trim())
  else certificacionPromises.clear()
}

async function createCertificacionWithEmailOnce(
  resultadoId: string,
): Promise<CreateCertificacionWithEmailResult> {
  const certificacion = await postCertificacion(resultadoId)
  const link = buildPublicCertificacionUrl(certificacion.id)

  try {
    await postEmailCertificacion(certificacion.id, link)
    console.log('[Certificación] Correo enviado', { certificacion_id: certificacion.id, link })
    return { certificacion, link, emailSent: true }
  } catch (error) {
    let message = 'Error al enviar correo'
    if (error instanceof ApiError && error.body && typeof error.body === 'object') {
      const bodyMsg = (error.body as Record<string, unknown>).message
      if (typeof bodyMsg === 'string' && bodyMsg.trim()) message = bodyMsg
    } else if (error instanceof Error) {
      message = error.message
    }
    console.log('[Certificación] Certificación creada; falló el correo', error)
    return { certificacion, link, emailSent: false, emailError: message }
  }
}

/**
 * Crea certificación en BD y envía correo con el link público (una sola vez por resultado_id).
 */
export function createCertificacionWithEmail(
  resultadoId: string,
): Promise<CreateCertificacionWithEmailResult> {
  const id = resultadoId.trim()
  const existing = certificacionPromises.get(id)
  if (existing) {
    console.log('[Certificación] Reutilizando creación en curso', { resultado_id: id })
    return existing
  }

  const promise = createCertificacionWithEmailOnce(id)
  certificacionPromises.set(id, promise)
  return promise
}
