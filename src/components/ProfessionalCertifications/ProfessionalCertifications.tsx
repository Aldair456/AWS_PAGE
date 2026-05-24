import { CLOUD_CERTIFICATIONS, toCertificationCardData } from '../../data/cloudCertifications'
import { ScrollReveal } from '../ScrollReveal'
import { CertificationCard } from '../BasicCertifications/CertificationCard'
import '../BasicCertifications/BasicCertifications.css'

const PROFESSIONAL_CERTIFICATIONS = CLOUD_CERTIFICATIONS.map(toCertificationCardData)

export function ProfessionalCertifications() {
  return (
    <section className="basic-certs pro-certs" aria-labelledby="pro-certs-title">
      <ScrollReveal>
        <h2 id="pro-certs-title" className="basic-certs__title">
          Certificaciones Cloud BCP
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <p className="basic-certs__subtitle">
          Recorre la ruta en la nube de BCP en tres niveles. Orden sugerido: Starter, Builder y Expert.
          Cada insignia coincide con los retos que publica el banco.
        </p>
      </ScrollReveal>

      <ul className="basic-certs__grid">
        {PROFESSIONAL_CERTIFICATIONS.map((cert, index) => (
          <ScrollReveal as="li" key={cert.level} delay={index * 100}>
            <CertificationCard certification={cert} />
          </ScrollReveal>
        ))}
      </ul>
    </section>
  )
}
