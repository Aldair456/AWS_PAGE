const STORAGE_PREFIX = 'bcp_inscripcion'

function storageKey(estudianteId: string, retoId: string) {
  return `${STORAGE_PREFIX}:${estudianteId}:${retoId}`
}

export function saveInscripcionId(estudianteId: string, retoId: string, inscripcionId: string) {
  try {
    localStorage.setItem(storageKey(estudianteId, retoId), inscripcionId.trim())
  } catch {
    /* quota / modo privado */
  }
}

export function getInscripcionId(estudianteId: string, retoId: string): string | undefined {
  try {
    const value = localStorage.getItem(storageKey(estudianteId, retoId))
    return value?.trim() || undefined
  } catch {
    return undefined
  }
}
