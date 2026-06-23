import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { createCertificacionWithEmail } from '../../api/certificaciones'
import {
  claimEvaluationSession,
  clearEvaluacionPostSent,
  evaluationSessionKey,
  runEvaluacionFlow,
  type EvaluacionDisplayResult,
} from '../../api/evaluaciones'
import {
  CuyEvalAssistant,
  getCuyErrorMessage,
  getCuyLoadingMessage,
  getCuyResultMessage,
} from '../CuyEvalAssistant'
import './WorkspaceEvaluationPanel.css'

type Phase = 'loading' | 'ready' | 'error'

type Props = {
  inscripcionId: string
  challengeTitle: string
  resultsPath?: string
  feedbackPath?: string
  /** > 0 tras una nueva subida a S3: fuerza POST y oculta resultado anterior */
  evalSession?: number
}

function isStatusAprobado(status: string): boolean {
  return status.trim().toLowerCase() === 'aprobado'
}

function messageFromApiError(error: unknown): string {
  if (error instanceof ApiError && error.body && typeof error.body === 'object') {
    const msg = (error.body as Record<string, unknown>).message
    if (typeof msg === 'string' && msg.trim()) return msg
  }
  if (error instanceof ApiError) return error.message
  return 'No se pudo crear la certificación. Intenta de nuevo.'
}

