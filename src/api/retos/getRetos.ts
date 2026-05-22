import { ApiError, buildRetosUrl } from '../client'
import { RETOS_LIST } from './routes'
import type { RetosListResponse } from './types'

export async function getRetos(): Promise<RetosListResponse> {
  const url = buildRetosUrl(RETOS_LIST)
  console.log('[API retos] GET', url)

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    let errorBody: unknown
    try {
      errorBody = await response.json()
    } catch {
      errorBody = undefined
    }
    console.log('[API retos] error', { status: response.status, body: errorBody })
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  const data = (await response.json()) as RetosListResponse
  console.log('[API retos] OK', data)
  return data
}
