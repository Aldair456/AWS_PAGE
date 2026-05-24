import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo_v1.png'
import { useStudentSession } from '../../hooks/useStudentSession'
import { clearStudentSession } from '../../utils/studentSession'
import './Header.css'

const utilityLinks = [
  { label: 'Español', hasChevron: true, icon: 'globe' as const },
  { label: 'Contáctenos', href: '#contacto' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Soporte', hasChevron: true, href: '#soporte' },
  { label: 'Mi cuenta', hasChevron: true, href: '#cuenta' },
]

const navLinks = [
  { label: 'Retos', href: '#retos' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Para empresas', href: '#empresas' },
  { label: 'Universidades', href: '#universidades' },
  { label: 'Cómo funciona', href: '#como-funciona' },
]

function IconGlobe() {
  return (
    <svg className="header__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.5 2.8 4 6.2 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6.2-4 9s1.5 6.2 4 9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg className="header__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg className="header__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg className="header__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 18.5c1.2-2.2 3.2-3.5 5.5-3.5s4.3 1.3 5.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Header() {
  const session = useStudentSession()
  const navigate = useNavigate()
  const firstName = session?.name.split(' ')[0]

  const handleLogout = () => {
    clearStudentSession()
    navigate('/')
  }

  return (
    <header className="header">
      <nav className="header__utility" aria-label="Enlaces de utilidad">
        <ul className="header__utility-list">
          {utilityLinks.map((item) => (
            <li key={item.label} className="header__utility-item">
              <a className="header__utility-link" href={item.href ?? '#'}>
                {item.icon === 'globe' && <IconGlobe />}
                {item.label}
                {item.hasChevron && <IconChevron />}
              </a>
            </li>
          ))}
          <li className="header__utility-item">
            <a
              className="header__utility-link header__utility-link--icon"
              href="#perfil"
              aria-label="Perfil de usuario"
            >
              <IconUser />
            </a>
          </li>
        </ul>
      </nav>

      <div className="header__main">
        <div className="header__brand-group">
          <Link className="header__logo" to="/" aria-label="Inicio">
            <img src={logo} alt="BCP Retos" className="header__logo-img" />
          </Link>
          <a className="header__summit" href="#aliados">
            Empresas aliadas
          </a>
          <span className="header__divider" aria-hidden />
        </div>

        <nav className="header__nav" aria-label="Navegación principal">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a className="header__nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button type="button" className="header__search" aria-label="Búsqueda">
            <IconSearch />
            Búsqueda
          </button>
          {session ? (
            <>
              <Link className="header__login" to="/estudiante/panel">
                Hola, {firstName}
              </Link>
              <button type="button" className="header__cta header__cta--logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link className="header__login" to="/estudiante/iniciar-sesion">
                Iniciar sesión
              </Link>
              <Link className="header__cta" to="/estudiante/registro">
                Soy estudiante
              </Link>
            </>
          )}
        </div>
        </div>
    </header>
  )
}
