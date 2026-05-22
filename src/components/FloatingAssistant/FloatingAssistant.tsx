import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './FloatingAssistant.css'

type Role = 'bot' | 'user'

export type FloatingChatMessage = {
  id: string
  role: Role
  text: string
}

/** Nombre del asistente flotante para dudas del reto */
export const ASSISTANT_NAME = 'Nexo'

const WELCOME =
  `¡Hola! Soy ${ASSISTANT_NAME}, tu asistente para dudas del reto.\n\n` +
  'Escríbeme si no tienes claro cómo va el hackathon: vídeos en Aprender, qué entregar, Agent Builder, ' +
  'la guía con recursos, certificación o plazos. Te resumo en lenguaje simple dónde mirar en la plataforma.\n\n' +
  'Si necesitas diagramar, usa el botón draw.io arriba.\n\n' +
  '¿Qué necesitas saber?'

function answerChallengeQuestion(question: string): string {
  const q = question.toLowerCase().trim()

  if ((q.includes('quién') || q.includes('quien')) && (q.includes('eres') || q.includes('e eres')))
    return `Soy ${ASSISTANT_NAME}: te ayudo a aclarar dudas del reto en esta demo de la plataforma. Para reglas oficiales o evaluación final, tu referencia sigue siendo el equipo y el mentor BCP.`

  if (q.includes('certif') || q.includes('credencial') || q.includes('diploma'))
    return 'La certificación depende de completar el reto según las bases del aliado. En el detalle del reto verás si incluye certificación. Después de terminar los pasos puedes revisar resultados y la vista de certificación en las rutas del mismo reto.'

  if (
    q.includes('aprender') ||
    q.includes('vídeo') ||
    q.includes('video') ||
    q.includes('paso') ||
    q.includes('módulo') ||
    q.includes('lección') ||
    q.includes('leccion')
  )
    return 'Los contenidos por pasos están en «Suscribirse» → ruta Aprender. Ahí ves lecciones, vídeos embebidos (cuando aplica) y la entrega intermedia con subida de archivos. Avanza marcando cada paso como completado.'

  if (q.includes('guía') || q.includes('recurso') || q.includes('nube') || q.includes('aws'))
    return 'En la ficha del reto, pestaña Guía: enlaces a catálogos cloud, herramientas tipo draw.io y la pestaña de arquitecturas. Úsalos para documentar o inspirar tu solución; el reto en sí se ejecuta en Aprender.'

  if (q.includes('entrega') || q.includes('subir') || q.includes('archivo') || q.includes('word') || q.includes('draw'))
    return 'El paso **Entrega intermedia** en Aprender te deja adjuntar archivos (Word, .drawio, PDF, etc.). En este prototipo se guardan en tu navegador con IndexedDB; en producción conectarías un backend para que el mentor los reciba de verdad.'

  if (
    q.includes('agent') ||
    (q.includes('builder') && q.includes('agent')) ||
    q.includes('panel') ||
    q.includes('memoria') ||
    q.includes('herramienta') ||
    q.includes('modelo')
  )
    return 'Este reto pide crear e implementar un agente con Agent Builder (modelo, herramientas, memoria, mensaje del sistema e integración). Revisa los vídeos del módulo y documenta en la entrega cómo quedó tu patrón de integración.'

  if (q.includes('plazo') || q.includes('tiempo') || q.includes('semana') || q.includes('duración') || q.includes('cuándo'))
    return 'En la ficha del reto aparece la **duración** orientativa (por ejemplo 2 semanas) y la fecha de última actualización. Los plazos formales de entrega los confirma el mentor o las bases del hackathon.'

  if (q.includes('resultado') || q.includes('puntaje') || q.includes('calificación') || q.includes('nota'))
    return 'Al terminar los pasos puedes ir a **Ver resultados** (simulado en este prototipo): allí suele verse puntuación y si aplicas para certificación. Es una demo visual, no sustituye el sistema real del banco.'

  if (q.includes('inscrib') || q.includes('empezar') || q.includes('comenzar') || q.includes('iniciar reto'))
    return 'Desde la ficha del reto pulsa **Suscribirse** para entrar a **Aprender** y seguir los pasos. Si no ves el botón, asegúrate de estar en la carrera y el reto correctos.'

  if (q.includes('retro') || q.includes('foro') || q.includes('compañero'))
    return 'Hay una sección de **retroalimentación** por reto para ver ideas de otros participantes (contenido demo en este frontend). Sirve como inspiración; tu evaluación oficial no sale de ahí.'

  if (q.includes('draw') || q.includes('diagram'))
    return 'Usa el enlace **Abrir diagrama · draw.io** aquí arriba. Exporta imagen o PDF si el equipo te pide adjuntar el diagrama en la entrega.'

  if (
    q.includes('hola') ||
    q.includes('buenas') ||
    q.includes('hey') ||
    q.includes('ola') ||
    q.includes('que tal') ||
    q.includes('qué tal')
  )
    return `¡Hola! Cuéntame qué parte del reto no te cuadra (Aprender, entrega, Agent Builder, certificación…) y te guío.`

  if (q.includes('grac') || q.includes('chau') || q.includes('adios') || q.includes('adiós'))
    return '¡De nada! Cuando quieras seguimos con más dudas. Suerte con el reto 🌿'

  if (q.includes('mentor') || q.includes('profesor') || q.includes('ayuda humana'))
    return 'Para bloqueos de negocio, permisos o criterios de evaluación, el **mentor BCP / empresa aliada** es la voz oficial. Yo solo organizo la info de la plataforma en esta demo.'

  if (q.includes('duda') || q.includes('no entiendo') || q.includes('cómo') || q.includes('como') || q.includes('qué hago') || q.includes('que hago'))
    return 'Resumiendo: (1) Lee el reto en **Detalles** y **Guía**. (2) Entra a **Aprender** y sigue los pasos. (3) Sube entregas donde el reto lo pida. Si algo concreto falla (un botón, un texto), descríbelo y te digo por dónde mirarlo en la app.'

  const trimmed = question.slice(0, 140)
  return (
    `Sobre «${trimmed}${question.length > 140 ? '…' : ''}»: en esta demo te oriento con lo que la plataforma muestra (detalle, guía, aprender). ` +
    'Si tu duda es de reglamento o de decisión del jurado, confirma con el mentor BCP. ¿Puedes preguntar otra vez con una palabra clave (por ejemplo: vídeos, entrega, certificación, Agent Builder)?'
  )
}


