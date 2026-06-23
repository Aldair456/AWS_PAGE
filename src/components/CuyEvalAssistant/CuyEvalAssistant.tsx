import cuyImage from '../../assets/cuy_magico_bcp.png'
import './CuyEvalAssistant.css'

type CuyEvalAssistantProps = {
  message: string
  /** Muestra puntos animados mientras la IA procesa */
  thinking?: boolean
}

export function CuyEvalAssistant({
  message,
  thinking = false,
}: CuyEvalAssistantProps) {
  return (
    <div
      className={`cuy-assistant ${thinking ? 'cuy-assistant--thinking' : ''}`}
      aria-live="polite"
    >
      <div className="cuy-assistant__bubble" role="status">
        <span className="cuy-assistant__bubble-label">
          {thinking ? 'Evaluando tu entrega…' : 'El Cuy te dice'}
        </span>
        <p className="cuy-assistant__message">
          {message}
          {thinking ? (
            <span className="cuy-assistant__dots" aria-hidden>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          ) : null}
        </p>
      </div>

      <div className="cuy-assistant__stage">
        <img
          src={cuyImage}
          alt=""
          className={`cuy-assistant__character ${thinking ? 'cuy-assistant__character--thinking' : ''}`}
          aria-hidden
        />
      </div>
    </div>
  )
}
