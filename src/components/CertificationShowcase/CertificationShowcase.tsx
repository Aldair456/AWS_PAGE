import { Link } from 'react-router-dom'
import { CLOUD_CERTIFICATIONS, cloudCertificationPath } from '../../data/cloudCertifications'
import { ScrollReveal } from '../ScrollReveal'
import './CertificationShowcase.css'

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
      <ScrollReveal>
        <h2 id="cert-showcase-title" className="cert-showcase__title">
          Desde cero hasta la certificación
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <p className="cert-showcase__desc">
          Recorre la ruta en la nube de BCP en tres niveles. Orden sugerido: Starter, Builder y Expert.
          Cada insignia coincide con los retos que publica el banco.
        </p>
      </ScrollReveal>

      <ul className="cert-showcase__grid">
        {CLOUD_CERTIFICATIONS.map((cert, index) => (
          <ScrollReveal as="li" key={cert.id} delay={index * 100}>
            <Link
              className="cert-showcase__card"
              to={cloudCertificationPath(cert.id)}
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
          </ScrollReveal>
        ))}
      </ul>

      <ScrollReveal delay={120}>
        <div className="cert-showcase__cta-wrap">
          <Link className="cert-showcase__cta" to="/#certificaciones">
            Más información sobre las certificaciones BCP
            <IconExternal />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
