import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedStudentRoute } from './components/ProtectedStudentRoute/ProtectedStudentRoute'
import { Home } from './pages/Home/Home'
import { StudentAuth } from './pages/StudentAuth/StudentAuth'
import { CareerProfilePage } from './pages/CareerProfile/CareerProfilePage'
import { ChallengeDetailPage } from './pages/ChallengeDetail/ChallengeDetailPage'
import { StudentDashboard } from './pages/StudentDashboard/StudentDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudiante/registro" element={<StudentAuth mode="signup" />} />
        <Route path="/estudiante/iniciar-sesion" element={<StudentAuth mode="signin" />} />
        <Route
          path="/estudiante/panel"
          element={
            <ProtectedStudentRoute>
              <StudentDashboard />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/estudiante/carrera/:careerId"
          element={
            <ProtectedStudentRoute>
              <CareerProfilePage />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/estudiante/carrera/:careerId/reto/:challengeId"
          element={
            <ProtectedStudentRoute>
              <ChallengeDetailPage />
            </ProtectedStudentRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
