import { CertificationCard, type CertificationCardData } from './CertificationCard'
import './BasicCertifications.css'

const BASIC_CERTIFICATIONS: CertificationCardData[] = [
  {
    brand: 'BCP',
    level: 'FOUNDATIONAL',
    title: 'Certificación Cloud Practitioner',
    description:
      'Demuestra conocimientos básicos sobre la nube, retos digitales y fundamentos de servicios BCP. Ideal si recién empiezas en tecnología financiera y quieres validar tu primer paso con un certificado reconocido.',
    href: '#cert-cloud',
  },
  {
    brand: 'BCP',
    level: 'FOUNDATIONAL',
    title: 'Certificación en IA aplicada',
    description:
      'Descubre nuevas posibilidades profesionales con esta certificación de inteligencia artificial. Completa retos guiados por BCP y aplica conceptos de IA en casos reales del sector bancario.',
    href: '#cert-ia',
  },
  {
    brand: 'Interbank',
    level: 'FOUNDATIONAL',
    title: 'Certificación en datos y analítica',
    description:
      'Valida habilidades iniciales en datos, reportes y toma de decisiones con retos del sector financiero. Interbank diseñó desafíos para que practiques análisis y presentación de resultados.',
    href: '#cert-datos',
  },
]

export function BasicCertifications() {
  return (
    <section className="basic-certs" aria-labelledby="basic-certs-title">
      <h2 id="basic-certs-title" className="basic-certs__title">
        Certificaciones básicas
      </h2>
      <p className="basic-certs__subtitle">
        Conozca los conceptos fundamentales y básicos de la plataforma BCP. No se necesita
        experiencia previa.
      </p>

      <ul className="basic-certs__grid">
        {BASIC_CERTIFICATIONS.map((cert) => (
          <li key={cert.href}>
            <CertificationCard certification={cert} />
          </li>
        ))}
      </ul>
    </section>
  )
}
