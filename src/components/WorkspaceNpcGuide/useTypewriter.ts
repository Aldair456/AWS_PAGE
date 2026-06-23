import { useEffect, useState } from 'react'

export function useTypewriter(text: string, enabled: boolean, msPerChar = 26) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayed('')
      setDone(false)
      return
    }

    setDisplayed('')
    setDone(false)
    let index = 0

    const tick = () => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        setDone(true)
        return
      }
      timer = window.setTimeout(tick, msPerChar)
    }

    let timer = window.setTimeout(tick, msPerChar)
    return () => window.clearTimeout(timer)
  }, [text, enabled, msPerChar])

  return { displayed, done }
}
