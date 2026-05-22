import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { parseEstudianteId } from '../../api/estudiantes/parseResponse'
import { postEstudiante } from '../../api/estudiantes'
import { Toast } from '../../components/Toast/Toast'
import { saveStudentSession } from '../../utils/studentSession'
import './StudentAuth.css'

type StudentAuthMode = 'signup' | 'signin'

type StudentAuthProps = {
  mode: StudentAuthMode
}

const CAREERS = [
  'Ingeniería de sistemas',
  'Computación e informática',
  'Administración y negocios',
  'Economía y finanzas',
  'Contabilidad',
  'Ciencia de datos',
  'Otra carrera',
]

function PromoIllustration() {
  return (
    <svg
      className="student-auth__illustration"
      viewBox="0 0 280 200"
      fill="none"
      aria-hidden
    >
      <path
        d="M40 160h80l20-48 28 48h52"
        stroke="#0073bb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 112V72l32-24 32 24v40"
        stroke="#0073bb"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M152 48c12-20 36-28 56-16 8 20-4 44-28 52-8-18 2-32-28-36Z"
        fill="#0073bb"
        fillOpacity="0.12"
        stroke="#0073bb"
        strokeWidth="1.5"
      />
      <circle cx="200" cy="56" r="6" fill="#ff9900" />
      <rect x="24" y="168" width="32" height="20" rx="2" stroke="#aab7b8" strokeWidth="1.5" />
      <rect x="220" y="152" width="36" height="28" rx="2" stroke="#aab7b8" strokeWidth="1.5" />
    </svg>
  )
}

function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    if (
      typeof error.body === 'object' &&
      error.body !== null &&
      'message' in error.body &&
      typeof (error.body as { message: unknown }).message === 'string'
    ) {
      return (error.body as { message: string }).message
    }
    return `${fallback} (${error.status})`
  }
  return 'Revisa tu conexión e intenta de nuevo.'
}

function showToastAndGoToPanel(
  message: string,
  setToastMessage: (msg: string) => void,
  setToastVisible: (visible: boolean) => void,
  navigate: ReturnType<typeof useNavigate>,
) {
  setToastMessage(message)
  requestAnimationFrame(() => setToastVisible(true))

  window.setTimeout(() => {
    navigate('/estudiante/panel')
  }, 1800)
}

export function StudentAuth({ mode }: StudentAuthProps) {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const showToast = (message: string) => {
    setToastMessage(message)
    requestAnimationFrame(() => setToastVisible(true))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    const correo = String(form.get('email') ?? '').trim()
    const nombre = String(form.get('name') ?? '').trim()
    const carrera = String(form.get('career') ?? '').trim()

    setIsSubmitting(true)
    setToastVisible(false)

    try {
      const estudianteResponse = await postEstudiante({ nombre, carrera, correo })
      const estudianteId = parseEstudianteId(estudianteResponse)
      saveStudentSession({ email: correo, name: nombre, career: carrera, estudianteId })
      const successMessage = isSignup ? 'Usuario registrado' : 'Has iniciado sesión correctamente'
      showToastAndGoToPanel(successMessage, setToastMessage, setToastVisible, navigate)
    } catch (error) {
      const fallback = isSignup ? 'No se pudo registrar' : 'No se pudo iniciar sesión'
      showToast(getApiErrorMessage(error, fallback))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="student-auth">
      <Toast message={toastMessage} visible={toastVisible} />

      <div className="student-auth__decor student-auth__decor--left" aria-hidden />
      <div className="student-auth__decor student-auth__decor--right" aria-hidden />

      <Link to="/" className="student-auth__logo" aria-label="Volver al inicio">
        <span className="student-auth__logo-text">bcp</span>
        <svg className="student-auth__logo-smile" viewBox="0 0 48 6" aria-hidden>
          <path
            d="M2 4 Q24 0 46 4"
            fill="none"
            stroke="#ff9900"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </Link>

      <main className="student-auth__main">
        <div className="student-auth__layout">
          <section className="student-auth__promo" aria-labelledby="student-auth-promo-title">
            <h1 id="student-auth-promo-title" className="student-auth__promo-title">
              {isSignup
                ? 'Empieza a certificarte con retos reales del sector financiero'
                : 'Continúa tu ruta de certificación'}
            </h1>
            <p className="student-auth__promo-text">
              {isSignup
                ? 'Completa tus datos y entra a explorar retos diseñados por BCP e Interbank.'
                : 'Ingresa tu nombre, carrera y correo para continuar.'}
            </p>
            <PromoIllustration />
          </section>

          <section className="student-auth__panel" aria-labelledby="student-auth-panel-title">
            <h2 id="student-auth-panel-title" className="student-auth__panel-title">
              {isSignup ? 'Crea tu cuenta de estudiante' : 'Iniciar sesión'}
            </h2>

            <form className="student-auth__form" onSubmit={handleSubmit}>
              <div className="student-auth__field">
                <label className="student-auth__label" htmlFor="student-name">
                  Nombre
                </label>
                <input
                  id="student-name"
                  className="student-auth__input"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="student-auth__field">
                <label className="student-auth__label" htmlFor="student-career">
                  Carrera
                </label>
                <select
                  id="student-career"
                  className="student-auth__input student-auth__select"
                  name="career"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Selecciona tu carrera
                  </option>
                  {CAREERS.map((career) => (
                    <option key={career} value={career}>
                      {career}
                    </option>
                  ))}
                </select>
              </div>

              <div className="student-auth__field">
                <label className="student-auth__label" htmlFor="student-email">
                  Correo
                </label>
                <input
                  id="student-email"
                  className="student-auth__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="tu@universidad.edu.pe"
                  required
                />
              </div>

              <button type="submit" className="student-auth__submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isSignup
                    ? 'Registrando…'
                    : 'Iniciando sesión…'
                  : isSignup
                    ? 'Crear cuenta'
                    : 'Iniciar sesión'}
              </button>
            </form>

            <div className="student-auth__divider" role="separator">
              <span>o</span>
            </div>

            {isSignup ? (
              <Link className="student-auth__secondary" to="/estudiante/iniciar-sesion">
                Ya tengo cuenta
              </Link>
            ) : (
              <Link className="student-auth__secondary" to="/estudiante/registro">
                Crear cuenta de estudiante
              </Link>
            )}

            <p className="student-auth__legal">
              Este sitio usa cookies esenciales. Consulta nuestro aviso de cookies para más
              información.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
