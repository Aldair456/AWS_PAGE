import { buildChallengeSections, getAllLessons } from '../data/challengeWorkspace'
import { getChallengeById } from '../data/companyChallenges'

export function getSubmissionLessonId(routeChallengeId: string): string | undefined {
  const challenge = getChallengeById(routeChallengeId)
  if (!challenge) return undefined

  const sections = buildChallengeSections(challenge)
  return getAllLessons(sections).find((lesson) => lesson.workspaceSubmission)?.id
}

export function buildWorkspaceSubmissionPath(
  careerId: string,
  routeChallengeId: string,
  inscripcionId: string,
) {
  const lessonId = getSubmissionLessonId(routeChallengeId)
  const search = lessonId ? `?leccion=${lessonId}` : ''

  return {
    pathname: `/estudiante/carrera/${careerId}/reto/${routeChallengeId}/aprender`,
    search,
    state: { inscripcionId },
  }
}
