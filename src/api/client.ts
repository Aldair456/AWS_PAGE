import {
  ESTUDIANTES_API_BASE_URL,
  RETOS_API_BASE_URL,
  SUSCRIPCIONES_API_BASE_URL,
  CERTIFICACIONES_API_BASE_URL,
  EMAILS_API_BASE_URL,
  EVALUACIONES_API_BASE_URL,
  UPLOADS_API_BASE_URL,
} from '../config/env'

export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(message: string, status: number, body?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

function buildUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

export function buildEstudiantesUrl(path: string): string {
  return buildUrl(ESTUDIANTES_API_BASE_URL, path)
}

export function buildRetosUrl(path: string): string {
  return buildUrl(RETOS_API_BASE_URL, path)
}

export function buildSuscripcionesUrl(path: string): string {
  return buildUrl(SUSCRIPCIONES_API_BASE_URL, path)
}

export function buildUploadsUrl(path: string): string {
  return buildUrl(UPLOADS_API_BASE_URL, path)
}

export function buildEvaluacionesUrl(path: string): string {
  return buildUrl(EVALUACIONES_API_BASE_URL, path)
}

export function buildCertificacionesUrl(path: string): string {
  return buildUrl(CERTIFICACIONES_API_BASE_URL, path)
}

export function buildEmailsUrl(path: string): string {
  return buildUrl(EMAILS_API_BASE_URL, path)
}

export async function apiPost<TResponse, TBody = Record<string, unknown>>(
  path: string,
  body: TBody,
  buildUrlFn: (p: string) => string = buildEstudiantesUrl,
): Promise<TResponse> {
  const response = await fetch(buildUrlFn(path), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let errorBody: unknown
    try {
      errorBody = await response.json()
    } catch {
      errorBody = undefined
    }
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  const contentType = response.headers.get('Content-Type') ?? ''
  if (contentType.includes('application/json')) {
    return (await response.json()) as TResponse
  }

  return (await response.text()) as TResponse
}
