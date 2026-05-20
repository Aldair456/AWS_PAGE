import { CertificationBadge } from './CertificationBadge'

export type CertificationCardData = {
  brand: string
  level: string
  title: string
  description: string
  href: string
  variant?: 'foundational' | 'professional' | 'specialty'
  badgeRole?: string
  badgeImage?: string
  badgeAlt?: string
}

type CertificationCardProps = {
  certification: CertificationCardData
}

function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { brand, level, title, description, href, variant, badgeRole, badgeImage, badgeAlt } =
    certification

  return (
    <article
      className={variant === 'specialty' ? 'cert-card cert-card--specialty' : 'cert-card'}
    >
      {badgeImage ? (
        <div className="cert-badge cert-badge--image">
          <img
            src={badgeImage}
            alt={badgeAlt ?? `Insignia ${title}`}
            className="cert-badge__img"
          />
        </div>
      ) : (
        <CertificationBadge
          brand={brand}
          level={level}
          variant={variant}
          badgeRole={badgeRole}
        />
      )}

      <div className="cert-card__body">
        <h3 className="cert-card__title">{title}</h3>
        <p className="cert-card__description">{description}</p>
      </div>

      <footer className="cert-card__footer">
        <a
          className="cert-card__link"
          href={href}
          aria-label={`Más información sobre ${title}`}
        >
          <span className="cert-card__link-label">Más información</span>
          <span className="cert-card__link-icon" aria-hidden>
            <IconArrow />
          </span>
        </a>
        <button type="button" className="cert-card__add" aria-label={`Agregar ${title}`}>
          <IconPlus />
        </button>
      </footer>
    </article>
  )
}
