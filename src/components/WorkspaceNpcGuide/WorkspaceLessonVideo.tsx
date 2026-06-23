import { useEffect, useId, useRef } from 'react'

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string
          width?: string | number
          height?: string | number
          playerVars?: Record<string, string | number>
          events?: {
            onStateChange?: (event: { data: number }) => void
            onReady?: (event: { target: { playVideo: () => void } }) => void
          }
        },
      ) => { destroy: () => void }
      PlayerState: { ENDED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

let ytApiPromise: Promise<void> | null = null

function loadYouTubeIframeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve()
  if (ytApiPromise) return ytApiPromise

  ytApiPromise = new Promise((resolve) => {
    const finish = () => resolve()

    if (window.YT?.Player) {
      finish()
      return
    }

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      finish()
    }

    if (!document.querySelector('script[data-yt-iframe-api]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.dataset.ytIframeApi = 'true'
      document.head.appendChild(script)
    }
  })

  return ytApiPromise
}

type WorkspaceLessonVideoProps = {
  videoId: string
  title: string
  onEnded?: () => void
  className?: string
}

export function WorkspaceLessonVideo({
  videoId,
  title,
  onEnded,
  className = 'challenge-workspace__video',
}: WorkspaceLessonVideoProps) {
  const hostId = useId().replace(/:/g, '')
  const playerRef = useRef<{ destroy: () => void } | null>(null)
  const onEndedRef = useRef(onEnded)
  onEndedRef.current = onEnded

  useEffect(() => {
    if (!onEnded) return

    let cancelled = false

    void loadYouTubeIframeApi().then(() => {
      if (cancelled || !window.YT?.Player) return

      playerRef.current?.destroy()

      playerRef.current = new window.YT.Player(hostId, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT!.PlayerState.ENDED) {
              onEndedRef.current?.()
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [videoId, onEnded, hostId])

  if (!onEnded) {
    return (
      <div className="challenge-workspace__video-wrap">
        <iframe
          className={className}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="challenge-workspace__video-wrap challenge-workspace__video-wrap--yt-api">
      <div id={hostId} className={className} title={title} />
    </div>
  )
}
