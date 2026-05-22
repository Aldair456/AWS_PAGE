export type EvaluacionCriterio = {
  criterio: string
  puntaje: number
  maximo: number
  comentario: string
}

export type EvaluacionDisplayResult = {
  resultadoId?: string
  puntuacion: number
  puntajeMaximo: number
  porcentaje: number
  minimoCertificacion: number
  isCertificado: boolean
  estado: string
  status: string
  feedbackGeneral: string
  siguientePaso: string
  desglose: EvaluacionCriterio[]
  resumenParrafos: string[]
  fortalezas: string[]
  oportunidades: string[]
  evaluadoAt?: string
}

export type PostEvaluacionBody = {
  inscripcion_id: string
}

export type ResultadoApiRecord = {
  id?: string
  inscripcion_id?: string
  contenido?: Record<string, unknown>
  status?: string
  feedback?: string
  evaluado_at?: string
}

export type GetResultadoResponse = {
  resultado?: ResultadoApiRecord
}

export type PostEvaluacionResponse = {
  inscripcion_id?: string
  resultado?: ResultadoApiRecord
  evaluacion?: Record<string, unknown>
}
