import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CareerProfileMeta } from '../../data/careerProfiles'
import type { CompanyChallenge } from '../../data/companyChallenges'
import logoDita from '../../assets/lg_dita.png'
import './CareerChallengeCatalog.css'

type CareerChallengeCatalogProps = {
  profile: CareerProfileMeta
  challenges: CompanyChallenge[]
}

const FILTER_PLACEHOLDERS = [
  'Dominio',
  'Certificación relacionada',
  'Empresa aliada',
  'Formato',
  'Duración',
  'Nivel de habilidad',
  'Nivel de acceso',
  'Tipo',
]

function IconStar() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#ff9900" aria-hidden>
      <path d="M12 2l3.1 6.3 7 .9-5.1 4.8 1.2 7L12 17.8 6.8 21l1.2-7-5.1-4.8 7-.9L12 2z" />
    </svg>
  )
}

function FilterCaret() {
  return (
    <svg
      className="challenge-catalog__filter-caret"
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="#0073bb"
      aria-hidden
    >
      <path d="M0 0h8L4 5 0 0z" />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function CareerChallengeCatalog({ profile, challenges }: CareerChallengeCatalogProps) {
  const [sortBy, setSortBy] = useState('relevance')

  const sorted = useMemo(() => {
    const list = [...challenges]
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }
    if (sortBy === 'duration') {
      list.sort((a, b) => a.duration.localeCompare(b.duration))
    }
    return list
  }, [challenges, sortBy])

  const total = sorted.length

  return (
    <div className="challenge-catalog">
      <header className="challenge-catalog__hero">
        <div className="challenge-catalog__hero-text">
          <h1 className="challenge-catalog__title">{profile.profile}</h1>
          <p className="challenge-catalog__desc">
            Estos planes de retos y certificaciones están diseñados por empresas como{' '}
            <strong>BCP</strong> e <strong>Interbank</strong> para estudiantes de{' '}
            <strong>{profile.career}</strong>. Completa casos prácticos, demuestra tus
            competencias y obtén certificaciones con respaldo de la empresa.
          </p>
        </div>
        <div className="challenge-catalog__hero-icon">
          <img src={logoDita} alt="DITA" className="challenge-catalog__hero-logo" />
        </div>
      </header>

      <section className="challenge-catalog__filters" aria-label="Filtros de retos">
        <p className="challenge-catalog__filters-label">Filtro</p>
        <div className="challenge-catalog__filter-row">
          {FILTER_PLACEHOLDERS.map((label) => (
            <button
              key={label}
              type="button"
              className="challenge-catalog__filter-dropdown challenge-catalog__filter-dropdown--placeholder"
            >
              <span>{label}</span>
              <FilterCaret />
            </button>
          ))}
        </div>
        <div className="challenge-catalog__filter-row">
          <button
            type="button"
            className="challenge-catalog__filter-dropdown challenge-catalog__filter-dropdown--value"
          >
            <span>Español (Perú)</span>
            <FilterCaret />
          </button>
        </div>
      </section>

      <div className="challenge-catalog__results-bar">
        <p className="challenge-catalog__count">
          1–{total} de {total} {total === 1 ? 'reto' : 'retos'}
        </p>
        <label className="challenge-catalog__sort">
          <span className="challenge-catalog__sort-label">Ordenar por:</span>
          <span className="challenge-catalog__sort-control">
            <select
              className="challenge-catalog__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Ordenar retos"
            >
              <option value="relevance">Relevancia</option>
              <option value="rating">Mejor valorados</option>
              <option value="duration">Duración</option>
            </select>
            <IconChevron />
          </span>
        </label>
      </div>

      <ul className="challenge-catalog__grid">
        {sorted.map((challenge) => (
          <li key={challenge.id}>
            <Link
              to={`/estudiante/carrera/${profile.id}/reto/${challenge.id}`}
              className="challenge-catalog__card-link"
            >
            <article className="challenge-catalog__card">
              <div className="challenge-catalog__card-top">
                <span className="challenge-catalog__card-source">
                  Reto {challenge.company}
                </span>
                <img
                  src={logoDita}
                  alt=""
                  aria-hidden
                  className="challenge-catalog__card-logo"
                />
              </div>

              <h2 className="challenge-catalog__card-title">{challenge.title}</h2>

              <dl className="challenge-catalog__card-details">
                <div className="challenge-catalog__detail-row">
                  <dt>Dominio</dt>
                  <dd>{challenge.domain}</dd>
                </div>
                <div className="challenge-catalog__detail-row">
                  <dt>Servicios</dt>
                  <dd>{challenge.competencies}</dd>
                </div>
              </dl>

              <footer className="challenge-catalog__card-footer">
                <span className="challenge-catalog__footer-item challenge-catalog__rating">
                  <IconStar />
                  {challenge.rating.toFixed(1)} ({challenge.reviews})
                </span>
                <span className="challenge-catalog__footer-item">{challenge.level}</span>
                <span className="challenge-catalog__footer-item">{challenge.duration}</span>
                <span className="challenge-catalog__footer-item">{challenge.language}</span>
              </footer>
            </article>
            </Link>
          </li>
        ))}
      </ul>

      <nav className="challenge-catalog__pagination" aria-label="Paginación">
        <button type="button" className="challenge-catalog__page-btn" disabled aria-label="Anterior">
          ‹
        </button>
        <span className="challenge-catalog__page-num" aria-current="page">
          1
        </span>
        <button type="button" className="challenge-catalog__page-btn" disabled aria-label="Siguiente">
          ›
        </button>
      </nav>
    </div>
  )
}
