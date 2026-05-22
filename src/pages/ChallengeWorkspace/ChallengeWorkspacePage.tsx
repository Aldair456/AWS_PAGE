import { type ChangeEvent, type DragEvent, useEffect, useMemo, useRef, useState } from 'react'
import { ApiError } from '../../api/client'
import { resolveRetoApiId } from '../../api/retos'
import { clearEvaluacionPostSent } from '../../api/evaluaciones'
import { uploadSubmissionFiles } from '../../api/uploads'
import {
  loadSubmissionFilesDb,
  saveSubmissionFilesDb,
} from '../../utils/challengeSubmissionDb'
import { getInscripcionId, saveInscripcionId } from '../../utils/inscripcionSession'
import { getStudentSession } from '../../utils/studentSession'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Toast } from '../../components/Toast/Toast'
import { WorkspaceEvaluationPanel } from '../../components/WorkspaceEvaluation/WorkspaceEvaluationPanel'
import { getCareerProfile } from '../../data/careerProfiles'
import { getChallengeById, getChallengesForCareer } from '../../data/companyChallenges'
import {
  buildChallengeSections,
  getAllLessons,
  getLessonById,
} from '../../data/challengeWorkspace'
import './ChallengeWorkspacePage.css'

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#0073bb" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#aab7b8" strokeWidth="1.5" />
    </svg>
  )
}

function IconInProgress() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#d5dbdb" strokeWidth="1.5" />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke="#0073bb"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconVideo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 10l4-2v8l-4-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function IconIntro() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 7h14M5 12h14M5 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconQuiz() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 9.5a2.5 2.5 0 0 1 4 2c0 1.5-2 1.5-2 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="0.75" fill="currentColor" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={expanded ? 'cw-sidebar__chevron cw-sidebar__chevron--open' : 'cw-sidebar__chevron'}
    >
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type LessonIconType = 'intro' | 'video' | 'quiz'

function LessonTypeIcon({ type }: { type: LessonIconType }) {
  if (type === 'intro') return <IconIntro />
  if (type === 'quiz') return <IconQuiz />
  return <IconVideo />
}

function getLessonIconType(lessonIndex: number, totalInSection: number): LessonIconType {
  if (lessonIndex === 0) return 'intro'
  if (lessonIndex === totalInSection - 1 && totalInSection > 1) return 'quiz'
  return 'video'
}

type WorkspaceLocationState = {
  subscribeNotice?: string
  inscripcionId?: string
}

