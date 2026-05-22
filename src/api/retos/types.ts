export type RetoApiItem = {
  /** UUID de la fila en tabla inscripcion (GET /suscripciones/retos). */
  inscripcion_id?: string
  inscripcionId?: string
  id: string
  titulo: string
  descripcion: string
  /** Estado del reto o de la inscripción, según el endpoint. */
  status?: string
  estado?: string
  created_at: string
}

export type RetosListResponse = {
  retos: RetoApiItem[]
}
