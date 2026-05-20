import { Link, Navigate, useParams } from 'react-router-dom'
import certificationBadge from '../../assets/CERTIFACION_IT.png'
import { getCareerProfile } from '../../data/careerProfiles'
import { getChallengeById, getChallengesForCareer } from '../../data/companyChallenges'
import { getSimulatedChallengeResults, isCertificateEligible } from '../../data/challengeResults'
import { useStudentSession } from '../../hooks/useStudentSession'
import './ChallengeCertificatePage.css'

function formatIssueDate(date: Date) {
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ChallengeCertificatePage() {
  const { careerId, challengeId } = useParams<{ careerId: string; challengeId: string }>()
  const session = useStudentSession()
  const profile = getCareerProfile(careerId)
  const challenge = challengeId ? getChallengeById(challengeId) : undefined
  const careerChallenges = profile ? getChallengesForCareer(profile.id) : []
  const challengeInCareer = challenge && careerChallenges.some((c) => c.id === challenge.id)

  if (!profile || !challenge || !challengeInCareer) {
    return <Navigate to="/estudiante/panel" replace />
  }

  const results = getSimulatedChallengeResults(challenge.id, challenge.title)
  const eligible = isCertificateEligible(results.totalScore, results.certificateMinScore)

  if (!eligible) {
    return <Navigate to={`/estudiante/carrera/${profile.id}/reto/${challenge.id}/resultados`} replace />
  }

  const issued = new Date()
  const expires = new Date(issued)
  expires.setFullYear(expires.getFullYear() + 3)

  const holderName = session?.name ?? 'Estudiante BCP Retos'
  const detailPath = `/estudiante/carrera/${profile.id}/reto/${challenge.id}`
  const resultsPath = `${detailPath}/resultados`

  const skillTags = [
    challenge.domain,
    ...challenge.competencies.split(',').map((s) => s.trim()),
    challenge.company,
    'Mejora continua',
    'Reto BCP',
  ].filter(Boolean)

  return (
    <div className="challenge-certificate">
      <header className="challenge-certificate__topbar">
        <div className="challenge-certificate__holder">
          <span className="challenge-certificate__avatar" aria-hidden>
            {holderName
              .split(' ')
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
              .toUpperCase()}
          </span>
          <div>
            <p className="challenge-certificate__issued-label">
              Esta certificación fue emitida a{' '}
              <strong>{holderName}</strong>
            </p>
            <p className="challenge-certificate__dates">
              Fecha de emisión: {formatIssueDate(issued)} · Vence: {formatIssueDate(expires)}
            </p>
          </div>
        </div>
        <div className="challenge-certificate__top-actions">
          <span className="challenge-certificate__verify">
            <span className="challenge-certificate__verify-icon" aria-hidden>
              ✓
            </span>
            Verificado
          </span>
          <button type="button" className="challenge-certificate__celebrate">
            Celebrar 🎉
          </button>
        </div>
      </header>

      <main className="challenge-certificate__main">
        <div className="challenge-certificate__badge-wrap">
          <img
            src={certificationBadge}
            alt={`Certificación BCP — ${challenge.title}`}
            className="challenge-certificate__badge-img"
          />
        </div>

        <article className="challenge-certificate__details">
          <h1 className="challenge-certificate__title">
            Certificación en reto {challenge.company}: {challenge.title}
          </h1>
          <p className="challenge-certificate__issuer">
            Emitida por{' '}
            <Link to={detailPath}>BCP Retos · Programa de certificación estudiantil</Link>
          </p>

          <p className="challenge-certificate__description">
            El titular completó el reto guiado con una puntuación de {results.totalScore} de{' '}
            {results.maxScore} puntos (mínimo {results.certificateMinScore} para certificar).
            Demostró capacidad para mapear procesos, aplicar criterios Lean y proponer mejoras
            medibles en un contexto de operaciones bancarias, según el análisis con IA de sus
            entregas y participación en la comunidad del reto.
          </p>

          <Link to={resultsPath} className="challenge-certificate__learn-more">
            Ver resultados del reto
          </Link>

          <ul className="challenge-certificate__tags" aria-label="Categorías">
            <li>Certificación</li>
            <li>{challenge.level}</li>
            <li>Reto {challenge.company}</li>
          </ul>

          <section className="challenge-certificate__block">
            <h2>Competencias</h2>
            <ul className="challenge-certificate__skills">
              {skillTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </section>

          <section className="challenge-certificate__block">
            <h2>Criterios de obtención</h2>
            <p className="challenge-certificate__criteria">
              <span className="challenge-certificate__criteria-icon" aria-hidden>
                📄
              </span>
              Completar todos los pasos del reto y alcanzar al menos{' '}
              {results.certificateMinScore} puntos de {results.maxScore} en la evaluación con IA.
            </p>
          </section>

          <div className="challenge-certificate__footer-links">
            <Link to={resultsPath}>← Volver a resultados</Link>
            <Link to={detailPath}>Guía del reto</Link>
          </div>
        </article>
      </main>
    </div>
  )
}