export function ChallengeWorkspacePage() {
  const { careerId, challengeId } = useParams<{ careerId: string; challengeId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([])
  const [submissionDragging, setSubmissionDragging] = useState(false)
  const [submissionUploading, setSubmissionUploading] = useState(false)
  const [submissionUploadError, setSubmissionUploadError] = useState<string | null>(null)
  const [inscripcionId, setInscripcionId] = useState<string | null>(null)
  /** Incrementa tras cada subida exitosa para reiniciar evaluación IA */
  const [evalSession, setEvalSession] = useState(0)
  const submissionInputRef = useRef<HTMLInputElement>(null)
  const profile = getCareerProfile(careerId)
  const challenge = challengeId ? getChallengeById(challengeId) : undefined
  const careerChallenges = profile ? getChallengesForCareer(profile.id) : []
  const challengeInCareer = challenge && careerChallenges.some((c) => c.id === challenge.id)

  const sections = useMemo(() => (challenge ? buildChallengeSections(challenge) : []), [challenge])
  const lessons = useMemo(() => getAllLessons(sections), [sections])

  const lessonParam = searchParams.get('leccion')
  const activeLessonId = lessonParam && getLessonById(sections, lessonParam) ? lessonParam : lessons[0]?.id

  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set())
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    setExpandedSections(new Set(sections.map((section) => section.id)))
  }, [challengeId, sections])

  useEffect(() => {
    const state = location.state as WorkspaceLocationState | null
    if (!state || !careerId || !challengeId) return

    if (state.subscribeNotice) {
      setToastMessage(state.subscribeNotice)
      requestAnimationFrame(() => setToastVisible(true))
    }

    if (state.inscripcionId) {
      setInscripcionId(state.inscripcionId)
      const session = getStudentSession()
      if (session?.estudianteId && challenge) {
        void resolveRetoApiId(challengeId, challenge.title).then((retoId) => {
          if (retoId) saveInscripcionId(session.estudianteId!, retoId, state.inscripcionId!)
        })
      }
    }

    const workspaceUrl = `/estudiante/carrera/${careerId}/reto/${challengeId}/aprender${location.search}`
    navigate(workspaceUrl, { replace: true, state: null })
  }, [location.state, location.search, careerId, challengeId, challenge, navigate])

  useEffect(() => {
    if (inscripcionId) return

    const session = getStudentSession()
    if (!session?.estudianteId || !challengeId || !challenge) return

    let cancelled = false

    async function loadCachedInscripcion() {
      const retoId = await resolveRetoApiId(challengeId, challenge.title)
      if (!retoId || cancelled) return
      const cached = getInscripcionId(session.estudianteId, retoId)
      if (!cancelled && cached) setInscripcionId(cached)
    }

    void loadCachedInscripcion()
    return () => {
      cancelled = true
    }
  }, [inscripcionId, challengeId, challenge])

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!challengeId || !activeLessonId) return
      const lesson = getLessonById(sections, activeLessonId)
      if (!lesson?.workspaceSubmission) {
        setSubmissionFiles([])
        return
      }
      try {
        const stored = await loadSubmissionFilesDb(challengeId, activeLessonId)
        if (!cancelled) setSubmissionFiles(stored)
      } catch {
        if (!cancelled) setSubmissionFiles([])
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [challengeId, activeLessonId, sections])

  if (!profile || !challenge || !challengeInCareer || lessons.length === 0) {
    return <Navigate to="/estudiante/panel" replace />
  }

  const detailPath = `/estudiante/carrera/${profile.id}/reto/${challenge.id}`
  const activeLesson = getLessonById(sections, activeLessonId ?? '') ?? lessons[0]
  const activeIndex = lessons.findIndex((l) => l.id === activeLesson.id)
  const lessonVideoId = activeLesson.workspaceVideoId
  const isSubmissionStep = Boolean(activeLesson.workspaceSubmission)
  const submissionExplainerId = activeLesson.submissionExplainerVideoId
  const progressPct = Math.round((completedIds.size / lessons.length) * 100)

  const selectLesson = (id: string) => {
    setSearchParams({ leccion: id })
  }

  const markComplete = () => {
    setCompletedIds((prev) => new Set([...prev, activeLesson.id]))
    const next = lessons[activeIndex + 1]
    if (next) selectLesson(next.id)
  }

  const isLastStep = activeIndex === lessons.length - 1
  const isDemoFinalStep = isLastStep && !isSubmissionStep
  const showEvaluation = isDemoFinalStep && Boolean(inscripcionId)
  const feedbackPath = `${detailPath}/retroalimentacion`
  const resultsPath = `${detailPath}/resultados`

  const submissionInputId = `cw-upload-${challenge.id}-${activeLesson.id}`

  const appendSubmissionFiles = (incoming: File[]) => {
    if (!incoming.length) return
    setSubmissionFiles((prev) => {
      const next = [...prev, ...incoming]
      saveSubmissionFilesDb(challenge.id, activeLesson.id, next).catch(() => {
        /* modo privado o quota: la lista sigue en memoria esta sesión */
      })
      return next
    })
  }

  const onSubmissionPick = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files?.length) return
    appendSubmissionFiles(Array.from(files))
    e.target.value = ''
  }

  const removeSubmissionFile = (name: string, lastModified: number) => {
    setSubmissionFiles((prev) => {
      const next = prev.filter((f) => !(f.name === name && f.lastModified === lastModified))
      saveSubmissionFilesDb(challenge.id, activeLesson.id, next).catch(() => {})
      return next
    })
  }

  const onSubmissionDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = 'copy'
  }

  const onSubmissionDragEnter = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()
    setSubmissionDragging(true)
  }

  const onSubmissionDragLeave = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    if (!ev.currentTarget.contains(ev.relatedTarget as Node)) {
      setSubmissionDragging(false)
    }
  }

  const onSubmissionDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()
    setSubmissionDragging(false)
    const dt = ev.dataTransfer.files
    if (dt?.length) appendSubmissionFiles(Array.from(dt))
  }

  const showUploadToast = (message: string) => {
    setToastMessage(message)
    requestAnimationFrame(() => setToastVisible(true))
  }

  const handleUploadSubmission = async () => {
    if (!submissionFiles.length) {
      setSubmissionUploadError('Selecciona al menos un archivo antes de subir.')
      return
    }

    if (!inscripcionId) {
      setSubmissionUploadError(
        'No encontramos tu inscripción. Ve a Mi panel y usa «Subir entrega» en el reto correcto.',
      )
      return
    }

    setSubmissionUploading(true)
    setSubmissionUploadError(null)

    try {
      await uploadSubmissionFiles(inscripcionId, submissionFiles)

      setCompletedIds((prev) => new Set([...prev, activeLesson.id]))

      clearEvaluacionPostSent(inscripcionId)
      setEvalSession((n) => n + 1)

      const nextLesson = lessons[activeIndex + 1]
      if (nextLesson) {
        setSearchParams({ leccion: nextLesson.id }, { replace: true })
      }

      showUploadToast('Tus archivos se subieron correctamente. Evaluando de nuevo con IA…')
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'No se pudieron subir los archivos. Revisa tu conexión e intenta de nuevo.'
      setSubmissionUploadError(message)
    } finally {
      setSubmissionUploading(false)
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }

  return (
    <div className="challenge-workspace">
      <Toast message={toastMessage} visible={toastVisible} />
      <header className="challenge-workspace__topbar">
        <Link to={detailPath} className="challenge-workspace__back">
          ← Volver a la guía del reto
        </Link>
        <span className="challenge-workspace__topbar-meta">
          {challenge.company} · {profile.career}
        </span>
      </header>

      <div className="challenge-workspace__shell">
        <aside className="cw-sidebar" aria-label="Navegación del reto">
          <div className="cw-sidebar__module">
            <div className="cw-sidebar__module-top">
              <h1 className="cw-sidebar__module-title">{challenge.title}</h1>
              <button type="button" className="cw-sidebar__search" aria-label="Buscar en el reto">
                <IconSearch />
              </button>
            </div>
            <div className="cw-sidebar__progress">
              <div className="cw-sidebar__progress-track">
                <span className="cw-sidebar__progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="cw-sidebar__progress-text">{progressPct}% completo</span>
            </div>
          </div>

          <nav className="cw-sidebar__nav" aria-label="Pasos del reto">
            {sections.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(section.id)
              return (
                <div key={section.id} className="cw-sidebar__section">
                  <button
                    type="button"
                    className="cw-sidebar__section-toggle"
                    aria-expanded={isExpanded}
                    onClick={() => toggleSection(section.id)}
                  >
                    <IconChevron expanded={isExpanded} />
                    <span>
                      Módulo {sectionIndex + 1}: {section.title}
                    </span>
                  </button>

                  {isExpanded && (
                    <ul className="cw-sidebar__lessons">
                      {section.lessons.map((lesson, lessonIndex) => {
                        const isActive = lesson.id === activeLesson.id
                        const isDone = completedIds.has(lesson.id)
                        const iconType = getLessonIconType(lessonIndex, section.lessons.length)
                        return (
                          <li key={lesson.id}>
                            <button
                              type="button"
                              className={`cw-sidebar__lesson ${isActive ? 'cw-sidebar__lesson--active' : ''}`}
                              onClick={() => selectLesson(lesson.id)}
                            >
                              <span className="cw-sidebar__lesson-icon">
                                <LessonTypeIcon type={iconType} />
                              </span>
                              <span className="cw-sidebar__lesson-text">{lesson.title}</span>
                              <span className="cw-sidebar__lesson-status">
                                {isDone ? (
                                  <IconCheck />
                                ) : isActive ? (
                                  <IconInProgress />
                                ) : (
                                  <IconCircle />
                                )}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        <main className="challenge-workspace__main">
          <header className="challenge-workspace__hero">
            <div className="challenge-workspace__hero-inner">
              <p className="challenge-workspace__hero-eyebrow">
                Paso {activeIndex + 1} de {lessons.length} · {activeLesson.durationMin} min
              </p>
              <h2 className="challenge-workspace__hero-title">{activeLesson.title}</h2>
              <span className="challenge-workspace__hero-line" aria-hidden />
            </div>
          </header>

          <article className="challenge-workspace__content">
            {lessonVideoId ? (
              <div className="challenge-workspace__video-wrap">
                <iframe
                  className="challenge-workspace__video"
                  src={`https://www.youtube.com/embed/${lessonVideoId}`}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : isSubmissionStep ? (
              <>
                <section className="challenge-workspace__submission" aria-labelledby="submission-upload-heading">
                  <h3 id="submission-upload-heading" className="challenge-workspace__block-title">
                    Sube tu entrega intermedia
                  </h3>
                  <p className="challenge-workspace__block-text">
                    Elige tus archivos (<strong>Word</strong>, <strong>draw.io</strong>, PDF, imágenes,
                    etc.) y pulsa <strong>Subir entrega</strong>. Se envían a la nube con URL prefirmada
                    de este reto ({challenge.title}). También guardamos copia local por si recargas
                    antes de subir.
                  </p>
                  {!inscripcionId && (
                    <p className="challenge-workspace__upload-error" role="alert">
                      Abre la entrega desde <strong>Mi panel → Subir entrega</strong> en la tarjeta del
                      reto para vincular tu inscripción.
                    </p>
                  )}
                  <input
                    ref={submissionInputRef}
                    id={submissionInputId}
                    type="file"
                    className="challenge-workspace__sr-only"
                    multiple
                    accept="*/*"
                    aria-label="Seleccionar archivos para subir"
                    onChange={onSubmissionPick}
                  />
                  <div
                    className={`challenge-workspace__drop-zone ${submissionDragging ? 'challenge-workspace__drop-zone--active' : ''}`}
                    onDragEnter={onSubmissionDragEnter}
                    onDragOver={onSubmissionDragOver}
                    onDragLeave={onSubmissionDragLeave}
                    onDrop={onSubmissionDrop}
                    role="presentation"
                  >
                    <p className="challenge-workspace__drop-zone-text">
                      Arrastra y suelta tus archivos aquí
                    </p>
                    <div className="challenge-workspace__upload-row">
                      <label htmlFor={submissionInputId} className="challenge-workspace__upload-label">
                        Elegir archivos
                      </label>
                      <button
                        type="button"
                        className="challenge-workspace__upload-alt"
                        onClick={() => submissionInputRef.current?.click()}
                      >
                        Abrir explorador de archivos…
                      </button>
                    </div>
                  </div>
                  {submissionFiles.length > 0 ? (
                    <ul className="challenge-workspace__file-list" aria-label="Archivos seleccionados">
                      {submissionFiles.map((file) => (
                        <li key={`${file.name}-${file.lastModified}-${file.size}`}>
                          <span className="challenge-workspace__file-name">{file.name}</span>
                          <button
                            type="button"
                            className="challenge-workspace__file-remove"
                            onClick={() => removeSubmissionFile(file.name, file.lastModified)}
                          >
                            Quitar
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="challenge-workspace__upload-empty">Aún no has seleccionado archivos.</p>
                  )}
                  <div className="challenge-workspace__upload-actions">
                    <button
                      type="button"
                      className="challenge-workspace__btn-upload"
                      disabled={
                        submissionUploading || !inscripcionId || submissionFiles.length === 0
                      }
                      onClick={() => void handleUploadSubmission()}
                    >
                      {submissionUploading ? 'Subiendo archivos…' : 'Subir entrega'}
                    </button>
                  </div>
                  {submissionUploadError && (
                    <p className="challenge-workspace__upload-error" role="alert">
                      {submissionUploadError}
                    </p>
                  )}
                </section>

                <section
                  className="challenge-workspace__submission-explainer"
                  aria-labelledby="submission-video-heading"
                >
                  <h3 id="submission-video-heading" className="challenge-workspace__block-title">
                    Cómo debe ser tu solicitud y entrega
                  </h3>
                  {submissionExplainerId ? (
                    <div className="challenge-workspace__video-wrap">
                      <iframe
                        className="challenge-workspace__video"
                        src={`https://www.youtube.com/embed/${submissionExplainerId}`}
                        title="Video: cómo debe ser la solicitud y la entrega"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="challenge-workspace__submission-placeholder" role="status">
                      <p>
                        Pronto aparecerá aquí un <strong>video del mentor</strong> explicando el formato esperado de
                        la solicitud, qué incluir en tu entrega y buenas prácticas para el equipo BCP.
                      </p>
                      <p>
                        Mientras tanto, prepara un <strong>diagrama</strong> (draw.io o similar), un{' '}
                        <strong>documento Word</strong> con la descripción del agente y el patrón de integración,
                        y cualquier evidencia de pruebas.
                      </p>
                    </div>
                  )}
                </section>
              </>
            ) : showEvaluation ? (
              <WorkspaceEvaluationPanel
                key={`eval-${inscripcionId}-${evalSession}`}
                inscripcionId={inscripcionId!}
                challengeTitle={challenge.title}
                resultsPath={resultsPath}
                feedbackPath={feedbackPath}
                evalSession={evalSession}
              />
            ) : isDemoFinalStep ? (
              <p className="challenge-workspace__upload-error" role="alert">
                Para evaluar tu entrega con IA, abre este paso desde{' '}
                <strong>Mi panel → Subir entrega</strong> en la tarjeta del reto (necesitamos tu
                inscripción).
              </p>
            ) : (
              <>
                <p className="challenge-workspace__intro">{challenge.description}</p>

                <h3 className="challenge-workspace__objectives-title">
                  En este paso, aprenderás a hacer lo siguiente:
                </h3>
                <ul className="challenge-workspace__objectives">
                  {challenge.objectives.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="challenge-workspace__focus">
                  <p className="challenge-workspace__focus-label">Enfoque del reto</p>
                  <p className="challenge-workspace__focus-value">{challenge.domain}</p>
                  <p className="challenge-workspace__focus-hint">{challenge.competencies}</p>
                </div>
              </>
            )}

            {!showEvaluation && (
              <div className="challenge-workspace__actions">
                <button type="button" className="challenge-workspace__btn-primary" onClick={markComplete}>
                  {completedIds.has(activeLesson.id) ? 'Paso completado' : 'Marcar paso como completado'}
                </button>
                {activeIndex < lessons.length - 1 && (
                  <button
                    type="button"
                    className="challenge-workspace__btn-secondary"
                    onClick={() => selectLesson(lessons[activeIndex + 1].id)}
                  >
                    Siguiente paso
                  </button>
                )}
              </div>
            )}
          </article>

          {isLastStep && !showEvaluation && (
            <section className="challenge-workspace__complete" aria-label="Reto completado">
              <h3 className="challenge-workspace__complete-title">
                ¡Felicitaciones por completar este reto!
              </h3>
              <p className="challenge-workspace__complete-text">
                Has terminado todos los pasos del reto. Seleccione{' '}
                <Link to={resultsPath} className="challenge-workspace__complete-link">
                  Ver resultados
                </Link>{' '}
                para conocer tu puntuación, el análisis con IA de tu desempeño y el estado de tu
                certificación, o{' '}
                <Link to={feedbackPath} className="challenge-workspace__complete-link">
                  Ver retroalimentación
                </Link>{' '}
                para explorar cómo otros estudiantes resolvieron el reto.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
