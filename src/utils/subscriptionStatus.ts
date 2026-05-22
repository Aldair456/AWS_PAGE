import { resolveRetoApiId } from '../api/retos'
import { dedupeSuscripcionRetos } from '../api/retos/mapSubscribedCard'
import { getSuscripcionRetos, parseInscripcionFromReto } from '../api/suscripciones'
import { getInscripcionId, saveInscripcionId } from './inscripcionSession'
import { isSubscribedLocally, markSubscribedLocally } from './challengeSubscription'

export type RetoSubscriptionStatus = {
  subscribed: boolean
  retoId: string | null
  inscripcionId?: string
}

/**
 * Valida si el estudiante está inscrito en un reto usando el API (fuente de verdad).
 * GET /suscripciones/retos?estudiante_id=…
 * Si el API falla, usa caché local como respaldo.
 */
export async function fetchRetoSubscriptionStatus(
  estudianteId: string,
  challengeRouteId: string,
  challengeTitle: string,
): Promise<RetoSubscriptionStatus> {
  const retoId = await resolveRetoApiId(challengeRouteId, challengeTitle)
  if (!retoId) {
    return { subscribed: false, retoId: null }
  }

  try {
    const { retos } = await getSuscripcionRetos(estudianteId)
    const uniqueRetos = dedupeSuscripcionRetos(retos)
    const match = uniqueRetos.find(
      (reto) => reto.id === retoId || reto.titulo.trim() === challengeTitle.trim(),
    )

    if (match) {
      const inscripcionId = parseInscripcionFromReto(match)
      markSubscribedLocally(estudianteId, match.id)
      if (inscripcionId) {
        saveInscripcionId(estudianteId, match.id, inscripcionId)
      }
      return {
        subscribed: true,
        retoId: match.id,
        inscripcionId,
      }
    }

    return { subscribed: false, retoId }
  } catch {
    const subscribed = isSubscribedLocally(estudianteId, retoId)
    return {
      subscribed,
      retoId,
      inscripcionId: subscribed ? getInscripcionId(estudianteId, retoId) : undefined,
    }
  }
}
