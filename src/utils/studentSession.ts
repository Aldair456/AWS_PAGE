export type StudentSession = {
  email: string
  name: string
  career: string
}

const STORAGE_KEY = 'bcp_student_session'

function notifySessionChange() {
  window.dispatchEvent(new Event('bcp-session-change'))
}

export function saveStudentSession(session: StudentSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  notifySessionChange()
}

export function getStudentSession(): StudentSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StudentSession
  } catch {
    return null
  }
}

export function clearStudentSession() {
  localStorage.removeItem(STORAGE_KEY)
  notifySessionChange()
}
