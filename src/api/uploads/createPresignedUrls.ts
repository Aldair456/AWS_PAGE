import { ApiError, buildUploadsUrl } from '../client'
import { UPLOADS_PRESIGNED } from './routes'
import type { CreatePresignedUrlsBody, CreatePresignedUrlsResponse } from './types'

export async function createPresignedUrls(
  body: CreatePresignedUrlsBody,
): Promise<CreatePresignedUrlsResponse> {
  const url = buildUploadsUrl(UPLOADS_PRESIGNED)

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
    throw new ApiError(response.statusText || `HTTP ${response.status}`, response.status, errorBody)
  }

  const data = (await response.json()) as CreatePresignedUrlsResponse
  if (!Array.isArray(data.upload_urls)) {
    throw new ApiError('Respuesta inválida del servidor de uploads', 502, data)
  }

  return data
}
