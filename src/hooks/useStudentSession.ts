import { useEffect, useState } from 'react'
import { getStudentSession, type StudentSession } from '../utils/studentSession'

export function useStudentSession() {
  const [session, setSession] = useState<StudentSession | null>(() => getStudentSession())

  useEffect(() => {
    const sync = () => setSession(getStudentSession())

    window.addEventListener('storage', sync)
    window.addEventListener('bcp-session-change', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('bcp-session-change', sync)
    }
  }, [])

  return session
}
