import type { RetoApiItem } from './types'

/** Tarjeta del catálogo: dinámico desde API + metadatos fijos de diseño. */
export type CatalogChallengeCard = {
  id: string
  routeId: string
  title: string
  domain: string
  competencies: string
  company: 'BCP' | 'Interbank'
  rating: number
  reviews: number
  level: string
  duration: string
  language: string
  status: string
}

const CARD_DEFAULTS = {
  company: 'BCP' as const,
  rating: 4.6,
  reviews: 28,
  level: 'Básico',
  duration: '2 semanas',
  language: 'Español (Perú)',
}

/** Si el reto tiene página mock local, usamos ese id en la ruta. */
const LOCAL_ROUTE_BY_TITLE: Record<string, string> = {
  'Crear e implementar agentes de IA': 'ind-1',
  'Rediseño de flujo operativo en back-office': 'ind-2',
}

export function parseRetoDescripcion(descripcion: string): { domain: string; competencies: string } {
  const domainMatch = descripcion.match(/Dominio:\s*(.+?)(?:\r?\n|$)/i)
  const servicesMatch = descripcion.match(/Servicios:\s*(.+?)(?:\r?\n|$)/i)

  if (domainMatch || servicesMatch) {
    return {
      domain: domainMatch?.[1]?.trim() || '—',
      competencies: servicesMatch?.[1]?.trim() || '—',
    }
  }

  return {
    domain: descripcion.trim() || '—',
    competencies: '—',
  }
}

export type RetoStatusTone = 'neutral' | 'draft' | 'progress' | 'done'

const STATUS_LABELS: Record<string, string> = {
  'NO INCIADO': 'No iniciado',
  BORRADOR: 'Borrador',
  'EN PROGRESO': 'En progreso',
  'EN CURSO': 'En curso',
  COMPLETADO: 'Completado',
  FINALIZADO: 'Finalizado',
  MATRICULADO: 'Matriculado',
  'NO MATRICULADO': 'No matriculado',
  NO_MATRICULADO: 'No matriculado',
}

const STATUS_TONES: Record<string, RetoStatusTone> = {
  'NO INCIADO': 'neutral',
  BORRADOR: 'draft',
  'EN PROGRESO': 'progress',
  'EN CURSO': 'progress',
  COMPLETADO: 'done',
  FINALIZADO: 'done',
  MATRICULADO: 'progress',
  'NO MATRICULADO': 'neutral',
  NO_MATRICULADO: 'neutral',
}

/** Normaliza `status` / `estado` del API. */
export function normalizeRetoStatus(reto: RetoApiItem): string {
  const raw = reto.status ?? reto.estado ?? ''
  return String(raw).trim()
}

/** En el panel de inscritos no mostramos «No matriculado». */
export function shouldShowRetoStatusBadge(
  status: string,
  context: 'catalog' | 'subscribed' = 'catalog',
): boolean {
  const key = status.trim().toUpperCase().replace(/_/g, ' ')
  if (!key) return false
  if (context === 'subscribed' && key === 'NO MATRICULADO') return false
  return true
}

export function formatRetoStatus(status: string): { label: string; tone: RetoStatusTone } | null {
  const trimmed = status.trim()
  if (!trimmed) return null

  const key = trimmed.toUpperCase().replace(/_/g, ' ')
  return {
    label: STATUS_LABELS[key] ?? trimmed,
    tone: STATUS_TONES[key] ?? 'neutral',
  }
}

export function mapRetoToCatalogCard(reto: RetoApiItem): CatalogChallengeCard {
  const { domain, competencies } = parseRetoDescripcion(reto.descripcion)
  const routeId = LOCAL_ROUTE_BY_TITLE[reto.titulo] ?? reto.id

  return {
    id: reto.id,
    routeId,
    title: reto.titulo,
    domain,
    competencies,
    status: normalizeRetoStatus(reto),
    ...CARD_DEFAULTS,
  }
}
