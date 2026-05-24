import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  dedupeSuscripcionRetos,
  formatRetoStatus,
  mapSuscripcionRetoToCard,
  shouldShowRetoStatusBadge,
  type SubscribedChallengeCard,
} from '../../api/retos'
import { getSuscripcionRetos } from '../../api/suscripciones'
import { ScrollReveal } from '../ScrollReveal'
import { markSubscribedLocally } from '../../utils/challengeSubscription'
import { saveInscripcionId } from '../../utils/inscripcionSession'
import { buildWorkspaceSubmissionPath } from '../../utils/submissionNavigation'
import logoDita from '../../assets/lg_dita.png'
import '../CareerChallengeCatalog/CareerChallengeCatalog.css'
import './SubscribedChallengesList.css'

type SubscribedChallengesListProps = {
  estudianteId?: string
  careerId: string
  active: boolean
  onLoaded?: (count: number) => void
  onLoadingChange?: (loading: boolean) => void
}

const SKELETON_CARD_COUNT = 3

function IconStar() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#ff9900" aria-hidden>
      <path d="M12 2l3.1 6.3 7 .9-5.1 4.8 1.2 7L12 17.8 6.8 21l1.2-7-5.1-4.8 7-.9L12 2z" />
    </svg>
  )
}

function ChallengeCardSkeleton() {
  return (
    <article className="challenge-catalog__card challenge-catalog__card--skeleton" aria-hidden>
      <div className="challenge-catalog__card-top">
        <span className="challenge-catalog__skeleton challenge-catalog__skeleton--badge" />
        <span className="challenge-catalog__skeleton challenge-catalog__skeleton--logo" />
      </div>
      <span className="challenge-catalog__skeleton challenge-catalog__skeleton--title" />
      <span className="challenge-catalog__skeleton challenge-catalog__skeleton--title-short" />
      <div className="challenge-catalog__skeleton-detail">
        <span className="challenge-catalog__skeleton challenge-catalog__skeleton--label" />
        <span className="challenge-catalog__skeleton challenge-catalog__skeleton--line" />
      </div>
      <footer className="challenge-catalog__skeleton-footer">
        <span className="challenge-catalog__skeleton challenge-catalog__skeleton--chip" />
        <span className="challenge-catalog__skeleton challenge-catalog__skeleton--chip" />
      </footer>
    </article>
  )
}

export function SubscribedChallengesList({
  estudianteId,
  careerId,
  active,
  onLoaded,
  onLoadingChange,
}: SubscribedChallengesListProps) {
  const [cards, setCards] = useState<SubscribedChallengeCard[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loadedOnce, setLoadedOnce] = useState(false)

  useEffect(() => {
    if (!active) return

    if (!estudianteId) {
      setCards([])
      setLoadError(null)
      setLoading(false)
      setLoadedOnce(true)
      return
    }

    const studentId = estudianteId
    let cancelled = false

    async function load() {
      setLoading(true)
      onLoadingChange?.(true)
      setLoadError(null)
      try {
        const { retos } = await getSuscripcionRetos(studentId)
        if (cancelled) return

        const uniqueRetos = dedupeSuscripcionRetos(retos)
        const mapped = uniqueRetos
          .map(mapSuscripcionRetoToCard)
          .filter((card): card is SubscribedChallengeCard => card !== null)

        for (const reto of uniqueRetos) {
          markSubscribedLocally(studentId, reto.id)
          const card = mapped.find((c) => c.id === reto.id)
          if (card) {
            saveInscripcionId(studentId, reto.id, card.inscripcionId)
          }
        }

        setCards(mapped)
      } catch {
        if (!cancelled) {
          setLoadError('No se pudieron cargar tus retos. Intenta recargar la página.')
          setCards([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
          onLoadingChange?.(false)
          setLoadedOnce(true)
        }
      }
    }

    void load()
    return () => {
      cancelled = true
      onLoadingChange?.(false)
    }
  }, [active, estudianteId, onLoadingChange])

  const total = cards.length
  const showEmpty = loadedOnce && !loading && !loadError && total === 0

  useEffect(() => {
    if (!loadedOnce || loading) return
    onLoaded?.(loadError ? 0 : total)
  }, [loadedOnce, loading, loadError, total, onLoaded])

  const sorted = useMemo(() => [...cards], [cards])

  if (!estudianteId && loadedOnce) {
    return null
  }

  if (showEmpty) {
    return null
  }

  return (
    <div className="subscribed-challenges challenge-catalog">
      {loadError && (
        <p className="challenge-catalog__load-error" role="alert">
          {loadError}
        </p>
      )}

      <ul
        className="challenge-catalog__grid subscribed-challenges__grid"
        aria-busy={loading}
        aria-live="polite"
        aria-label={loading ? 'Cargando retos inscritos' : 'Retos a los que estás inscrito'}
      >
        {loading &&
          Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => (
            <li key={`skeleton-${i}`}>
              <ChallengeCardSkeleton />
            </li>
          ))}
        {!loading &&
          sorted.map((challenge, index) => {
            const showStatus = shouldShowRetoStatusBadge(challenge.status, 'subscribed')
            const statusFormatted = showStatus ? formatRetoStatus(challenge.status) : null
            const uploadTarget = buildWorkspaceSubmissionPath(
              careerId,
              challenge.routeId,
              challenge.inscripcionId,
            )

            return (
              <ScrollReveal as="li" key={challenge.inscripcionId} delay={index * 90}>
                <article className="challenge-catalog__card subscribed-challenges__card">
                  <div className="challenge-catalog__card-top">
                    <span className="challenge-catalog__card-source">Reto {challenge.company}</span>
                    <img
                      src={logoDita}
                      alt=""
                      aria-hidden
                      className="challenge-catalog__card-logo"
                    />
                  </div>

                  <h2 className="challenge-catalog__card-title">{challenge.title}</h2>
                  {statusFormatted && (
                    <span
                      className={`challenge-catalog__status challenge-catalog__status--${statusFormatted.tone}`}
                    >
                      {statusFormatted.label}
                    </span>
                  )}

                  <dl className="challenge-catalog__card-details">
                    <div className="challenge-catalog__detail-row">
                      <dt>Dominio</dt>
                      <dd>{challenge.domain}</dd>
                    </div>
                    <div className="challenge-catalog__detail-row">
                      <dt>Servicios</dt>
                      <dd>{challenge.competencies}</dd>
                    </div>
                  </dl>

                  <footer className="challenge-catalog__card-footer">
                    <span className="challenge-catalog__footer-item challenge-catalog__rating">
                      <IconStar />
                      {challenge.rating.toFixed(1)} ({challenge.reviews})
                    </span>
                    <span className="challenge-catalog__footer-item">{challenge.level}</span>
                    <span className="challenge-catalog__footer-item">{challenge.duration}</span>
                  </footer>

                  <div className="subscribed-challenges__actions">
                    <Link
                      to={`/estudiante/carrera/${careerId}/reto/${challenge.routeId}/aprender`}
                      className="subscribed-challenges__btn subscribed-challenges__btn--secondary"
                    >
                      Continuar reto
                    </Link>
                    <Link
                      to={uploadTarget}
                      className="subscribed-challenges__btn subscribed-challenges__btn--primary"
                    >
                      Subir entrega
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
      </ul>
    </div>
  )
}
