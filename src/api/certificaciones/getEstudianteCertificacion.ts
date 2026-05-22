import { ApiError, buildCertificacionesUrl } from '../client'
import { CERTIFICACIONES_ESTUDIANTE } from './routes'
import type { EstudianteCertificacion, GetEstudianteCertificacionResponse } from './types'

export async function getEstudianteCertificacion(
  certificacionId: string,
): Promise<EstudianteCertificacion> {
  const params = new URLSearchParams({ certificacion_id: certificacionId.trim() })
  const url = `${buildCertificacionesUrl(CERTIFICACIONES_ESTUDIANTE)}?${params.toString()}`

  console.log('[API certificaciones] GET estudiante', url)

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

  const data = (await response.json()) as GetEstudianteCertificacionResponse
  const estudiante = data.estudiante

  if (!estudiante?.nombre?.trim()) {
    throw new ApiError('No se encontró información del estudiante para esta certificación.', 404, data)
  }

  return {
    nombre: estudiante.nombre.trim(),
    carrera: typeof estudiante.carrera === 'string' ? estudiante.carrera.trim() : '',
  }
}
