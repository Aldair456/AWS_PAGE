import { useCallback, useEffect, useRef, useState } from 'react'
import npcImage from '../../assets/NPC.png'
import { getNpcDialogues } from './npcDialogues'
import { useTypewriter } from './useTypewriter'
import './WorkspaceNpcGuideOverlay.css'

type WorkspaceNpcGuideOverlayProps = {
  onClose: () => void
  /** Si no se pasa, se resuelve con lessonId */
  dialogues?: string[]
  lessonId?: string
  lessonTitle?: string
  variant?: 'default' | 'scene'
  skipLabel?: string
  finalLabel?: string
}

export function WorkspaceNpcGuideOverlay({
  onClose,
  dialogues: dialoguesProp,
  lessonId,
  lessonTitle,
  variant = 'default',
  skipLabel = 'Saltar explicación',
  finalLabel = 'Entendido, continuar',
}: WorkspaceNpcGuideOverlayProps) {
  const dialogues = dialoguesProp ?? (lessonId ? getNpcDialogues(lessonId) : [])
  const isScene = variant === 'scene'

  const [lineIndex, setLineIndex] = useState(0)
  const [entered, setEntered] = useState(false)
  const autoAdvanceRef = useRef<number | null>(null)

  const currentLine = dialogues[lineIndex] ?? ''
  const isLastLine = lineIndex >= dialogues.length - 1
  const { displayed, done } = useTypewriter(currentLine, entered)

  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), isScene ? 480 : 120)
    return () => window.clearTimeout(t)
  }, [isScene])

  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) window.clearTimeout(autoAdvanceRef.current)
    }
  }, [])

  const goNext = useCallback(() => {
    if (autoAdvanceRef.current) {
      window.clearTimeout(autoAdvanceRef.current)
      autoAdvanceRef.current = null
    }

    if (isLastLine) {
      onClose()
      return
    }

    setEntered(false)
    window.setTimeout(() => {
      setLineIndex((i) => i + 1)
      setEntered(true)
    }, isScene ? 420 : 280)
  }, [isLastLine, onClose, isScene])

  useEffect(() => {
    if (!done || isLastLine) return

    autoAdvanceRef.current = window.setTimeout(() => {
      goNext()
    }, isScene ? 2800 : 2200)

    return () => {
      if (autoAdvanceRef.current) window.clearTimeout(autoAdvanceRef.current)
    }
  }, [done, isLastLine, goNext, isScene])

  return (
    <div
      className={`npc-guide ${entered ? 'npc-guide--visible' : ''} ${isScene ? 'npc-guide--scene' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="npc-guide-title"
      aria-describedby="npc-guide-message"
    >
      <div className="npc-guide__backdrop" aria-hidden />
      {isScene ? <div className="npc-guide__vignette" aria-hidden /> : null}

      <button type="button" className="npc-guide__skip" onClick={onClose}>
        {skipLabel}
      </button>

      <div className="npc-guide__stage">
        <div className="npc-guide__bubble-wrap">
          <div className="npc-guide__bubble">
            <span id="npc-guide-title" className="npc-guide__label">
              Mentor BCP
            </span>
            {lessonTitle ? (
              <p className="npc-guide__context">{lessonTitle}</p>
            ) : null}
            <p id="npc-guide-message" className="npc-guide__message">
              {displayed}
              {!done ? <span className="npc-guide__cursor" aria-hidden /> : null}
            </p>
            <div className="npc-guide__meta">
              <span className="npc-guide__counter">
                {lineIndex + 1} / {dialogues.length}
              </span>
              <button type="button" className="npc-guide__next" onClick={goNext} disabled={!done}>
                {isLastLine ? finalLabel : 'Siguiente'}
              </button>
            </div>
          </div>
        </div>

        <img src={npcImage} alt="" className="npc-guide__character" aria-hidden />
      </div>
    </div>
  )
}
