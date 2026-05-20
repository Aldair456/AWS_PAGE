import { Link } from 'react-router-dom'
import badgeAssociado from '../../assets/IT_ASSOCIADO.png'
import badgePractitioner from '../../assets/IT_PRACTIONER.png'
import badgeProfessional from '../../assets/IT_PROFESSIONAL.png'
import './CertificationShowcase.css'

type ShowcaseCert = {
  id: string
  title: string
  level: string
  badgeImage: string
  badgeAlt: string
  href: string
}

const SHOWCASE_CERTIFICATIONS: ShowcaseCert[] = [
  {
    id: 'practitioner',
    title: 'IT Data Practitioner',
    level: 'PRACTITIONER',
    badgeImage: badgePractitioner,
    badgeAlt: 'Insignia BCP IT Data Practitioner',
    href: '#cert-it-practitioner',
  },
  {
    id: 'associate',
    title: 'IT Data Associate',
    level: 'ASSOCIATE',
    badgeImage: badgeAssociado,
    badgeAlt: 'Insignia BCP IT Data Associate',
    href: '#cert-it-associate',
  },
  {
    id: 'professional',
    title: 'IT Data Professional',
    level: 'PROFESSIONAL',
    badgeImage: badgeProfessional,
    badgeAlt: 'Insignia BCP IT Data Professional',
    href: '#cert-it-professional',
  },
]

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

export function CertificationShowcase() {
  return (
    <section className="cert-showcase" aria-labelledby="cert-showcase-title">
      <h2 id="cert-showcase-title" className="cert-showcase__title">
        Desde cero hasta la certificación
      </h2>
      <p className="cert-showcase__desc">
        Sigue la ruta IT Data con BCP: comienza con Practitioner, avanza a Associate y culmina con
        Professional resolviendo retos que el banco publica en cada nivel.
      </p>

      <ul className="cert-showcase__grid">
        {SHOWCASE_CERTIFICATIONS.map((cert) => (
          <li key={cert.id}>
            <Link
              className="cert-showcase__card"
              to={cert.href}
              aria-label={`${cert.title} — ${cert.level}`}
            >
              <img
                src={cert.badgeImage}
                alt={cert.badgeAlt}
                className="cert-showcase__badge-img"
              />
              <span className="cert-showcase__card-level">{cert.level}</span>
              <span className="cert-showcase__card-title">{cert.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="cert-showcase__cta-wrap">
        <Link className="cert-showcase__cta" to="/#certificaciones">
          Más información sobre las certificaciones BCP
          <IconExternal />
        </Link>
      </div>
    </section>
  )
}
