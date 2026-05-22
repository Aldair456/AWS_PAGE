import type { RetoApiItem } from '../retos/types'

export function parseInscripcionId(data: Record<string, unknown>): string | undefined {
  const suscripcion =
    data.suscripcion && typeof data.suscripcion === 'object'
      ? (data.suscripcion as Record<string, unknown>)
      : null

  const candidates = [
    data.inscripcion_id,
    data.inscripcionId,
    suscripcion?.id,
    suscripcion?.inscripcion_id,
    data.suscripcion_id,
    data.suscripcionId,
  ]

  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return undefined
}

export function parseInscripcionFromReto(reto: RetoApiItem): string | undefined {
  const id = reto.inscripcion_id?.trim() ?? reto.inscripcionId?.trim()
  return id || undefined
}
