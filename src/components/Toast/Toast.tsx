import './Toast.css'

type ToastProps = {
  message: string
  visible: boolean
}

export function Toast({ message, visible }: ToastProps) {
  if (!message) return null

  return (
    <div
      className={`toast ${visible ? 'toast--visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast__icon" aria-hidden>
        ✓
      </span>
      {message}
    </div>
  )
}
