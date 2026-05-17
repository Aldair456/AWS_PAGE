import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import type { CareerProfileMeta } from '../../data/careerProfiles'
import '../../App.css'
import './CareerProfile.css'

type CareerProfileLayoutProps = {
  profile: CareerProfileMeta
  children: ReactNode
  variant?: 'default' | 'catalog' | 'detail'
  breadcrumbs?: ReactNode
}

export function CareerProfileLayout({
  profile,
  children,
  variant = 'default',
  breadcrumbs,
}: CareerProfileLayoutProps) {
  const isCatalog = variant === 'catalog' || variant === 'detail'
  const isDetail = variant === 'detail'
  return (
    <div className="app career-profile-app">
      <Header />

      <div className="career-profile">
        <div className="career-profile__bg" aria-hidden />

        <div
          className={`career-profile__inner ${isCatalog ? 'career-profile__inner--catalog' : ''} ${isDetail ? 'career-profile__inner--detail' : ''}`}
        >
          {breadcrumbs ?? (
            <nav className="career-profile__breadcrumbs" aria-label="Ruta de navegación">
              <Link to="/estudiante/panel">Mi panel</Link>
              <span aria-hidden>&gt;</span>
              <span>{profile.career}</span>
            </nav>
          )}

          {!isCatalog && (
            <header className="career-profile__hero">
              <p className="career-profile__eyebrow">Perfil profesional</p>
              <h1 className="career-profile__title">{profile.career}</h1>
              <p className="career-profile__role">{profile.profile}</p>
              <p className="career-profile__summary">{profile.summary}</p>
            </header>
          )}

          {children}
        </div>
      </div>
    </div>
  )
}
