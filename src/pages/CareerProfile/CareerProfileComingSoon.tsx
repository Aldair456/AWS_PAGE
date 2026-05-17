import { Link } from 'react-router-dom'
import type { CareerProfileMeta } from '../../data/careerProfiles'
import { CareerProfileLayout } from './CareerProfileLayout'

type CareerProfileComingSoonProps = {
  profile: CareerProfileMeta
}

export function CareerProfileComingSoon({ profile }: CareerProfileComingSoonProps) {
  return (
    <CareerProfileLayout profile={profile}>
      <section className="career-profile__empty">
        <h2 className="career-profile__empty-title">Ruta en preparación</h2>
        <p className="career-profile__empty-text">
          Estamos armando retos y certificaciones para {profile.career}. Mientras tanto, explora el
          panel o prueba el perfil de Ingeniería industrial.
        </p>
        <div className="career-profile__actions">
          <Link className="career-profile__btn career-profile__btn--primary" to="/estudiante/panel">
            Volver a mi panel
          </Link>
          <Link
            className="career-profile__btn career-profile__btn--ghost"
            to="/estudiante/carrera/industrial"
          >
            Ver Ingeniería industrial
          </Link>
        </div>
      </section>
    </CareerProfileLayout>
  )
}
