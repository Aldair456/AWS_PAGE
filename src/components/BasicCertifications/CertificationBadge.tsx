type CertificationBadgeProps = {
  brand: string
  level: string
  variant?: 'foundational' | 'associate' | 'professional' | 'specialty'
  badgeRole?: string
}

export function CertificationBadge({
  brand,
  level,
  variant = 'foundational',
  badgeRole,
}: CertificationBadgeProps) {
  const fillOuter =
    variant === 'professional'
      ? '#0f7a8c'
      : variant === 'associate'
        ? '#0073bb'
        : variant === 'specialty'
          ? '#6b4e9b'
          : '#3d4551'
  const fillInner =
    variant === 'professional'
      ? '#14a3b8'
      : variant === 'associate'
        ? '#0d8bd9'
        : variant === 'specialty'
          ? '#7b539d'
          : '#545b64'
  const strokeOuter =
    variant === 'professional'
      ? '#0a5f6e'
      : variant === 'associate'
        ? '#005a9e'
        : variant === 'specialty'
          ? '#523c73'
          : '#232f3e'

  return (
    <div className={`cert-badge cert-badge--${variant}`} aria-hidden>
      <div className="cert-badge__hex-wrap">
        <svg className="cert-badge__hex" viewBox="0 0 120 132" fill="none">
          <path
            d="M60 4 L110 32 V88 L60 116 L10 88 V32 Z"
            fill={fillOuter}
            stroke={strokeOuter}
            strokeWidth="1"
          />
          <path d="M60 18 L96 38 V82 L60 102 L24 82 V38 Z" fill={fillInner} />
        </svg>
        {badgeRole && <span className="cert-badge__role">{badgeRole}</span>}
      </div>
      <div className="cert-badge__label">
        <span className="cert-badge__brand">{brand}</span>
        <span className="cert-badge__level">{level}</span>
      </div>
    </div>
  )
}
