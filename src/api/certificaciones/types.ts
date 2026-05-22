export type PostCertificacionBody = {
  resultado_id: string
}

export type CertificacionCreated = {
  id: string
  resultado_id?: string
  estudiante_id?: string
  reto_id?: string
  emitido_at?: string
}

export type PostCertificacionResponse = CertificacionCreated & {
  certificacion?: Record<string, unknown>
  certificacion_id?: string
  message?: string
}

export type EstudianteCertificacion = {
  nombre: string
  carrera: string
}

export type GetEstudianteCertificacionResponse = {
  estudiante?: EstudianteCertificacion
}
