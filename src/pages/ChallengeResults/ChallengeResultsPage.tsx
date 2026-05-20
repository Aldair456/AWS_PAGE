import { Link, Navigate, useParams } from 'react-router-dom'
import { getCareerProfile } from '../../data/careerProfiles'
import { getChallengeById, getChallengesForCareer } from '../../data/companyChallenges'
import { getSimulatedChallengeResults, isCertificateEligible } from '../../data/challengeResults'
import './ChallengeResultsPage.css'

export function ChallengeResultsPage() {
  const { careerId, challengeId } = useParams<{ careerId: string; challengeId: string }>()
  const profile = getCareerProfile(careerId)
  const challenge = challengeId ? getChallengeById(challengeId) : undefined
  const careerChallenges = profile ? getChallengesForCareer(profile.id) : []
  const challengeInCareer = challenge && careerChallenges.some((c) => c.id === challenge.id)

  if (!profile || !challenge || !challengeInCareer) {
    return <Navigate to="/estudiante/panel" replace />
  }

  const results = getSimulatedChallengeResults(challenge.id, challenge.title)
  const eligible = isCertificateEligible(results.totalScore, results.certificateMinScore)
  const scorePct = Math.round((results.totalScore / results.maxScore) * 100)
  const minPct = Math.round((results.certificateMinScore / results.maxScore) * 100)

  const detailPath = `/estudiante/carrera/${profile.id}/reto/${challenge.id}`
  const workspacePath = `${detailPath}/aprender`
  const feedbackPath = `${detailPath}/retroalimentacion`
  const certificatePath = `${detailPath}/certificacion`

  return (
    <div className="challenge-results">
      <header className="challenge-results__topbar">
        <Link to={workspacePath} className="challenge-results__back">
          ← Volver al reto
        </Link>
        <Link to={feedbackPath} className="challenge-results__back challenge-results__back--muted">
          Ver retroalimentación
        </Link>
      </header>

      <header className="challenge-results__hero">
        <div className="challenge-results__hero-inner">
          <p className="challenge-results__eyebrow">Resultados del reto</p>
          <h1 className="challenge-results__title">{challenge.title}</h1>
          <span className="challenge-results__hero-line" aria-hidden />
          <p className="challenge-results__subtitle">
            Completado el {results.completedAt} · {challenge.company}
          </p>
        </div>
      </header>

      <main className="challenge-results__main">
        <section className="challenge-results__score-card" aria-labelledby="results-score-heading">
          <h2 id="results-score-heading" className="challenge-results__section-title">
            Tu puntuación
          </h2>
          <div className="challenge-results__score-main">
            <p className="challenge-results__score-value">
              <span className="challenge-results__score-number">{results.totalScore}</span>
              <span className="challenge-results__score-of"> / {results.maxScore} pts</span>
            </p>
            <p className="challenge-results__score-pct">{scorePct}% del reto</p>
          </div>

          <div className="challenge-results__score-bar" role="presentation">
            <span
              className="challenge-results__score-bar-fill"
              style={{ width: `${scorePct}%` }}
            />
            <span
              className="challenge-results__score-bar-marker"
              style={{ left: `${minPct}%` }}
              title={`Mínimo certificación: ${results.certificateMinScore} pts`}
            />
          </div>
          <p className="challenge-results__score-legend">
            Mínimo para certificación: <strong>{results.certificateMinScore} pts</strong> de{' '}
            {results.maxScore}
          </p>

          <div
            className={`challenge-results__cert ${eligible ? 'challenge-results__cert--ok' : 'challenge-results__cert--pending'}`}
          >
            {eligible ? (
              <>
                <p className="challenge-results__cert-title">Elegible para certificación</p>
                <p className="challenge-results__cert-text">
                  Alcanzaste los {results.certificateMinScore} puntos requeridos. Puedes solicitar
                  tu certificación BCP del reto.
                </p>
                <Link to={certificatePath} className="challenge-results__cert-btn">
                  Solicitar certificación
                </Link>
              </>
            ) : (
              <>
                <p className="challenge-results__cert-title">Certificación pendiente</p>
                <p className="challenge-results__cert-text">
                  Necesitas al menos {results.certificateMinScore} pts. Te faltan{' '}
                  {results.certificateMinScore - results.totalScore} pts para el certificado.
                </p>
              </>
            )}
          </div>
        </section>

        <section className="challenge-results__criteria" aria-labelledby="results-criteria-heading">
          <h2 id="results-criteria-heading" className="challenge-results__section-title">
            Desglose por criterio
          </h2>
          <ul className="challenge-results__criteria-list">
            {results.criteria.map((item) => {
              const pct = Math.round((item.score / item.maxScore) * 100)
              return (
                <li key={item.id} className="challenge-results__criterion">
                  <div className="challenge-results__criterion-head">
                    <span className="challenge-results__criterion-label">{item.label}</span>
                    <span className="challenge-results__criterion-score">
                      {item.score}/{item.maxScore}
                    </span>
                  </div>
                  <div className="challenge-results__criterion-bar">
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  <p className="challenge-results__criterion-feedback">{item.feedback}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="challenge-results__ai" aria-labelledby="results-ai-heading">
          <div className="challenge-results__ai-badge">Análisis con IA</div>
          <h2 id="results-ai-heading" className="challenge-results__section-title">
            Cómo se desarrolló tu reto
          </h2>
          <p className="challenge-results__ai-summary">{results.ai.summary}</p>

          <div className="challenge-results__ai-grid">
            <div className="challenge-results__ai-block">
              <h3>Fortalezas detectadas</h3>
              <ul>
                {results.ai.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="challenge-results__ai-block">
              <h3>Oportunidades de mejora</h3>
              <ul>
                {results.ai.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="challenge-results__ai-note">{results.ai.developmentNote}</p>
        </section>

        <section className="challenge-results__actions">
          <Link to={feedbackPath} className="challenge-results__link-btn">
            Ver retroalimentación de otros estudiantes
          </Link>
          <Link to={detailPath} className="challenge-results__link-btn challenge-results__link-btn--secondary">
            Volver a la guía del reto
          </Link>
        </section>
      </main>
    </div>
  )
}
