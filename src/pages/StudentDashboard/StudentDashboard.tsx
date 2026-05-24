import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { CertificationShowcase } from '../../components/CertificationShowcase/CertificationShowcase'
import { ProfessionalGoals } from '../../components/ProfessionalGoals/ProfessionalGoals'
import { ScrollReveal } from '../../components/ScrollReveal'
import { SubscribedChallengesList } from '../../components/SubscribedChallengesList/SubscribedChallengesList'
import { getReadyCareerIdByCareerName } from '../../data/careerProfiles'
import { useStudentSession } from '../../hooks/useStudentSession'
import '../../App.css'
import './StudentDashboard.css'

const EMPTY_CHALLENGES = {
  title: 'No tienes retos activos',
  description:
    'Los retos son desafíos prácticos de BCP, alineados a rutas de certificación del ecosistema Credicorp, para demostrar tus habilidades.',
  cta: 'Explorar retos',
}

function IconArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M6 13l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EmptyIllustration() {
  return (
    <svg className="student-dashboard__empty-art" viewBox="0 0 200 160" fill="none" aria-hidden>
      <path
        d="M100 28c-8-12-28-14-40-4s-10 30 2 38l18 12 20-32Z"
        fill="#e8f4fa"
        stroke="#0073bb"
        strokeWidth="1.5"
      />
      <path d="M72 72h56l-8 48H80l-8-48Z" fill="#fff" stroke="#0073bb" strokeWidth="1.5" />
      <circle cx="100" cy="52" r="8" fill="#f5d0a8" stroke="#0073bb" strokeWidth="1.2" />
      <path d="M88 140h24" stroke="#aab7b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 48l6 6M160 40l-6 6M48 120l4-4M152 128l4-4" stroke="#c8d4d6" strokeWidth="1.5" />
    </svg>
  )
}

export function StudentDashboard() {
  const session = useStudentSession()
  const [challengesEmpty, setChallengesEmpty] = useState(true)
  const [challengesLoading, setChallengesLoading] = useState(false)

  const firstName = session?.name.split(' ')[0] ?? 'Estudiante'
  const careerId = getReadyCareerIdByCareerName(session?.career)
  const showEmpty = !challengesLoading && (!session?.estudianteId || challengesEmpty)
  const showList = Boolean(session?.estudianteId && !challengesEmpty)

  return (
    <div className="app student-dashboard-app">
      <Header />

      <div className="student-dashboard">
        <div className="student-dashboard__bg" aria-hidden />

        <div className="student-dashboard__inner">
          <ScrollReveal as="header" className="student-dashboard__header">
            <div className="student-dashboard__header-text">
              <h1 className="student-dashboard__title">Bienvenido de nuevo, {firstName}</h1>
              <p className="student-dashboard__subtitle">
                Tus retos inscritos y progreso reciente
                {session?.career ? ` · ${session.career}` : ''}
              </p>
            </div>

            <Link className="student-dashboard__link-out" to={`/estudiante/carrera/${careerId}`}>
              Explorar más retos
            </Link>
          </ScrollReveal>

          <section
            className={`student-dashboard__content ${
              showList ? 'student-dashboard__content--list' : ''
            }`}
            aria-label="Tus retos inscritos"
          >
            <SubscribedChallengesList
              estudianteId={session?.estudianteId}
              careerId={careerId}
              active
              onLoadingChange={setChallengesLoading}
              onLoaded={(count) => setChallengesEmpty(count === 0)}
            />

            {showEmpty && (
              <ScrollReveal className="student-dashboard__empty">
                <EmptyIllustration />
                <h3 className="student-dashboard__empty-title">
                  {!session?.estudianteId
                    ? 'Inicia sesión para ver tus retos'
                    : EMPTY_CHALLENGES.title}
                </h3>
                <p className="student-dashboard__empty-text">
                  {!session?.estudianteId
                    ? 'Regístrate o inicia sesión para listar los retos en los que te inscribiste.'
                    : EMPTY_CHALLENGES.description}
                </p>
                <Link
                  className="student-dashboard__empty-cta"
                  to={`/estudiante/carrera/${careerId}`}
                >
                  {EMPTY_CHALLENGES.cta}
                  <IconArrowDown />
                </Link>
              </ScrollReveal>
            )}
          </section>

          <ProfessionalGoals />
          <CertificationShowcase />
        </div>
      </div>
    </div>
  )
}
