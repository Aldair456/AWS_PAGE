import badgeAssociado from '../../assets/IT_ASSOCIADO.png'
import badgePractitioner from '../../assets/IT_PRACTIONER.png'
import badgeProfessional from '../../assets/IT_PROFESSIONAL.png'
import { CertificationCard, type CertificationCardData } from './CertificationCard'
import './BasicCertifications.css'

/** Orden sugerido: Starter (entrada) → Builder → Expert */
const BASIC_CERTIFICATIONS: CertificationCardData[] = [
  {
    brand: 'BCP',
    level: 'PRACTITIONER',
    title: 'Certificación IT Data Practitioner',
    description:
      'Nivel de entrada en TI. Resuelves retos reales publicados por BCP sobre nube, servicios digitales y fundamentos tecnológicos. Ideal si recién empiezas y quieres tu primer certificado con el banco.',
    href: '#cert-it-practitioner',
    badgeImage: badgePractitioner,
    badgeAlt: 'Insignia IT Data Practitioner — retos BCP',
  },
  {
    brand: 'BCP',
    level: 'ASSOCIATE',
    title: 'Certificación IT Data Associate',
    description:
      'Siguiente paso en la ruta TI con BCP. Completas retos guiados de mayor profundidad: integración, datos operativos e IA aplicada en casos del sector bancario diseñados por el banco.',
    href: '#cert-it-associate',
    badgeImage: badgeAssociado,
    badgeAlt: 'Insignia IT Data Associate — retos BCP',
  },
  {
    brand: 'BCP',
    level: 'PROFESSIONAL',
    title: 'Certificación IT Data Professional',
    description:
      'Retos de BCP en datos y analítica. Validas habilidades en reportes, indicadores y toma de decisiones resolviendo desafíos que el banco publica para estudiantes de TI.',
    href: '#cert-it-professional',
    badgeImage: badgeProfessional,
    badgeAlt: 'Insignia IT Data Professional — retos BCP',
  },
]

export function BasicCertifications() {
  return (
    <section className="basic-certs" aria-labelledby="basic-certs-title">
      <h2 id="basic-certs-title" className="basic-certs__title">
        Certificaciones en IT Datos
      </h2>
      <p className="basic-certs__subtitle">
        Certificaciones de Tecnologías de la Información con BCP: resuelves los retos que el
        banco publica y obtienes el certificado con ellos. Orden sugerido: Starter, Builder y
        Expert. Sin experiencia previa para empezar con Starter.
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
