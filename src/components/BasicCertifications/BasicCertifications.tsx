import { IT_DATA_CERTIFICATIONS, toItDataCertificationCardData } from '../../data/itDataCertifications'
import { ScrollReveal } from '../ScrollReveal'
import { CertificationCard } from './CertificationCard'
import './BasicCertifications.css'

const BASIC_CERTIFICATIONS = IT_DATA_CERTIFICATIONS.map(toItDataCertificationCardData)

export function BasicCertifications() {
  return (
    <section className="basic-certs" aria-labelledby="basic-certs-title">
      <ScrollReveal>
        <h2 id="basic-certs-title" className="basic-certs__title">
          Certificaciones en IT Datos
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <p className="basic-certs__subtitle">
          Certificaciones de Tecnologías de la Información con BCP: resuelves los retos que el
          banco publica y obtienes el certificado con ellos. Orden sugerido: Starter, Builder y
          Expert. Sin experiencia previa para empezar con Starter.
        </p>
      </ScrollReveal>

      <ul className="basic-certs__grid">
        {BASIC_CERTIFICATIONS.map((cert, index) => (
          <ScrollReveal as="li" key={cert.level} delay={index * 100}>
            <CertificationCard certification={cert} />
          </ScrollReveal>
        ))}
      </ul>
    </section>
  )
}
