export type CompanyChallenge = {
  id: string
  company: 'BCP' | 'Interbank'
  accessBadge: 'Gratuito' | 'Con certificación'
  title: string
  domain: string
  competencies: string
  rating: number
  reviews: number
  level: 'Básico' | 'Intermedio' | 'Avanzado'
  duration: string
  language: string
  format: string
  description: string
  objectives: string[]
  services: string[]
  audience: string[]
  prerequisites: string
  accessNote: string
  enrollMessage: string
  enrollCta: string
  enrollHint: string
  lastUpdated: string
  outline: { title: string; items: string[] }[]
}

export const INDUSTRIAL_CHALLENGES: CompanyChallenge[] = [
  {
    id: 'ind-1',
    company: 'BCP',
    accessBadge: 'Con certificación',
    title: 'Mapeo y mejora de proceso en sucursal digital',
    domain: 'Operaciones y mejora continua',
    competencies: 'Lean, diagramas de flujo, +2 más',
    rating: 4.6,
    reviews: 28,
    level: 'Intermedio',
    duration: '2 semanas',
    language: 'Español (Perú)',
    format: 'Reto guiado',
    description:
      'Este reto te invita a analizar un proceso real de atención en sucursal digital del BCP, identificar cuellos de botella y proponer mejoras medibles. Trabajarás con datos operativos simulados, entrevistas a roles clave y herramientas de mejora continua para entregar un plan de acción defendible ante el equipo aliado.',
    objectives: [
      'Mapear el flujo actual del proceso seleccionado con diagramas claros y tiempos de ciclo.',
      'Detectar al menos tres puntos de fricción con impacto en experiencia del cliente o costo operativo.',
      'Priorizar mejoras usando criterios Lean (valor, desperdicio, esfuerzo).',
      'Proponer un plan de implementación con responsables, métricas y quick wins a 30 días.',
      'Presentar resultados en un informe ejecutivo y una defensa oral de 10 minutos.',
    ],
    services: [
      'Diagramas de flujo y mapas de valor',
      'Análisis de indicadores operativos (KPIs)',
      'Matriz de priorización de mejoras',
    ],
    audience: [
      'Estudiantes de ingeniería industrial interesados en operaciones bancarias.',
      'Perfiles que buscan experiencia práctica en mejora continua con empresa aliada.',
    ],
    prerequisites:
      'Conocimientos básicos de procesos y estadística descriptiva. Se recomienda haber cursado introducción a operaciones o gestión de calidad.',
    accessNote: 'Requiere inscripción al reto',
    enrollMessage: 'Para participar, inscríbete en el reto y completa las entregas dentro del plazo.',
    enrollCta: 'Iniciar reto',
    enrollHint: 'Certificación al completar',
    lastUpdated: '12 de mayo de 2026',
    outline: [
      {
        title: 'Semana 1 — Diagnóstico',
        items: [
          'Kick-off con mentor BCP',
          'Recolección de datos y mapeo AS-IS',
          'Entrega intermedia: mapa de proceso',
        ],
      },
      {
        title: 'Semana 2 — Propuesta',
        items: [
          'Análisis de causas y diseño TO-BE',
          'Plan de mejoras y métricas',
          'Presentación final y retroalimentación',
        ],
      },
    ],
  },
  {
    id: 'ind-2',
    company: 'Interbank',
    accessBadge: 'Gratuito',
    title: 'Rediseño de flujo operativo en back-office',
    domain: 'Procesos back-office',
    competencies: 'KPIs operativos, automatización, +1 más',
    rating: 4.4,
    reviews: 19,
    level: 'Avanzado',
    duration: '3 semanas',
    language: 'Español (Perú)',
    format: 'Caso práctico',
    description:
      'En este reto abordarás un caso de back-office bancario: rediseñar un flujo con alto volumen transaccional, reducir reprocesos y proponer automatizaciones de bajo costo. El foco está en eficiencia, control de riesgo operativo y trazabilidad de indicadores.',
    objectives: [
      'Documentar el flujo actual y sus handoffs entre áreas.',
      'Cuantificar tiempos de ciclo, reprocesos y costos asociados.',
      'Identificar oportunidades de automatización o estandarización.',
      'Diseñar un flujo objetivo con controles y KPIs de seguimiento.',
    ],
    services: [
      'Cuadros de mando operativos',
      'Automatización con reglas de negocio',
      'Gestión de excepciones y SLA',
    ],
    audience: [
      'Estudiantes con interés en operaciones y transformación digital en banca.',
    ],
    prerequisites:
      'Manejo de Excel o Sheets, comprensión de KPIs operativos y nociones de automatización de procesos.',
    accessNote: 'Acceso gratuito',
    enrollMessage: 'Postula al reto sin costo y envía tu propuesta en el plazo indicado.',
    enrollCta: 'Postular al reto',
    enrollHint: 'Sin certificación — experiencia práctica',
    lastUpdated: '3 de mayo de 2026',
    outline: [
      {
        title: 'Fase 1 — Entendimiento',
        items: ['Brief del caso', 'Análisis del flujo actual'],
      },
      {
        title: 'Fase 2 — Diseño',
        items: ['Propuesta TO-BE', 'Indicadores y controles'],
      },
      {
        title: 'Fase 3 — Cierre',
        items: ['Informe final', 'Sesión de feedback con Interbank'],
      },
    ],
  },
]

export function getChallengeById(id: string): CompanyChallenge | undefined {
  return INDUSTRIAL_CHALLENGES.find((c) => c.id === id)
}

export function getChallengesForCareer(careerId: string): CompanyChallenge[] {
  if (careerId === 'industrial') return INDUSTRIAL_CHALLENGES
  return []
}
