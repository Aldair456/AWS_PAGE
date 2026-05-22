import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { dedupeSuscripcionRetos, resolveRetoApiId } from '../../api/retos'
import {
  getSuscripcionRetos,
  parseInscripcionFromReto,
  parseInscripcionId,
  postSuscripcion,
} from '../../api/suscripciones'
import { saveInscripcionId } from '../../utils/inscripcionSession'
import {
  isAlreadySubscribedError,
  markSubscribedLocally,
  SUBSCRIBE_NOTICE,
} from '../../utils/challengeSubscription'
import { fetchRetoSubscriptionStatus } from '../../utils/subscriptionStatus'
import { getStudentSession } from '../../utils/studentSession'
import { getCareerProfile } from '../../data/careerProfiles'
import {
  getChallengeById,
  getChallengesForCareer,
  outlineItemTitle,
} from '../../data/companyChallenges'
import guidePdfAgentesIa from '../../assets/Guia_Reto_BCP_Agentes_IA.pdf'
import { CareerProfileLayout } from '../CareerProfile/CareerProfileLayout'
import './ChallengeDetailPage.css'

type TabId = 'details' | 'outline'

function IconStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff9900" aria-hidden>
      <path d="M12 2l3.1 6.3 7 .9-5.1 4.8 1.2 7L12 17.8 6.8 21l1.2-7-5.1-4.8 7-.9L12 2z" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#545b64" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="#545b64" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#545b64" strokeWidth="1.5" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="#545b64" strokeWidth="1.5" />
    </svg>
  )
}

function EnrollIllustration() {
  return (
    <svg className="challenge-detail__enroll-art" viewBox="0 0 72 72" fill="none" aria-hidden>
      <rect x="14" y="22" width="44" height="32" rx="4" stroke="#16191f" strokeWidth="1.5" />
      <path d="M22 54V62M50 54V62M18 62H54" stroke="#16191f" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="38" r="3" fill="#16191f" />
      <circle cx="44" cy="38" r="3" fill="#16191f" />
      <path d="M30 46H42" stroke="#16191f" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 14v8M28 18h16" stroke="#16191f" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function InfoIcon({ type }: { type: 'domain' | 'access' | 'level' | 'date' }) {
  const common = { stroke: '#16191f', strokeWidth: 1.5, fill: 'none' as const }
  if (type === 'domain') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
        <circle cx="11" cy="11" r="7" {...common} />
        <path d="M20 20l-4-4" {...common} strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'access') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
        <path d="M5 12h14M12 5l7 7-7 7" {...common} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'level') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
        <path d="M4 18V8M10 18V4M16 18v-6M22 18V10" {...common} strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" {...common} />
      <path d="M8 3v4M16 3v4M4 10h16" {...common} strokeLinecap="round" />
    </svg>
  )
}

