import { ApiError } from '../api/client'

const STORAGE_PREFIX = 'bcp_suscripcion'

function storageKey(estudianteId: string, retoId: string) {
  return `${STORAGE_PREFIX}:${estudianteId}:${retoId}`
}

export function isSubscribedLocally(estudianteId: string, retoId: string): boolean {
  try {
    return localStorage.getItem(storageKey(estudianteId, retoId)) === '1'
  } catch {
    return false
  }
}

export function markSubscribedLocally(estudianteId: string, retoId: string) {
  try {
    localStorage.setItem(storageKey(estudianteId, retoId), '1')
  } catch {
    /* quota / modo privado */
  }
}

export function getApiErrorText(error: unknown): string {
  if (!(error instanceof ApiError)) return ''

  const parts: string[] = [error.message]

  if (typeof error.body === 'string') {
    parts.push(error.body)
  } else if (error.body && typeof error.body === 'object') {
    const record = error.body as Record<string, unknown>
    for (const key of ['message', 'error', 'detail', 'msg', 'descripcion']) {
      const value = record[key]
      if (typeof value === 'string') parts.push(value)
    }
    parts.push(JSON.stringify(error.body))
  }

  return parts.join(' ').toLowerCase()
}

export function isAlreadySubscribedError(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false

  if (error.status === 409) return true

  const text = getApiErrorText(error)
  return /ya\s*(est[aá]|esta)|inscrit|suscrit|exist|duplicad|already|conflict/.test(text)
}

export const SUBSCRIBE_NOTICE = {
  newSubscription: 'Suscripción registrada. ¡A continuar con el reto!',
  alreadySubscribed: 'Ya estás suscrito a este reto. Puedes continuar.',
} as const
