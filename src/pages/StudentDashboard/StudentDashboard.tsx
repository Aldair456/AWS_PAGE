import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { CertificationShowcase } from '../../components/CertificationShowcase/CertificationShowcase'
import { ProfessionalGoals } from '../../components/ProfessionalGoals/ProfessionalGoals'
import { useStudentSession } from '../../hooks/useStudentSession'
import '../../App.css'
import './StudentDashboard.css'

type DashboardTab = 'routes' | 'challenges' | 'completed'

const TABS: { id: DashboardTab; label: string }[] = [
  { id: 'routes', label: 'Rutas de certificación' },
  { id: 'challenges', label: 'Retos' },
  { id: 'completed', label: 'Certificaciones completadas' },
]

const EMPTY_COPY: Record<
  DashboardTab,
  { title: string; description: string; cta: string }
> = {
  routes: {
    title: 'No hay rutas de certificación',
    description:
      'Una ruta agrupa retos y certificaciones para ayudarte a alcanzar un objetivo concreto en el sector financiero.',
    cta: 'Explorar certificaciones',
  },
  challenges: {
    title: 'No tienes retos activos',
    description:
      'Los retos son desafíos prácticos creados por empresas como BCP e Interbank para demostrar tus habilidades.',
    cta: 'Explorar retos',
  },
  completed: {
    title: 'Aún no completas certificaciones',
    description:
      'Cuando termines un reto, tu certificado aparecerá aquí listo para tu CV y LinkedIn.',
    cta: 'Ver certificaciones disponibles',
  },
}

function IconExternal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 5h5v5M10 14 19 9M19 5l-8 8M5 10v9h9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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
  const [activeTab, setActiveTab] = useState<DashboardTab>('routes')
  const [assignedOnly, setAssignedOnly] = useState(false)

  const firstName = session?.name.split(' ')[0] ?? 'Estudiante'
  const empty = EMPTY_COPY[activeTab]

  return (
    <div className="app student-dashboard-app">
      <Header />

      <div className="student-dashboard">
        <div className="student-dashboard__bg" aria-hidden />

        <div className="student-dashboard__inner">
          <header className="student-dashboard__header">
            <div className="student-dashboard__header-text">
              <h1 className="student-dashboard__title">Bienvenido de nuevo, {firstName}</h1>
              <p className="student-dashboard__subtitle">
                Tu actividad reciente con retos y certificaciones
                {session?.career ? ` · ${session.career}` : ''}
              </p>
            </div>

            <div className="student-dashboard__toolbar">
              <label className="student-dashboard__toggle">
                <input
                  type="checkbox"
                  checked={assignedOnly}
                  onChange={(e) => setAssignedOnly(e.target.checked)}
                />
                <span className="student-dashboard__toggle-track" aria-hidden />
                <span className="student-dashboard__toggle-label">
                  Mostrar solo retos asignados
                </span>
              </label>

              <Link className="student-dashboard__link-out" to="/#certificaciones">
                Ver toda mi actividad
                <IconExternal />
              </Link>
            </div>
          </header>

          <div className="student-dashboard__tabs" role="tablist" aria-label="Actividad del estudiante">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`student-dashboard__tab ${
                  activeTab === tab.id ? 'student-dashboard__tab--active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <section
            className="student-dashboard__content"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            <div className="student-dashboard__empty">
              <EmptyIllustration />
              <h2 className="student-dashboard__empty-title">{empty.title}</h2>
              <p className="student-dashboard__empty-text">{empty.description}</p>
              <a className="student-dashboard__empty-cta" href="#objetivos-profesionales">
                {empty.cta}
                <IconArrowDown />
              </a>
            </div>
          </section>

          <ProfessionalGoals />
          <CertificationShowcase />
        </div>
      </div>
    </div>
  )
}