export function ChallengeDetailPage() {
  const { careerId, challengeId } = useParams<{ careerId: string; challengeId: string }>()
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabId>('details')
  const [enrollLoading, setEnrollLoading] = useState(false)
  const [enrollError, setEnrollError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrollStatusLoading, setEnrollStatusLoading] = useState(true)
  const profile = getCareerProfile(careerId)
  const challenge = challengeId ? getChallengeById(challengeId) : undefined

  const careerChallenges = profile ? getChallengesForCareer(profile.id) : []
  const challengeInCareer = challenge && careerChallenges.some((c) => c.id === challenge.id)

  if (!profile || !challenge || !challengeInCareer) {
    return <Navigate to="/estudiante/panel" replace />
  }

  const catalogPath = `/estudiante/carrera/${profile.id}`
  const workspacePath = `/estudiante/carrera/${profile.id}/reto/${challenge.id}/aprender`

  useEffect(() => {
    let cancelled = false

    async function loadEnrollmentStatus() {
      const session = getStudentSession()
      if (!session?.estudianteId || !challengeId) {
        if (!cancelled) {
          setIsEnrolled(false)
          setEnrollStatusLoading(false)
        }
        return
      }

      try {
        const status = await fetchRetoSubscriptionStatus(
          session.estudianteId,
          challengeId,
          challenge.title,
        )
        if (!cancelled) setIsEnrolled(status.subscribed)
      } catch {
        if (!cancelled) setIsEnrolled(false)
      } finally {
        if (!cancelled) setEnrollStatusLoading(false)
      }
    }

    void loadEnrollmentStatus()
    return () => {
      cancelled = true
    }
  }, [challengeId, challenge.title])

  const persistInscripcionForReto = async (estudianteId: string, retoId: string) => {
    try {
      const { retos } = await getSuscripcionRetos(estudianteId)
      const match = dedupeSuscripcionRetos(retos).find((reto) => reto.id === retoId)
      const inscripcionId = match ? parseInscripcionFromReto(match) : undefined
      if (inscripcionId) {
        saveInscripcionId(estudianteId, retoId, inscripcionId)
      }
      return inscripcionId
    } catch {
      return undefined
    }
  }

  const goToWorkspace = (opts?: { notice?: string; inscripcionId?: string }) => {
    const state: { subscribeNotice?: string; inscripcionId?: string } = {}
    if (opts?.notice) state.subscribeNotice = opts.notice
    if (opts?.inscripcionId) state.inscripcionId = opts.inscripcionId
    navigate(workspacePath, Object.keys(state).length > 0 ? { state } : undefined)
  }

  const handleSubscribe = async () => {
    const session = getStudentSession()
    if (!session?.estudianteId) {
      setEnrollError('Regístrate o inicia sesión para obtener tu ID de estudiante antes de suscribirte.')
      return
    }

    if (!challengeId) return

    if (isEnrolled) {
      const status = await fetchRetoSubscriptionStatus(
        session.estudianteId,
        challengeId,
        challenge.title,
      )
      goToWorkspace({ inscripcionId: status.inscripcionId })
      return
    }

    setEnrollLoading(true)
    setEnrollError(null)

    try {
      const retoId = await resolveRetoApiId(challengeId, challenge.title)
      if (!retoId) {
        setEnrollError('No encontramos este reto en el servidor. Intenta desde el catálogo.')
        return
      }

      const currentStatus = await fetchRetoSubscriptionStatus(
        session.estudianteId,
        challengeId,
        challenge.title,
      )
      if (currentStatus.subscribed) {
        setIsEnrolled(true)
        goToWorkspace({
          notice: SUBSCRIBE_NOTICE.alreadySubscribed,
          inscripcionId: currentStatus.inscripcionId,
        })
        return
      }

      try {
        const suscripcionResponse = await postSuscripcion({
          estudiante_id: session.estudianteId,
          reto_id: retoId,
        })
        const inscripcionId = parseInscripcionId(suscripcionResponse)
        if (inscripcionId) {
          saveInscripcionId(session.estudianteId, retoId, inscripcionId)
        }
        markSubscribedLocally(session.estudianteId, retoId)
        setIsEnrolled(true)
        goToWorkspace({
          notice: SUBSCRIBE_NOTICE.newSubscription,
          inscripcionId,
        })
      } catch (subscribeError) {
        if (isAlreadySubscribedError(subscribeError)) {
          markSubscribedLocally(session.estudianteId, retoId)
          setIsEnrolled(true)
          const inscripcionId = await persistInscripcionForReto(session.estudianteId, retoId)
          goToWorkspace({ notice: SUBSCRIBE_NOTICE.alreadySubscribed, inscripcionId })
          return
        }
        throw subscribeError
      }
    } catch (error) {
      const message =
        error instanceof ApiError
          ? typeof error.body === 'object' &&
            error.body !== null &&
            'message' in error.body &&
            typeof (error.body as { message: unknown }).message === 'string'
            ? (error.body as { message: string }).message
            : `No se pudo suscribir (${error.status})`
          : 'No se pudo completar la suscripción. Revisa tu conexión.'
      setEnrollError(message)
    } finally {
      setEnrollLoading(false)
    }
  }

  const breadcrumbs = (
    <nav className="challenge-detail__breadcrumbs" aria-label="Ruta de navegación">
      <Link to="/estudiante/panel">Mi panel</Link>
      <span aria-hidden>&gt;</span>
      <Link to={catalogPath}>{profile.career}</Link>
      <span aria-hidden>&gt;</span>
      <span className="challenge-detail__breadcrumb-current">{challenge.title}</span>
    </nav>
  )

  return (
    <CareerProfileLayout profile={profile} variant="detail" breadcrumbs={breadcrumbs}>
      <div className="challenge-detail">
        <header className="challenge-detail__header">
          <div className="challenge-detail__header-main">
            <h1 className="challenge-detail__title">{challenge.title}</h1>
            <ul className="challenge-detail__meta" aria-label="Información del reto">
              <li>Reto {challenge.company}</li>
              <li>
                <span className="challenge-detail__meta-rating">
                  <IconStar />
                  {challenge.rating.toFixed(1)} ({challenge.reviews})
                </span>
              </li>
              <li>
                <IconClock />
                {challenge.duration}
              </li>
              <li>
                <IconGlobe />
                {challenge.language}
              </li>
              <li>{challenge.format}</li>
            </ul>

            <div className="challenge-detail__tabs" role="tablist" aria-label="Secciones del reto">
              <button
                type="button"
                role="tab"
                id="tab-details"
                aria-selected={tab === 'details'}
                aria-controls="panel-details"
                className={`challenge-detail__tab ${tab === 'details' ? 'challenge-detail__tab--active' : ''}`}
                onClick={() => setTab('details')}
              >
                Detalles
              </button>
              <button
                type="button"
                role="tab"
                id="tab-outline"
                aria-selected={tab === 'outline'}
                aria-controls="panel-outline"
                className={`challenge-detail__tab ${tab === 'outline' ? 'challenge-detail__tab--active' : ''}`}
                onClick={() => setTab('outline')}
              >
                Guía
              </button>
            </div>
          </div>

          <aside className="challenge-detail__enroll" aria-label="Inscripción al reto">
            <div className="challenge-detail__enroll-card">
              <EnrollIllustration />
              <div className="challenge-detail__enroll-body">
                <h2 className="challenge-detail__enroll-heading">
                  {isEnrolled ? 'Tu reto' : 'Comenzar el reto'}
                </h2>
                <p className="challenge-detail__enroll-caption">{challenge.title}</p>
                <p className="challenge-detail__enroll-msg">
                  {isEnrolled
                    ? 'Ya estás inscrito. Continúa con las lecciones y entregas dentro del plazo.'
                    : challenge.enrollMessage}
                </p>
                {isEnrolled && (
                  <p className="challenge-detail__enroll-status" aria-live="polite">
                    Suscrito
                  </p>
                )}
                <button
                  type="button"
                  className={`challenge-detail__enroll-btn ${
                    isEnrolled ? 'challenge-detail__enroll-btn--enrolled' : ''
                  }`}
                  disabled={enrollLoading || enrollStatusLoading}
                  onClick={() => void handleSubscribe()}
                >
                  {enrollStatusLoading
                    ? 'Cargando…'
                    : enrollLoading
                      ? 'Suscribiendo…'
                      : isEnrolled
                        ? 'Continuar el reto'
                        : challenge.enrollCta}
                </button>
                {enrollError && (
                  <p className="challenge-detail__enroll-error" role="alert">
                    {enrollError}
                  </p>
                )}
                <p className="challenge-detail__enroll-hint">{challenge.enrollHint}</p>
              </div>
            </div>
          </aside>
        </header>

        <div className="challenge-detail__layout">
          <div className="challenge-detail__main">
            {tab === 'details' && (
              <div
                id="panel-details"
                className="challenge-detail__panel"
                role="tabpanel"
                aria-labelledby="tab-details"
              >
                <section className="challenge-detail__card">
                  <h2 className="challenge-detail__card-title">Descripción general</h2>
                  {challenge.descriptionSections && challenge.descriptionSections.length > 0 ? (
                    <div className="challenge-detail__card-text-block">
                      {challenge.descriptionSections.map((paragraph) => (
                        <p key={paragraph} className="challenge-detail__card-text">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="challenge-detail__card-text">{challenge.description}</p>
                  )}
                </section>

                {challenge.benefits && challenge.benefits.length > 0 && (
                  <section className="challenge-detail__card">
                    <h2 className="challenge-detail__card-title">Beneficios</h2>
                    <ul className="challenge-detail__benefits-list">
                      {challenge.benefits.map((benefit) => (
                        <li key={benefit.title} className="challenge-detail__benefit">
                          <h3 className="challenge-detail__benefit-title">{benefit.title}</h3>
                          <p className="challenge-detail__card-text">{benefit.text}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="challenge-detail__card">
                  <h2 className="challenge-detail__card-title">Objetivos</h2>
                  <ul className="challenge-detail__list">
                    {challenge.objectives.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="challenge-detail__card">
                  <h2 className="challenge-detail__card-title">Herramientas y enfoques</h2>
                  <ul className="challenge-detail__list">
                    {challenge.services.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="challenge-detail__card">
                  <h2 className="challenge-detail__card-title">Público objetivo</h2>
                  <ul className="challenge-detail__list">
                    {challenge.audience.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="challenge-detail__card">
                  <h2 className="challenge-detail__card-title">
                    Conocimientos previos que se recomiendan
                  </h2>
                  <p className="challenge-detail__card-text">{challenge.prerequisites}</p>
                </section>

                <section className="challenge-detail__card challenge-detail__card--ratings">
                  <h2 className="challenge-detail__card-title">Calificaciones</h2>
                  <div className="challenge-detail__ratings">
                    <div className="challenge-detail__rating-summary">
                      <span className="challenge-detail__rating-score">
                        {challenge.rating.toFixed(1)}
                      </span>
                      <span className="challenge-detail__rating-stars" aria-hidden>
                        <IconStar />
                        <IconStar />
                        <IconStar />
                        <IconStar />
                        <IconStar />
                      </span>
                      <span className="challenge-detail__rating-count">({challenge.reviews})</span>
                    </div>
                    <p className="challenge-detail__rating-note">
                      Valoraciones de estudiantes que completaron este reto con la empresa aliada.
                    </p>
                  </div>
                </section>
              </div>
            )}

            {tab === 'outline' && (
              <div
                id="panel-outline"
                className="challenge-detail__panel"
                role="tabpanel"
                aria-labelledby="tab-outline"
              >
                {challenge.id === 'ind-1' && (
                  <section
                    className="challenge-detail__card challenge-detail__card--pdf-guide"
                    aria-labelledby="challenge-pdf-guide-heading"
                  >
                    <h2 id="challenge-pdf-guide-heading" className="challenge-detail__card-title">
                      Guía de desarrollo del reto
                    </h2>
                    <p className="challenge-detail__card-text">
                      Descarga el documento con orientación para desarrollar el agente en Agent Builder,
                      integrarlo con el caso BCP y desplegarlo en tu proveedor cloud elegido.
                    </p>
                    <a
                      href={guidePdfAgentesIa}
                      download="Guia_Reto_BCP_Agentes_IA.pdf"
                      className="challenge-detail__pdf-download"
                    >
                      Descargar guía en PDF
                    </a>
                  </section>
                )}
                {challenge.guideResources && challenge.guideResources.length > 0 ? (
                  <>
                    <section className="challenge-detail__card">
                      <h2 className="challenge-detail__card-title">Recursos</h2>
                      <p className="challenge-detail__card-text">
                        Consulta el catálogo de servicios de cada proveedor cloud y herramientas de
                        apoyo (por ejemplo draw.io, Lucidchart o Postman) para diagramar, documentar
                        y probar tu agente al crearlo e implementarlo.
                      </p>
                    </section>
                    {challenge.guideResources.map((group) => (
                      <section key={group.provider} className="challenge-detail__card">
                        <h2 className="challenge-detail__card-title">{group.provider}</h2>
                        {group.description && (
                          <p className="challenge-detail__card-text">{group.description}</p>
                        )}
                        <ul className="challenge-detail__resource-links">
                          {group.links.map((link) => (
                            <li key={link.url}>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="challenge-detail__resource-link"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </>
                ) : (
                  challenge.outline.map((block) => (
                    <section key={block.title} className="challenge-detail__card">
                      <h2 className="challenge-detail__card-title">{block.title}</h2>
                      <ul className="challenge-detail__list">
                        {block.items.map((item) => (
                          <li key={outlineItemTitle(item)}>{outlineItemTitle(item)}</li>
                        ))}
                      </ul>
                    </section>
                  ))
                )}
              </div>
            )}
          </div>

          <aside className="challenge-detail__sidebar" aria-label="Información general">
            <section className="challenge-detail__info-card">
              <h2 className="challenge-detail__info-heading">Información general</h2>
              <ul className="challenge-detail__info-grid">
                <li>
                  <InfoIcon type="domain" />
                  <div>
                    <span className="challenge-detail__info-label">Dominio</span>
                    <span className="challenge-detail__info-value">{challenge.domain}</span>
                  </div>
                </li>
                <li>
                  <InfoIcon type="access" />
                  <div>
                    <span className="challenge-detail__info-label">Acceder</span>
                    <span className="challenge-detail__info-value">{challenge.accessNote}</span>
                  </div>
                </li>
                <li>
                  <InfoIcon type="level" />
                  <div>
                    <span className="challenge-detail__info-label">Nivel</span>
                    <span className="challenge-detail__info-value">{challenge.level}</span>
                  </div>
                </li>
                <li>
                  <InfoIcon type="date" />
                  <div>
                    <span className="challenge-detail__info-label">Última actualización</span>
                    <span className="challenge-detail__info-value">{challenge.lastUpdated}</span>
                  </div>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </CareerProfileLayout>
  )
}
