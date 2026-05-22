export function parseEstudianteId(data: Record<string, unknown>): string | undefined {
  const candidates = [data.id, data.estudiante_id, data.estudianteId]

  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return undefined
}
