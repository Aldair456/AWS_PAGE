import { isUuid } from '../utils/uuid'
import { getRetos } from './getRetos'

const LOCAL_ROUTE_BY_TITLE: Record<string, string> = {
  'Crear e implementar agentes de IA': 'ind-1',
  'Rediseño de flujo operativo en back-office': 'ind-2',
}

/** UUID del API a partir de la ruta local (ind-1) o del título del reto mock. */
export async function resolveRetoApiId(
  routeOrApiId: string,
  challengeTitle: string,
): Promise<string | null> {
  if (isUuid(routeOrApiId)) {
    return routeOrApiId
  }

  const titleFromLocal = Object.keys(LOCAL_ROUTE_BY_TITLE).find(
    (title) => LOCAL_ROUTE_BY_TITLE[title] === routeOrApiId,
  )

  const { retos } = await getRetos()
  const match = retos.find(
    (reto) => reto.titulo === (titleFromLocal ?? challengeTitle) || reto.titulo === challengeTitle,
  )

  return match?.id ?? null
}
