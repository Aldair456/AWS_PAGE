import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../ScrollReveal'
import { ItCertificationPathModal } from '../ItCertificationPathModal/ItCertificationPathModal'
import {
  BUSINESS_PROFILES,
  TECH_PROFILES,
  type CareerProfileMeta,
} from '../../data/careerProfiles'
import './ProfessionalGoals.css'

const IT_PATH_MODAL_CAREER_ID = 'industrial'

type GoalsTab = 'tech' | 'business'

function CareerCard({
  card,
  onOpenPathModal,
}: {
  card: CareerProfileMeta
  onOpenPathModal: () => void
}) {
  const content = (
    <>
      <img
        src={card.imageUrl}
        alt=""
        className="pro-goals__card-photo"
        loading="lazy"
        aria-hidden
      />
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
      <ScrollReveal>
        <h2 id="pro-goals-title" className="pro-goals__title">
          Perfiles profesionales según tu carrera
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <p className="pro-goals__intro">
          Elige la carrera que más se acerca a la tuya y descubre retos alineados al perfil que buscan las
          empresas.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={120}>
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
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div className="pro-goals__rule" aria-hidden />
      </ScrollReveal>

      <ul
        className={`pro-goals__grid ${activeTab === 'business' ? 'pro-goals__grid--three' : ''}`}
        role="tabpanel"
      >
        {cards.map((card, index) => (
          <ScrollReveal as="li" key={card.id} delay={index * 80}>
            <CareerCard card={card} onOpenPathModal={() => setPathModalOpen(true)} />
          </ScrollReveal>
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