export function WorkspaceEvaluationPanel({
  inscripcionId,
  challengeTitle,
  resultsPath,
  feedbackPath,
  evalSession = 0,
}: Props) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(5)
  const [statusMessage, setStatusMessage] = useState('Preparando evaluación con IA…')
  const [result, setResult] = useState<EvaluacionDisplayResult | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isReevaluating, setIsReevaluating] = useState(false)
  const [certLoading, setCertLoading] = useState(false)
  const [certCreated, setCertCreated] = useState(false)
  const [certificacionId, setCertificacionId] = useState<string | null>(null)
  const [certEmailSent, setCertEmailSent] = useState(false)
  const [certEmailWarning, setCertEmailWarning] = useState<string | null>(null)
  const [certError, setCertError] = useState<string | null>(null)
  const runIdRef = useRef(0)
  const abortRef = useRef<AbortController | null>(null)
  const certStartedForResultRef = useRef<string | null>(null)
  const evalSessionKey = evaluationSessionKey(inscripcionId, evalSession)

  const runCertificacionFlow = useCallback(async (resultadoId: string) => {
    setCertLoading(true)
    setCertError(null)
    setCertEmailWarning(null)

    try {
      const { certificacion, link, emailSent, emailError } =
        await createCertificacionWithEmail(resultadoId)

      setCertificacionId(certificacion.id)
      setCertCreated(true)
      setCertEmailSent(emailSent)

      if (!emailSent && emailError) {
        setCertEmailWarning(
          `Certificación creada. No se pudo enviar el correo: ${emailError}. Puedes abrir tu certificado aquí: ${link}`,
        )
      }

      console.log('[Evaluación IA] Certificación lista', {
        certificacion_id: certificacion.id,
        link,
        emailSent,
      })

      return certificacion.id
    } catch (error) {
      setCertCreated(false)
      setCertificacionId(null)
      setCertError(messageFromApiError(error))
      throw error
    } finally {
      setCertLoading(false)
    }
  }, [])

  const openCertificado = (id: string) => {
    navigate(`/certificaciones/${id}`)
  }

  const handleCertificadoAction = async () => {
    if (certificacionId && certCreated) {
      openCertificado(certificacionId)
      return
    }

    if (!result?.resultadoId) {
      setCertError('No encontramos el id del resultado. Vuelve a evaluar tu entrega.')
      return
    }

    try {
      const id = await runCertificacionFlow(result.resultadoId)
      openCertificado(id)
    } catch {
      /* certError */
    }
  }

  const maybeCreateCertificacion = useCallback(
    async (mapped: EvaluacionDisplayResult, runId: number) => {
      if (runId !== runIdRef.current) return
      if (!isStatusAprobado(mapped.status) || !mapped.resultadoId) return
      if (certStartedForResultRef.current === mapped.resultadoId) return

      certStartedForResultRef.current = mapped.resultadoId
      try {
        await runCertificacionFlow(mapped.resultadoId)
      } catch {
        certStartedForResultRef.current = null
      }
    },
    [runCertificacionFlow],
  )

  const startEvaluation = useCallback((forcePost = false) => {
    const runId = ++runIdRef.current
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    if (forcePost) {
      clearEvaluacionPostSent(inscripcionId)
      console.log('[Evaluación IA] Nueva corrida: barra de carga + POST + polling', {
        inscripcion_id: inscripcionId,
        evalSession,
        runId,
      })
    }

    setPhase('loading')
    setIsReevaluating(forcePost)
    setProgress(5)
    setStatusMessage(
      forcePost ? 'Enviando evaluación de nuevo…' : 'Preparando evaluación con IA…',
    )
    setResult(null)
    setErrorMessage(null)
    setCertCreated(false)
    setCertificacionId(null)
    setCertEmailSent(false)
    setCertEmailWarning(null)
    setCertError(null)
    certStartedForResultRef.current = null
    // No limpiamos el mapa de dedupe: si el mismo resultadoId regresa tras
    // una re-evaluación, la promesa ya registrada impide enviar el POST de nuevo.

    void runEvaluacionFlow(
      inscripcionId,
      {
        onProgress: (percent, message) => {
          if (runId !== runIdRef.current) return
          setProgress(percent)
          setStatusMessage(message)
        },
      },
      { forcePost, signal: abortRef.current.signal },
    )
      .then((mapped) => {
        if (runId !== runIdRef.current) return
        setResult(mapped)
        setPhase('ready')
        setIsReevaluating(false)
        setProgress(100)
        void maybeCreateCertificacion(mapped, runId)
      })
      .catch((error) => {
        if (runId !== runIdRef.current) return
        if (error instanceof DOMException && error.name === 'AbortError') return

        const message =
          error instanceof ApiError
            ? error.message
            : 'No pudimos obtener los resultados de la evaluación. Intenta de nuevo.'
        setErrorMessage(message)
        setPhase('error')
      })
  }, [inscripcionId, evalSession, evalSessionKey, maybeCreateCertificacion])

  useEffect(() => {
    console.log('[Evaluación IA] inscripcion_id que se envía al POST/GET:', inscripcionId, {
      evalSession,
      evalSessionKey,
    })
  }, [inscripcionId, evalSession, evalSessionKey])

  useEffect(() => {
    if (!claimEvaluationSession(evalSessionKey)) {
      console.log('[Evaluación IA] Evaluación ya iniciada para esta sesión, omitiendo duplicado', {
        evalSessionKey,
      })
      return
    }

    const afterNewUpload = evalSession > 0
    startEvaluation(afterNewUpload)

    return () => {
      /* no liberar aquí: Strict Mode remontaría y duplicaría POST */
    }
  }, [evalSessionKey, evalSession, startEvaluation])

  useEffect(() => () => abortRef.current?.abort(), [])

  if (phase === 'loading') {
    return (
      <section
        className="cw-eval cw-eval--cuy-only"
        aria-live="polite"
        aria-busy="true"
        aria-label={`Evaluando entrega, ${progress}%`}
      >
        <CuyEvalAssistant
          message={getCuyLoadingMessage(isReevaluating, challengeTitle)}
          thinking
        />
        <p className="cw-eval__sr-only">{statusMessage}</p>
      </section>
    )
  }

  if (phase === 'error') {
    return (
      <section className="cw-eval cw-eval--error" aria-live="polite">
        <CuyEvalAssistant message={getCuyErrorMessage(errorMessage)} />

        <div className="cw-eval__details">
          <h3 className="cw-eval__title">No se pudo completar la evaluación</h3>
          <p className="cw-eval__error-text" role="alert">
            {errorMessage}
          </p>
          <button type="button" className="cw-eval__retry" onClick={() => startEvaluation(true)}>
            Reintentar evaluación
          </button>
        </div>
      </section>
    )
  }

  if (phase !== 'ready' || !result) return null

  const scorePct =
    result.puntajeMaximo > 0
      ? Math.round((result.puntuacion / result.puntajeMaximo) * 100)
      : result.porcentaje
  const minPct = Math.round((result.minimoCertificacion / result.puntajeMaximo) * 100)
  const showCertificadoBtn = isStatusAprobado(result.status)

  return (
    <section className="cw-eval cw-eval--ready" aria-labelledby="cw-eval-results-heading">
      <CuyEvalAssistant message={getCuyResultMessage(result)} />

      <div className="cw-eval__details">
        <h3 id="cw-eval-results-heading" className="cw-eval__title">
          Resultados de tu evaluación
        </h3>
        <p className="cw-eval__estado">{result.estado}</p>

      <div className="cw-eval__score-card">
        <p className="cw-eval__score-main">
          <span className="cw-eval__score-number">{result.puntuacion}</span>
          <span className="cw-eval__score-of"> / {result.puntajeMaximo} pts</span>
        </p>
        <p className="cw-eval__score-pct">{scorePct}% del reto</p>
        <div className="cw-eval__score-bar" role="presentation">
          <span className="cw-eval__score-bar-fill" style={{ width: `${scorePct}%` }} />
          <span
            className="cw-eval__score-bar-marker"
            style={{ left: `${minPct}%` }}
            title={`Mínimo certificación: ${result.minimoCertificacion} pts`}
          />
        </div>
        <p className="cw-eval__score-legend">
          Mínimo para certificación: <strong>{result.minimoCertificacion} pts</strong>
        </p>
        <div
          className={`cw-eval__cert ${result.isCertificado ? 'cw-eval__cert--ok' : 'cw-eval__cert--pending'}`}
        >
          {result.isCertificado ? (
            <p className="cw-eval__cert-text">Elegible para certificación BCP.</p>
          ) : (
            <p className="cw-eval__cert-text">
              Aún no alcanzas el mínimo de {result.minimoCertificacion} pts para certificación.
            </p>
          )}
          {showCertificadoBtn ? (
            <>
              {certLoading ? (
                <p className="cw-eval__cert-text">Creando certificación y enviando correo…</p>
              ) : certCreated ? (
                <p className="cw-eval__cert-text">
                  {certEmailSent
                    ? 'Certificación registrada. Revisa tu correo con el enlace para compartir.'
                    : 'Certificación registrada.'}
                </p>
              ) : null}
              <button
                type="button"
                className="cw-eval__cert-btn"
                disabled={certLoading || !result.resultadoId}
                onClick={() => void handleCertificadoAction()}
              >
                {certLoading
                  ? 'Generando certificado…'
                  : certCreated
                    ? 'Ver certificado'
                    : 'Obtener certificado'}
              </button>
              {certEmailWarning ? (
                <p className="cw-eval__cert-error" role="status">
                  {certEmailWarning}
                </p>
              ) : null}
              {certError ? (
                <p className="cw-eval__cert-error" role="alert">
                  {certError}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      {result.feedbackGeneral ? (
        <div className="cw-eval__feedback-block">
          <h4 className="cw-eval__section-label">Retroalimentación general</h4>
          <p className="cw-eval__feedback-text">{result.feedbackGeneral}</p>
        </div>
      ) : null}

      {result.desglose.length > 0 ? (
        <div className="cw-eval__criteria">
          <h4 className="cw-eval__section-label">Desglose por criterio</h4>
          <ul className="cw-eval__criteria-list">
            {result.desglose.map((item) => {
              const pct = item.maximo > 0 ? Math.round((item.puntaje / item.maximo) * 100) : 0
              return (
                <li key={item.criterio} className="cw-eval__criterion">
                  <div className="cw-eval__criterion-head">
                    <span>{item.criterio}</span>
                    <span>
                      {item.puntaje}/{item.maximo}
                    </span>
                  </div>
                  <div className="cw-eval__criterion-bar">
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  {item.comentario ? (
                    <p className="cw-eval__criterion-comment">{item.comentario}</p>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {result.resumenParrafos.length > 0 ? (
        <div className="cw-eval__analysis">
          <h4 className="cw-eval__section-label">Análisis con IA</h4>
          {result.resumenParrafos.map((paragraph, index) => (
            <p key={index} className="cw-eval__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {(result.fortalezas.length > 0 || result.oportunidades.length > 0) && (
        <div className="cw-eval__grid">
          {result.fortalezas.length > 0 ? (
            <div className="cw-eval__grid-block">
              <h4>Fortalezas</h4>
              <ul>
                {result.fortalezas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {result.oportunidades.length > 0 ? (
            <div className="cw-eval__grid-block">
              <h4>Oportunidades de mejora</h4>
              <ul>
                {result.oportunidades.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {feedbackPath ? (
        <div className="cw-eval__next-step">
          <h4 className="cw-eval__section-label">Siguiente paso</h4>
          <Link to={feedbackPath} className="cw-eval__link cw-eval__link--cta">
            Ver retroalimentación
          </Link>
        </div>
      ) : null}

      {resultsPath ? (
        <p className="cw-eval__footer-link">
          <Link to={resultsPath} className="cw-eval__link">
            Ver página de resultados
          </Link>
        </p>
      ) : null}

      <button
        type="button"
        className="cw-eval__retry cw-eval__retry--muted"
        onClick={() => startEvaluation(true)}
      >
        Volver a evaluar
      </button>
      </div>
    </section>
  )
}
