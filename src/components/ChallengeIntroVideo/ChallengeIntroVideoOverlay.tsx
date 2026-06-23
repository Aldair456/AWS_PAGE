import { useEffect, useRef, useState } from 'react'
import introVideo1 from '../../assets/introduccion.mp4'
import introVideo2 from '../../assets/introuduccion2.mp4'
import { WorkspaceNpcGuideOverlay } from '../WorkspaceNpcGuide/WorkspaceNpcGuideOverlay'
import { getIntroSceneDialogues } from '../WorkspaceNpcGuide/npcDialogues'
import './ChallengeIntroVideoOverlay.css'

const INTRO_VIDEOS = [introVideo1, introVideo2] as const

type ChallengeIntroVideoOverlayProps = {
  onComplete: () => void
  /** Tras los 2 videos, muestra escena del mentor NPC */
  withNpcScene?: boolean
  npcSceneTitle?: string
}

type IntroPhase = 'video' | 'scene'

export function ChallengeIntroVideoOverlay({
  onComplete,
  withNpcScene = false,
  npcSceneTitle = 'Crear e implementar agentes de IA',
}: ChallengeIntroVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<IntroPhase>('video')
  const [videoIndex, setVideoIndex] = useState(0)
  const [videoFading, setVideoFading] = useState(false)
  const isLastVideo = videoIndex >= INTRO_VIDEOS.length - 1

  useEffect(() => {
    if (phase !== 'video') return

    const video = videoRef.current
    if (!video) return

    video.load()

    const tryPlay = () => {
      void video.play().catch(() => {
        video.muted = true
        void video.play()
      })
    }

    tryPlay()
    return () => {
      video.pause()
    }
  }, [videoIndex, phase])

  const goToNpcScene = () => {
    setVideoFading(true)
    window.setTimeout(() => setPhase('scene'), 650)
  }

  const handleVideoEnded = () => {
    if (!isLastVideo) {
      setVideoIndex((current) => current + 1)
      return
    }

    if (withNpcScene) {
      goToNpcScene()
      return
    }

    onComplete()
  }

  const skipVideos = () => {
    onComplete()
  }

  if (phase === 'scene') {
    return (
      <WorkspaceNpcGuideOverlay
        dialogues={getIntroSceneDialogues()}
        lessonTitle={npcSceneTitle}
        onClose={onComplete}
        variant="scene"
        skipLabel="Saltar escena"
        finalLabel="Comenzar el reto"
      />
    )
  }

  return (
    <div
      className={`challenge-intro-overlay ${videoFading ? 'challenge-intro-overlay--fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Introducción al reto"
    >
      <video
        key={videoIndex}
        ref={videoRef}
        className="challenge-intro-overlay__video"
        src={INTRO_VIDEOS[videoIndex]}
        playsInline
        autoPlay
        onEnded={handleVideoEnded}
      />

      <p className="challenge-intro-overlay__step" aria-live="polite">
        Intro {videoIndex + 1} de {INTRO_VIDEOS.length}
      </p>

      <button type="button" className="challenge-intro-overlay__skip" onClick={skipVideos}>
        Saltar intro
      </button>
    </div>
  )
}
