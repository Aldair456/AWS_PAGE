import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getStudentSession } from '../../utils/studentSession'

type ProtectedStudentRouteProps = {
  children: ReactNode
}

export function ProtectedStudentRoute({ children }: ProtectedStudentRouteProps) {
  const session = getStudentSession()

  if (!session) {
    return <Navigate to="/estudiante/iniciar-sesion" replace />
  }

  return children
}
