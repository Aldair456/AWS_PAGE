import { Link } from 'react-router-dom'
import { CertificationBadge } from '../BasicCertifications/CertificationBadge'
import '../BasicCertifications/BasicCertifications.css'
import './CertificationShowcase.css'

type ShowcaseCert = {
  id: string
  brand: string
  level: string
  variant: 'foundational' | 'associate' | 'professional' | 'specialty'
  badgeRole: string
  href: string
}

const SHOWCASE_CERTIFICATIONS: ShowcaseCert[] = [
  {
    id: 'cloud',
    brand: 'BCP',
    level: 'FOUNDATIONAL',
    variant: 'foundational',
    badgeRole: 'Cloud Practitioner',
    href: '/#cert-cloud',
  },
  {
    id: 'ai-base',
    brand: 'BCP',
    level: 'FOUNDATIONAL',
    variant: 'foundational',
    badgeRole: 'AI Practitioner',
    href: '/#cert-ia',
  },
  {
    id: 'datos-base',
    brand: 'Interbank',
    level: 'FOUNDATIONAL',
    variant: 'foundational',
    badgeRole: 'Data Foundations',
    href: '/#cert-datos',
  },
  {
    id: 'sa-assoc',
    brand: 'BCP',
    level: 'ASSOCIATE',
    variant: 'associate',
    badgeRole: 'Solutions Architect',
    href: '/#cert-sa-assoc',
  },
  {
    id: 'dev-assoc',
    brand: 'BCP',
    level: 'ASSOCIATE',
    variant: 'associate',
    badgeRole: 'Developer',
    href: '/#cert-dev-assoc',
  },
  {
    id: 'ops-assoc',
    brand: 'BCP',
    level: 'ASSOCIATE',
    variant: 'associate',
    badgeRole: 'Cloud Ops',
    href: '/#cert-ops-assoc',
  },
  {
    id: 'sa-pro',
    brand: 'BCP',
    level: 'PROFESSIONAL',
    variant: 'professional',
    badgeRole: 'Solutions Architect',
    href: '/#cert-sa-pro',
  },
  {
    id: 'devops-pro',
    brand: 'BCP',
    level: 'PROFESSIONAL',
    variant: 'professional',
    badgeRole: 'DevOps Engineer',
    href: '/#cert-devops-pro',
  },
  {
    id: 'genai-pro',
    brand: 'BCP',
    level: 'PROFESSIONAL',
    variant: 'professional',
    badgeRole: 'Gen AI Developer',
    href: '/#cert-genai-pro',
  },
  {
    id: 'security',
    brand: 'BCP',
    level: 'SPECIALTY',
    variant: 'specialty',
    badgeRole: 'Security',
    href: '/#cert-security',
  },
  {
    id: 'ml',
    brand: 'BCP',
    level: 'SPECIALTY',
    variant: 'specialty',
    badgeRole: 'Machine Learning',
    href: '/#cert-ml',
  },
  {
    id: 'networking',
    brand: 'Interbank',
    level: 'SPECIALTY',
    variant: 'specialty',
    badgeRole: 'Networking',
    href: '/#cert-networking',
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
        Comienza con certificaciones básicas, avanza a nivel asociado y profesional, y especialízate
        en áreas clave del sector financiero completando retos diseñados por BCP e Interbank.
      </p>

      <ul className="cert-showcase__grid">
        {SHOWCASE_CERTIFICATIONS.map((cert) => (
          <li key={cert.id}>
            <Link
              className="cert-showcase__card"
              to={cert.href}
              aria-label={`${cert.badgeRole} ${cert.level}`}
            >
              <CertificationBadge
                brand={cert.brand}
                level={cert.level}
                variant={cert.variant}
                badgeRole={cert.badgeRole}
              />
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
