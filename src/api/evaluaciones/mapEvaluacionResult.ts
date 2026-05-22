import type {
  EvaluacionCriterio,
  EvaluacionDisplayResult,
  PostEvaluacionResponse,
  ResultadoApiRecord,
} from './types'

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function mapDesglose(raw: unknown): EvaluacionCriterio[] {
  if (!Array.isArray(raw)) return []

  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const criterio = typeof row.criterio === 'string' ? row.criterio : 'Criterio'
      return {
        criterio,
        puntaje: typeof row.puntaje === 'number' ? row.puntaje : 0,
        maximo: typeof row.maximo === 'number' ? row.maximo : 0,
        comentario: typeof row.comentario === 'string' ? row.comentario : '',
      }
    })
    .filter((item): item is EvaluacionCriterio => item !== null)
}

function mapFromContenido(contenido: Record<string, unknown>, record: ResultadoApiRecord): EvaluacionDisplayResult {
  const analisis =
    contenido.analisis && typeof contenido.analisis === 'object'
      ? (contenido.analisis as Record<string, unknown>)
      : {}

  const feedbackBlock =
    contenido.feedback && typeof contenido.feedback === 'object'
      ? (contenido.feedback as Record<string, unknown>)
      : {}

  const puntuacion = typeof contenido.puntuacion === 'number' ? contenido.puntuacion : 0
  const puntajeMaximo = typeof contenido.puntaje_maximo === 'number' ? contenido.puntaje_maximo : 1000
  const porcentaje =
    typeof contenido.porcentaje === 'number'
      ? contenido.porcentaje
      : puntajeMaximo > 0
        ? Math.round((puntuacion / puntajeMaximo) * 100)
        : 0

  return {
    resultadoId: typeof record.id === 'string' ? record.id.trim() : undefined,
    puntuacion,
    puntajeMaximo,
    porcentaje,
    minimoCertificacion:
      typeof contenido.minimo_certificacion === 'number' ? contenido.minimo_certificacion : 700,
    isCertificado: Boolean(contenido.isCertificado),
    estado: typeof contenido.estado === 'string' ? contenido.estado : 'Sin estado',
    status: typeof record.status === 'string' ? record.status : 'pendiente',
    feedbackGeneral:
      typeof feedbackBlock.mensaje_general === 'string'
        ? feedbackBlock.mensaje_general
        : typeof record.feedback === 'string'
          ? record.feedback
          : '',
    siguientePaso:
      typeof feedbackBlock.siguiente_paso === 'string' ? feedbackBlock.siguiente_paso : '',
    desglose: mapDesglose(contenido.desglose),
    resumenParrafos: asStringArray(analisis.resumen_4_parrafos),
    fortalezas: asStringArray(analisis.fortalezas_detectadas),
    oportunidades: asStringArray(analisis.oportunidades_mejora),
    evaluadoAt: typeof record.evaluado_at === 'string' ? record.evaluado_at : undefined,
  }
}

export function mapEvaluacionResultFromRecord(record?: ResultadoApiRecord | null): EvaluacionDisplayResult | null {
  if (!record?.contenido || typeof record.contenido !== 'object') return null
  return mapFromContenido(record.contenido as Record<string, unknown>, record)
}

export function mapEvaluacionResultFromPostResponse(data: PostEvaluacionResponse): EvaluacionDisplayResult | null {
  if (data.resultado) {
    return mapEvaluacionResultFromRecord(data.resultado)
  }

  if (data.evaluacion && typeof data.evaluacion === 'object') {
    const ev = data.evaluacion
    const synthetic: ResultadoApiRecord = {
      contenido: ev,
      status: typeof ev.isCertificado === 'boolean' && ev.isCertificado ? 'aprobado' : 'reprobado',
      feedback:
        typeof ev.feedback === 'object' && ev.feedback !== null
          ? String((ev.feedback as Record<string, unknown>).mensaje_general ?? '')
          : undefined,
    }
    return mapEvaluacionResultFromRecord(synthetic)
  }

  return null
}
