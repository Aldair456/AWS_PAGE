/** Evita doble POST evaluaciones por Strict Mode o efectos repetidos. */
const startedKeys = new Set<string>()

export function evaluationSessionKey(inscripcionId: string, evalSession: number): string {
  return `${inscripcionId.trim()}:${evalSession}`
}

export function claimEvaluationSession(key: string): boolean {
  if (startedKeys.has(key)) return false
  startedKeys.add(key)
  return true
}

export function releaseEvaluationSession(key: string): void {
  startedKeys.delete(key)
}
