import './SubNav.css'

const subNavLinks = [
  { label: 'Explorar retos', hasChevron: true, href: '#retos' },
  { label: 'Certificaciones', hasChevron: true, href: '#certificaciones' },
  { label: 'Perfiles de estudiante', href: '#perfiles' },
  { label: 'Empresas aliadas', hasChevron: true, href: '#empresas' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Más', hasChevron: true, href: '#mas' },
]

function IconChevron() {
  return (
    <svg className="subnav__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function SubNav() {
  return (
    <nav className="subnav" aria-label="Retos y certificaciones">
      <div className="subnav__inner">
        <a className="subnav__title" href="#retos-certificaciones">
          Retos y certificaciones
        </a>
        <ul className="subnav__list">
          {subNavLinks.map((link) => (
            <li key={link.label}>
              <a className="subnav__link" href={link.href}>
                {link.label}
                {link.hasChevron && <IconChevron />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
