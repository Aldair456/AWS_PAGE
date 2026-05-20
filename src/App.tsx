import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { FloatingAssistant } from './components/FloatingAssistant/FloatingAssistant'
import { ProtectedStudentRoute } from './components/ProtectedStudentRoute/ProtectedStudentRoute'
import { Home } from './pages/Home/Home'
import { StudentAuth } from './pages/StudentAuth/StudentAuth'
import { CareerProfilePage } from './pages/CareerProfile/CareerProfilePage'
import { ChallengeDetailPage } from './pages/ChallengeDetail/ChallengeDetailPage'
import { ChallengeWorkspacePage } from './pages/ChallengeWorkspace/ChallengeWorkspacePage'
import { ChallengeFeedbackPage } from './pages/ChallengeFeedback/ChallengeFeedbackPage'
import { ChallengeResultsPage } from './pages/ChallengeResults/ChallengeResultsPage'
import { ChallengeCertificatePage } from './pages/ChallengeCertificate/ChallengeCertificatePage'
import { StudentDashboard } from './pages/StudentDashboard/StudentDashboard'

function App() {
  return (
    <BrowserRouter>
      <FloatingAssistant />
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
        <Route
          path="/estudiante/carrera/:careerId/reto/:challengeId/aprender"
          element={
            <ProtectedStudentRoute>
              <ChallengeWorkspacePage />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/estudiante/carrera/:careerId/reto/:challengeId/retroalimentacion"
          element={
            <ProtectedStudentRoute>
              <ChallengeFeedbackPage />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/estudiante/carrera/:careerId/reto/:challengeId/resultados"
          element={
            <ProtectedStudentRoute>
              <ChallengeResultsPage />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/estudiante/carrera/:careerId/reto/:challengeId/certificacion"
          element={
            <ProtectedStudentRoute>
              <ChallengeCertificatePage />
            </ProtectedStudentRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
