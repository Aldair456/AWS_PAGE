import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IT_CERTIFICATION_PATHS } from '../../data/itCertificationPaths'
import './ItCertificationPathModal.css'

type ItCertificationPathModalProps = {
  open: boolean
  onClose: () => void
  careerPath: string
}

export function ItCertificationPathModal({ open, onClose, careerPath }: ItCertificationPathModalProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const handleSelect = () => {
    navigate(careerPath)
    onClose()
  }

  return (
    <div className="it-path-modal" role="presentation">
      <button
        type="button"
        className="it-path-modal__backdrop"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div
        className="it-path-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="it-path-modal-title"
      >
        <button type="button" className="it-path-modal__close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <h2 id="it-path-modal-title" className="it-path-modal__title">
          ¿Qué certificación IT Data quieres obtener?
        </h2>
        <p className="it-path-modal__subtitle">
          Elige la ruta con la que deseas comenzar. Todas te llevan a los retos de BCP para esa carrera.
        </p>

        <ul className="it-path-modal__grid">
          {IT_CERTIFICATION_PATHS.map((path) => (
            <li key={path.id}>
              <button type="button" className="it-path-modal__option" onClick={handleSelect}>
                <img
                  src={path.coverImage}
                  alt=""
                  className="it-path-modal__cover"
                  loading="lazy"
                  aria-hidden
                />
                <img src={path.badgeImage} alt={path.badgeAlt} className="it-path-modal__badge" />
                <span className="it-path-modal__level">{path.level}</span>
                <span className="it-path-modal__name">{path.title}</span>
                <span className="it-path-modal__track">{path.track}</span>
                <span className="it-path-modal__desc">{path.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
