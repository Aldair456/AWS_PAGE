import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import './ScrollReveal.css'

type ScrollRevealVariant = 'up' | 'fade' | 'left' | 'right'

type ScrollRevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  variant?: ScrollRevealVariant
  /** Dispara la animación apenas entra un poco en pantalla */
  threshold?: number
}

function joinClassNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function ScrollReveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  variant = 'up',
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  const style = { '--scroll-reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <Tag
      ref={ref}
      className={joinClassNames(
        'scroll-reveal',
        variant === 'fade' && 'scroll-reveal--fade',
        variant === 'left' && 'scroll-reveal--left',
        variant === 'right' && 'scroll-reveal--right',
        visible && 'scroll-reveal--visible',
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}
