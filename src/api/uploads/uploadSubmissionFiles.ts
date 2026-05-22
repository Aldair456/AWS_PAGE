import { ApiError } from '../client'
import { createPresignedUrls } from './createPresignedUrls'
import type { PresignedUploadEntry } from './types'

function fileContentType(file: File): string {
  return file.type?.trim() || 'application/octet-stream'
}

async function putFileToPresignedUrl(
  uploadUrl: string,
  file: File,
  contentType: string,
): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: file,
  })

  if (!response.ok) {
    throw new ApiError(
      `No se pudo subir ${file.name} a S3 (${response.status})`,
      response.status,
    )
  }
}

function matchFileToEntry(files: File[], entry: PresignedUploadEntry, index: number): File {
  const byName = files.find((f) => f.name === entry.filename)
  if (byName) return byName
  if (files[index]) return files[index]
  throw new ApiError(`No se encontró el archivo local para ${entry.filename}`, 400)
}

export async function uploadSubmissionFiles(
  inscripcionId: string,
  files: File[],
): Promise<PresignedUploadEntry[]> {
  if (!files.length) {
    throw new ApiError('Selecciona al menos un archivo para subir.', 400)
  }

  const { upload_urls } = await createPresignedUrls({
    inscripcion_id: inscripcionId,
    files: files.map((file) => ({
      filename: file.name,
      content_type: fileContentType(file),
    })),
  })

  if (!upload_urls.length) {
    throw new ApiError('El servidor no devolvió URLs de subida.', 502)
  }

  for (let i = 0; i < upload_urls.length; i++) {
    const entry = upload_urls[i]
    const file = matchFileToEntry(files, entry, i)
    await putFileToPresignedUrl(entry.upload_url, file, entry.content_type)
  }

  return upload_urls
}
