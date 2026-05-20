import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ItCertificationPathModal } from '../ItCertificationPathModal/ItCertificationPathModal'
import {
  BUSINESS_PROFILES,
  TECH_PROFILES,
  type CareerProfileMeta,
} from '../../data/careerProfiles'
import './ProfessionalGoals.css'

const IT_PATH_MODAL_CAREER_ID = 'industrial'

type GoalsTab = 'tech' | 'business'

function ProfileIcon({ type }: { type: CareerProfileMeta['icon'] }) {
  const common = { stroke: '#16191f', strokeWidth: 1.4, fill: 'none' as const }

  switch (type) {
    case 'systems':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <rect x="10" y="12" width="28" height="20" rx="2" {...common} />
          <path d="M16 32h16M24 32v4" {...common} strokeLinecap="round" />
          <path d="M16 20h8M16 24h12" {...common} strokeLinecap="round" />
        </svg>
      )
    case 'industrial':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <circle cx="24" cy="24" r="12" {...common} />
          <path d="M24 14v6M24 28v6M14 24h6M28 24h6" {...common} strokeLinecap="round" />
          <path d="M18 18l3 3M30 18l-3 3M18 30l3-3M30 30l-3-3" {...common} strokeLinecap="round" />
        </svg>
      )
    case 'data':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <ellipse cx="24" cy="14" rx="12" ry="5" {...common} />
          <path d="M12 14v14c0 3 5.4 5 12 5s12-2 12-5V14" {...common} />
          <path d="M18 28l3 4 4-6 5 8" {...common} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'admin':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path d="M10 38V18l14-8 14 8v20" {...common} strokeLinejoin="round" />
          <path d="M18 38V26h12v12" {...common} />
        </svg>
      )
    case 'finance':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path d="M10 34h28M14 34V22l10-8 10 8v12" {...common} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 14v4" {...common} strokeLinecap="round" />
        </svg>
      )
    case 'accounting':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <rect x="12" y="10" width="24" height="28" rx="2" {...common} />
          <path d="M18 18h12M18 24h8M18 30h10" {...common} strokeLinecap="round" />
        </svg>
      )
    case 'marketing':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <circle cx="24" cy="20" r="8" {...common} />
          <path d="M12 38c3-10 10-14 12-14s9 4 12 14" {...common} strokeLinecap="round" />
          <path d="M30 14l4-4M34 18h-6" {...common} strokeLinecap="round" />
        </svg>
      )
    case 'law':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path d="M24 10v28M14 38h20" {...common} strokeLinecap="round" />
          <path d="M16 18h16l-8 10-8-10z" {...common} strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

function CareerCard({
  card,
  onOpenPathModal,
}: {
  card: CareerProfileMeta
  onOpenPathModal: () => void
}) {
  const content = (
    <>
      <span className="pro-goals__card-icon">
        <ProfileIcon type={card.icon} />
      </span>
      <span className="pro-goals__card-career">{card.career}</span>
      <span className="pro-goals__card-profile">{card.profile}</span>
      {!card.ready && <span className="pro-goals__card-badge">Próximamente</span>}
    </>
  )

  if (card.id === IT_PATH_MODAL_CAREER_ID && card.ready) {
    return (
      <button
        type="button"
        className="pro-goals__card pro-goals__card--button"
        onClick={onOpenPathModal}
      >
        {content}
      </button>
    )
  }

  return (
    <Link className="pro-goals__card" to={`/estudiante/carrera/${card.id}`}>
      {content}
    </Link>
  )
}

export function ProfessionalGoals() {
  const [activeTab, setActiveTab] = useState<GoalsTab>('tech')
  const [pathModalOpen, setPathModalOpen] = useState(false)
  const cards = activeTab === 'tech' ? TECH_PROFILES : BUSINESS_PROFILES

  return (
    <section
      id="objetivos-profesionales"
      className="pro-goals"
      aria-labelledby="pro-goals-title"
    >
      <h2 id="pro-goals-title" className="pro-goals__title">
        Perfiles profesionales según tu carrera
      </h2>
      <p className="pro-goals__intro">
        Elige la carrera que más se acerca a la tuya y descubre retos alineados al perfil que buscan las
        empresas del sector financiero.
      </p>

      <div className="pro-goals__tabs" role="tablist" aria-label="Grupo de carreras">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'tech'}
          className={`pro-goals__tab ${activeTab === 'tech' ? 'pro-goals__tab--active' : ''}`}
          onClick={() => setActiveTab('tech')}
        >
          Carreras técnicas
        </button>
        <span className="pro-goals__tab-sep" aria-hidden />
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'business'}
          className={`pro-goals__tab ${activeTab === 'business' ? 'pro-goals__tab--active' : ''}`}
          onClick={() => setActiveTab('business')}
        >
          Carreras de negocios
        </button>
      </div>

      <div className="pro-goals__rule" aria-hidden />

      <ul
        className={`pro-goals__grid ${activeTab === 'business' ? 'pro-goals__grid--three' : ''}`}
        role="tabpanel"
      >
        {cards.map((card) => (
          <li key={card.id}>
            <CareerCard card={card} onOpenPathModal={() => setPathModalOpen(true)} />
          </li>
        ))}
      </ul>

      <ItCertificationPathModal
        open={pathModalOpen}
        onClose={() => setPathModalOpen(false)}
        careerPath={`/estudiante/carrera/${IT_PATH_MODAL_CAREER_ID}`}
      />
    </section>
  )
}
