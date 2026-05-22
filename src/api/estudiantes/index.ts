import { ApiError, buildEstudiantesUrl } from '../client'
import { ESTUDIANTES_POST } from './routes'

export type CreateEstudianteBody = {
  nombre: string
  carrera: string
  correo: string
}

export type CreateEstudianteResponse = Record<string, unknown>

/**
 * POST https://0k9u060818.execute-api.us-east-1.amazonaws.com/dev/estudiantes
 */
export async function postEstudiante(body: CreateEstudianteBody): Promise<CreateEstudianteResponse> {
  const url = buildEstudiantesUrl(ESTUDIANTES_POST)
  console.log('[API estudiantes] POST', url, body)

  const response = await fetch(url, {
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
    console.log('[API estudiantes] error', { status: response.status, body: errorBody })
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  if (response.status === 204) {
    console.log('[API estudiantes] OK', { status: response.status, data: null })
    return {}
  }

  const contentType = response.headers.get('Content-Type') ?? ''
  if (contentType.includes('application/json')) {
    const data = (await response.json()) as CreateEstudianteResponse
    console.log('[API estudiantes] OK', { status: response.status, data })
    return data
  }

  const text = await response.text()
  console.log('[API estudiantes] OK', { status: response.status, data: text })
  return {}
}
