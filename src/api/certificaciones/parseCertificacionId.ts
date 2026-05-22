import type { PostCertificacionResponse } from './types'

/** El POST devuelve `id` en la raíz del body (certificación creada). */
export function parseCertificacionId(data: PostCertificacionResponse): string | null {
  if (typeof data.id === 'string' && data.id.trim()) return data.id.trim()

  const nested = data.certificacion
  if (nested && typeof nested === 'object') {
    const row = nested as Record<string, unknown>
    const id = row.id ?? row.certificacion_id
    if (typeof id === 'string' && id.trim()) return id.trim()
  }

  if (typeof data.certificacion_id === 'string' && data.certificacion_id.trim()) {
    return data.certificacion_id.trim()
  }

  return null
}