export function FloatingAssistant() {
  const location = useLocation()

  const showWidget = location.pathname !== '/'

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<FloatingChatMessage[]>(() => [
    { id: 'w', role: 'bot', text: WELCOME },
  ])
  const [draft, setDraft] = useState('')

  const sendMsg = () => {
    const t = draft.trim()
    if (!t) return
    setDraft('')
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text: t }])
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: `b-${Date.now()}`, role: 'bot', text: answerChallengeQuestion(t) }])
    }, 380)
  }

  useEffect(() => {
    if (!open) return
    const onEsc = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [open])

  if (!showWidget) return null

  return (
    <div className="floating-assistant">
      {open && (
        <aside
          className="floating-assistant__panel"
          aria-label={`${ASSISTANT_NAME}, asistente para dudas del reto`}
          role="complementary"
        >
          <header className="floating-assistant__hdr">
            <div className="floating-assistant__hdr-text">
              <p className="floating-assistant__title">{ASSISTANT_NAME}</p>
              <p className="floating-assistant__subtitle">Dudas del reto · orientación rápida</p>
            </div>
            <button
              type="button"
              className="floating-assistant__btn-icon"
              aria-label={`Cerrar chat con ${ASSISTANT_NAME}`}
              onClick={() => setOpen(false)}
            >
              −
            </button>
          </header>

          <div className="floating-assistant__tools">
            <a
              className="floating-assistant__tool-link"
              href="https://app.diagrams.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir diagrama · draw.io
            </a>
          </div>

          <div className="floating-assistant__messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`floating-assistant__msg floating-assistant__msg--${msg.role}`}
              >
                {msg.text.split('\n').map((line, i, arr) => (
                  <span key={`${msg.id}-line-${i}`}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="floating-assistant__composer">
            <textarea
              className="floating-assistant__input"
              rows={1}
              value={draft}
              onChange={(ev) => setDraft(ev.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' && !ev.shiftKey) {
                  ev.preventDefault()
                  sendMsg()
                }
              }}
              placeholder="¿Duda del reto? (vídeos, entrega, Agent Builder, certificación…)"
              aria-label={`Escribe tu duda del reto para ${ASSISTANT_NAME}`}
            />
            <button type="button" className="floating-assistant__send" onClick={sendMsg} aria-label="Enviar">
              ➤
            </button>
          </div>
          <p className="floating-assistant__hint">
            {ASSISTANT_NAME} te orienta según el flujo de esta demo (sin conexión a un servidor ni IA real). Las
            decisiones oficiales del reto las confirma el mentor BCP.
          </p>
        </aside>
      )}

      <button
        type="button"
        className={`floating-assistant__fab ${open ? '' : 'floating-assistant__fab--pulse'}`}
        aria-label={
          open ? `Cerrar ${ASSISTANT_NAME}, asistente del reto` : `Abrir ${ASSISTANT_NAME}, asistente del reto`
        }
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="floating-assistant__fab-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h4l4 4 4-4h6a2 2 0 002-2V4a2 2 0 00-2-2zm-2 12H7v-2h11v2zm0-5H7V7h11v2z"
              fill="#fff"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}
