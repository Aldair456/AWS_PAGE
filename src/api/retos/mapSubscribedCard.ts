import type { RetoApiItem } from './types'
import { mapRetoToCatalogCard, type CatalogChallengeCard } from './mapCatalogCard'
import { parseInscripcionFromReto } from '../suscripciones/parseInscripcion'

export type SubscribedChallengeCard = CatalogChallengeCard & {
  inscripcionId: string
}

export function mapSuscripcionRetoToCard(reto: RetoApiItem): SubscribedChallengeCard | null {
  const inscripcionId = parseInscripcionFromReto(reto)
  if (!inscripcionId) return null

  return {
    ...mapRetoToCatalogCard(reto),
    inscripcionId,
  }
}

/** Evita tarjetas duplicadas si el API repite la misma inscripción. */
export function dedupeSuscripcionRetos(retos: RetoApiItem[]): RetoApiItem[] {
  const seen = new Set<string>()
  const result: RetoApiItem[] = []

  for (const reto of retos) {
    const key = parseInscripcionFromReto(reto) ?? reto.id
    if (seen.has(key)) continue
    seen.add(key)
    result.push(reto)
  }

  return result
}
