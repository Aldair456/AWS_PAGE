import type { EvaluacionDisplayResult } from '../../api/evaluaciones'

export const CUY_DEFAULT_LOADING =
  '¡Hola! Soy el Cuy Mágico BCP. Estoy revisando tu entrega con la IA del banco… esto puede tardar unos minutos.'

export const CUY_DEFAULT_REEVALUATING =
  'Recibí tu nueva entrega. La estoy analizando otra vez; en un momento te cuento qué tal quedó.'

export const CUY_DEFAULT_ERROR =
  'Ups, no pude terminar la revisión. Intenta de nuevo en un ratito o recarga la página.'

export const CUY_DEFAULT_READY =
  'Listo, ya revisé tu entrega. Aquí tienes mi retroalimentación como asistente BCP.'

export function getCuyLoadingMessage(isReevaluating: boolean, challengeTitle?: string): string {
  const reto = challengeTitle?.trim()

  if (isReevaluating) {
    return reto
      ? `Recibí tu nueva entrega de «${reto}». La estoy analizando otra vez; en un momento te cuento qué tal quedó.`
      : CUY_DEFAULT_REEVALUATING
  }

  return reto
    ? `¡Hola! Estoy revisando tu entrega de «${reto}» con la IA del banco. Esto puede tardar unos minutos, pero aquí te aviso cuando tenga el resultado.`
    : CUY_DEFAULT_LOADING
}

export function getCuyResultMessage(result: EvaluacionDisplayResult): string {
  if (result.feedbackGeneral?.trim()) return result.feedbackGeneral.trim()

  const firstParagraph = result.resumenParrafos.find((p) => p.trim())
  if (firstParagraph) return firstParagraph.trim()

  if (result.estado?.trim()) {
    return `${result.estado} Obtuviste ${result.puntuacion} de ${result.puntajeMaximo} puntos.`
  }

  return CUY_DEFAULT_READY
}

export function getCuyErrorMessage(errorMessage?: string | null): string {
  if (errorMessage?.trim()) return errorMessage.trim()
  return CUY_DEFAULT_ERROR
}
