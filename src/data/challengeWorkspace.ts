import { outlineItemTitle, type CompanyChallenge } from './companyChallenges'

export type ChallengeLesson = {
  id: string
  sectionId: string
  sectionTitle: string
  title: string
  order: number
  durationMin: number
  /** Si existe, el workspace muestra este video en lugar del texto genérico. */
  workspaceVideoId?: string
  /** Paso de entrega con subida de archivos y sección de video orientativo. */
  workspaceSubmission?: boolean
  submissionExplainerVideoId?: string
}

export type ChallengeSection = {
  id: string
  title: string
  lessons: ChallengeLesson[]
}

export function buildChallengeSections(challenge: CompanyChallenge): ChallengeSection[] {
  return challenge.outline.map((block, sectionIndex) => ({
    id: `section-${sectionIndex}`,
    title: block.title,
    lessons: block.items.map((item, lessonIndex) => {
      const isObj = typeof item !== 'string'
      return {
        id: `lesson-${sectionIndex}-${lessonIndex}`,
        sectionId: `section-${sectionIndex}`,
        sectionTitle: block.title,
        title: outlineItemTitle(item),
        order: sectionIndex * 10 + lessonIndex,
        durationMin: 12 + lessonIndex * 4,
        workspaceVideoId: isObj ? item.workspaceVideoId : undefined,
        workspaceSubmission: isObj && item.workspaceSubmission === true ? true : undefined,
        submissionExplainerVideoId:
          isObj && item.workspaceSubmission === true ? item.submissionExplainerVideoId : undefined,
      }
    }),
  }))
}

export function getAllLessons(sections: ChallengeSection[]): ChallengeLesson[] {
  return sections.flatMap((section) => section.lessons)
}

export function getLessonById(sections: ChallengeSection[], lessonId: string): ChallengeLesson | undefined {
  return getAllLessons(sections).find((lesson) => lesson.id === lessonId)
}
