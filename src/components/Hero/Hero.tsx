import { useEffect, useState } from 'react'
import './Hero.css'

const ROTATING_WORDS = ['Certifícate', 'Aprende', 'Prepárate', 'Demuestra', 'Avanza']

const WORD_INTERVAL_MS = 2800

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROTATING_WORDS.length)
    }, WORD_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="hero__word" aria-live="polite">
      <span key={ROTATING_WORDS[index]} className="hero__word-inner">
        {ROTATING_WORDS[index]}
      </span>
    </span>
  )
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <nav className="hero__breadcrumbs" aria-label="Ruta de navegación">
        <a href="#inicio">Inicio</a>
        <span className="hero__breadcrumb-sep" aria-hidden>
          &gt;
        </span>
        <span>Certificaciones por retos</span>
      </nav>

      <h1 id="hero-title" className="hero__title">
        <span className="hero__title-line">
          <RotatingWord /> completando retos
        </span>
        <span className="hero__title-line">que diseñan las empresas</span>
      </h1>

      <p className="hero__subtitle">
        BCP, Interbank y otras empresas publican desafíos reales. Tú los resuelves, demuestras
        habilidades y obtienes certificaciones que respaldan tu perfil ante empleadores, sin
        importar si vienes de ingeniería, administración, economía u otro camino universitario.
      </p>

      <div className="hero__actions">
        <a className="hero__btn hero__btn--primary" href="#retos">
          Explorar retos
        </a>
        <a className="hero__btn hero__btn--secondary" href="#certificaciones">
          Ver certificaciones disponibles
        </a>
      </div>
    </section>
  )
}
