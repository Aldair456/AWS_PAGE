import {
  CertificationCard,
  type CertificationCardData,
} from '../BasicCertifications/CertificationCard'
import '../BasicCertifications/BasicCertifications.css'

const PROFESSIONAL_CERTIFICATIONS: CertificationCardData[] = [
  {
    brand: 'BCP',
    level: 'PROFESSIONAL',
    badgeRole: 'Solutions Architect',
    variant: 'professional',
    title: 'Certificación Solutions Architect - Professional',
    description:
      'Demuestre competencias avanzadas para diseñar soluciones optimizadas en la plataforma BCP. Incluye retos de arquitectura, seguridad y costos en escenarios de banca digital.',
    href: '#cert-sa-pro',
  },
  {
    brand: 'BCP',
    level: 'PROFESSIONAL',
    badgeRole: 'DevOps Engineer',
    variant: 'professional',
    title: 'Certificación DevOps Engineer - Professional',
    description:
      'Demuestre competencias avanzadas para integrar desarrollo de software con operaciones en la nube. Automatización, pipelines y monitoreo con casos inspirados en equipos de BCP.',
    href: '#cert-devops-pro',
  },
  {
    brand: 'BCP',
    level: 'PROFESSIONAL',
    badgeRole: 'Generative AI Developer',
    variant: 'professional',
    title: 'Certificación Generative AI Developer - Professional',
    description:
      'Demuestre habilidades avanzadas para crear e implementar soluciones de IA listas para producción. Retos sobre modelos, prompts y despliegue responsable en entornos regulados.',
    href: '#cert-genai-pro',
  },
]

export function ProfessionalCertifications() {
  return (
    <section className="basic-certs pro-certs" aria-labelledby="pro-certs-title">
      <h2 id="pro-certs-title" className="basic-certs__title">
        Certificaciones de nivel Profesional
      </h2>
      <p className="basic-certs__subtitle">
        Domine la arquitectura y las soluciones avanzadas de la plataforma BCP. Se requieren más
        de 2 años de experiencia.
      </p>

      <ul className="basic-certs__grid">
        {PROFESSIONAL_CERTIFICATIONS.map((cert) => (
          <li key={cert.href}>
            <CertificationCard certification={cert} />
          </li>
        ))}
      </ul>
    </section>
  )
}
