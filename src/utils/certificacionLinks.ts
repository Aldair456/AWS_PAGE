/** URL pública del certificado (misma que va en el correo). */
export function buildPublicCertificacionUrl(certificacionId: string): string {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  const id = certificacionId.trim()
  return `${origin.replace(/\/$/, '')}/certificaciones/${id}`
}
