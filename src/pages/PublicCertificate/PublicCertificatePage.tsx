import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { getEstudianteCertificacion, type EstudianteCertificacion } from '../../api/certificaciones'
import certificationBadge from '../../assets/CERTIFACION_IT.png'
import { buildPublicCertificacionUrl } from '../../utils/certificacionLinks'
import '../ChallengeCertificate/ChallengeCertificatePage.css'

function formatIssueDate(date: Date) {
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function PublicCertificatePage() {
  const { certificacionId } = useParams<{ certificacionId: string }>()
  const [estudiante, setEstudiante] = useState<EstudianteCertificacion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!certificacionId?.trim()) {
      setError('Enlace de certificación inválido.')
      setLoading(false)
      return
    }

    let cancelled = false

    void getEstudianteCertificacion(certificacionId)
      .then((data) => {
        if (!cancelled) setEstudiante(data)
      })
      .catch((err) => {
        if (cancelled) return
        const message =
          err instanceof ApiError
            ? typeof err.body === 'object' &&
              err.body &&
              typeof (err.body as Record<string, unknown>).message === 'string'
              ? String((err.body as Record<string, unknown>).message)
              : err.message
            : 'No pudimos cargar esta certificación.'
        setError(message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [certificacionId])

  const issued = new Date()
  const expires = new Date(issued)
  expires.setFullYear(expires.getFullYear() + 3)

  if (loading) {
    return (
      <div className="challenge-certificate">
        <main className="challenge-certificate__main" style={{ gridTemplateColumns: '1fr' }}>
          <p className="challenge-certificate__description">Cargando certificación…</p>
        </main>
      </div>
    )
  }

  if (error || !estudiante || !certificacionId) {
    return (
      <div className="challenge-certificate">
        <main className="challenge-certificate__main" style={{ gridTemplateColumns: '1fr' }}>
          <h1 className="challenge-certificate__title">Certificación no disponible</h1>
          <p className="challenge-certificate__description">{error ?? 'Certificación no encontrada.'}</p>
          <Link to="/" className="challenge-certificate__learn-more">
            Ir al inicio BCP Retos
          </Link>
        </main>
      </div>
    )
  }

  const shareUrl = buildPublicCertificacionUrl(certificacionId)

  return (
    <div className="challenge-certificate">
      <header className="challenge-certificate__topbar">
        <div className="challenge-certificate__holder">
          <span className="challenge-certificate__avatar" aria-hidden>
            {initialsFromName(estudiante.nombre)}
          </span>
          <div>
            <p className="challenge-certificate__issued-label">
              Esta certificación fue emitida a <strong>{estudiante.nombre}</strong>
            </p>
            <p className="challenge-certificate__dates">
              Fecha de emisión: {formatIssueDate(issued)} · Vence: {formatIssueDate(expires)}
            </p>
          </div>
        </div>
        <div className="challenge-certificate__top-actions">
          <span className="challenge-certificate__verify">
            <span className="challenge-certificate__verify-icon" aria-hidden>
              ✓
            </span>
            Verificado BCP
          </span>
        </div>
      </header>

      <main className="challenge-certificate__main">
        <div className="challenge-certificate__badge-wrap">
          <img
            src={certificationBadge}
            alt="Certificación BCP"
            className="challenge-certificate__badge-img"
          />
        </div>

        <article className="challenge-certificate__details">
          <h1 className="challenge-certificate__title">Certificación BCP — Reto completado</h1>
          <p className="challenge-certificate__issuer">
            Emitida por <strong>BCP Retos</strong> · Programa de certificación estudiantil
          </p>

          <p className="challenge-certificate__description">
            <strong>{estudiante.nombre}</strong> obtuvo esta certificación en el programa de retos
            BCP, carrera <strong>{estudiante.carrera || '—'}</strong>, tras completar la evaluación
            con IA y alcanzar los criterios de aprobación del reto.
          </p>

          <p className="challenge-certificate__description" style={{ fontSize: '12px' }}>
            Enlace para compartir:{' '}
            <a href={shareUrl} style={{ color: '#0073bb', wordBreak: 'break-all' }}>
              {shareUrl}
            </a>
          </p>

          <ul className="challenge-certificate__tags" aria-label="Categorías">
            <li>Certificación</li>
            <li>{estudiante.carrera || 'Carrera universitaria'}</li>
            <li>BCP Retos</li>
          </ul>

          <section className="challenge-certificate__block">
            <h2>Titular</h2>
            <ul className="challenge-certificate__skills">
              <li>{estudiante.nombre}</li>
              <li>{estudiante.carrera}</li>
            </ul>
          </section>

          <div className="challenge-certificate__footer-links">
            <Link to="/">← BCP Retos</Link>
            <Link to="/estudiante/iniciar-sesion">Acceso estudiantes</Link>
          </div>
        </article>
      </main>
    </div>
  )
}
