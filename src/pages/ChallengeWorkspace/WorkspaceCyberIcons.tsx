type IconProps = { className?: string }

export function CyberIconLevel({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="14" width="4" height="6" rx="1" fill="#ff8000" />
      <rect x="10" y="10" width="4" height="10" rx="1" fill="#ff8000" />
      <rect x="16" y="6" width="4" height="14" rx="1" fill="#ff8000" />
    </svg>
  )
}

export function CyberIconDuration({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="#ff8000" strokeWidth="1.5" />
      <path d="M4 9h16M8 3v3M16 3v3" stroke="#ff8000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CyberIconCert({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="5" stroke="#ff8000" strokeWidth="1.5" />
      <path
        d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5"
        stroke="#ff8000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CyberPipeModelo({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="12" r="1.2" fill="currentColor" />
      <circle cx="14" cy="12" r="1.2" fill="currentColor" />
      <path d="M12 5v3M9 5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function CyberPipeTools({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.5 6.5l3 3-2 2-3-3M8 16l-2 2 2 2 2-2-2-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M11 9l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function CyberPipeMemory({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="7" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7V5M12 7V5M16 7V5M8 17v2M12 17v2M16 17v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function CyberPipePrompt({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 5h10v14H7z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 9h6M10 12h6M10 15h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function CyberPipeIntegration({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 11l7-4M8.5 13l7 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function CyberPipeCloud({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 18h8a3 3 0 0 0 .5-6 4 4 0 0 0-7.8-1.2A3 3 0 0 0 8 18z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M12 11V8M10 9.5l2-1.5 2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function CyberPipeDemo({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 9l6 3-6 3V9z" fill="currentColor" />
    </svg>
  )
}
