export type PresignedFileRequest = {
  filename: string
  content_type: string
}

export type CreatePresignedUrlsBody = {
  inscripcion_id: string
  files: PresignedFileRequest[]
}

export type PresignedUploadEntry = {
  filename: string
  content_type: string
  object_key: string
  upload_url: string
  s3_uri: string
}

export type CreatePresignedUrlsResponse = {
  upload_urls: PresignedUploadEntry[]
}
