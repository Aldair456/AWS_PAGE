/** Texto de paso o paso personalizado en el workspace (Aprender). */
export type OutlineItem =
  | string
  | {
      title: string
      /** Video tutorial del paso (YouTube embed ID). */
      workspaceVideoId?: string
      /** Entrega intermedia: subida de archivos + bloque para video sobre la solicitud. */
      workspaceSubmission?: true
      /** Video que explica cómo debe armarse la entrega / solicitud (YouTube embed ID). */
      submissionExplainerVideoId?: string
    }

export function outlineItemTitle(item: OutlineItem): string {
  return typeof item === 'string' ? item : item.title
}

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
  descriptionSections?: string[]
  benefits?: { title: string; text: string }[]
  objectives: string[]
  services: string[]
  audience: string[]
  prerequisites: string
  accessNote: string
  enrollMessage: string
  enrollCta: string
  enrollHint: string
  lastUpdated: string
  outline: { title: string; items: OutlineItem[] }[]
  guideResources?: {
    provider: string
    description?: string
    links: { label: string; url: string }[]
  }[]
}

export const INDUSTRIAL_CHALLENGES: CompanyChallenge[] = [
  {
    id: 'ind-1',
    company: 'BCP',
    accessBadge: 'Con certificación',
    title: 'Crear e implementar agentes de IA',
    domain: 'Agentes de IA generativa',
    competencies: 'Agent Builder, multi-cloud, +2 más',
    rating: 4.6,
    reviews: 28,
    level: 'Básico',
    duration: '2 semanas',
    language: 'Español (Perú)',
    format: 'Reto guiado',
    description:
      'Crea e implementa un agente de IA para BCP con Agent Builder, desplegable en cualquier proveedor cloud.',
    descriptionSections: [
      'El caso de uso Agent Builder te permite crear e implementar agentes de IA para resolver problemas concretos del negocio bancario, sin atarte a un solo proveedor cloud.',
      'Desde el panel de administración de BCP configuras el modelo, las herramientas, la memoria, el mensaje del sistema y el patrón de integración del agente. Defines cómo debe comportarse, qué datos puede usar y cómo se conecta con otros sistemas antes de desplegarlo.',
      'Para la implementación eliges la nube que prefieras, usando los servicios que necesites (funciones serverless, contenedores, APIs de modelos, bases de datos, etc.). El reto no exige un proveedor concreto; lo que importa es que el agente quede creado, desplegado y funcionando.',
      'Al cierre presentas el agente en tu proveedor elegido, explicas las decisiones de configuración e integración y muestras una demo breve ante el mentor BCP.',
    ],
    benefits: [
      {
        title: 'Independiente del proveedor cloud',
        text: 'Implementa en el proveedor cloud que ya uses. Usa tu cuenta o laboratorio; no hay dependencia de una sola plataforma en este reto.',
      },
      {
        title: 'Creación rápida',
        text: 'Configura el agente desde Agent Builder sin desarrollar orquestación manual; el despliegue lo adaptas a los servicios de tu cloud.',
      },
      {
        title: 'Todo en un solo lugar',
        text: 'Modelo, herramientas, memoria, mensaje del sistema e integración se definen en Agent Builder antes del despliegue.',
      },
      {
        title: 'Caso real BCP',
        text: 'Aplicas el agente a un escenario del sector financiero peruano con criterios de negocio claros.',
      },
      {
        title: 'Listo para demostrar',
        text: 'Al terminar tienes un agente implementado que puedes probar y presentar en la demo final.',
      },
    ],
    objectives: [
      'Entender el flujo de Agent Builder y el caso de uso asignado por BCP.',
      'Configurar modelo, herramientas, memoria, mensaje del sistema y patrón de integración.',
      'Crear el agente en el panel de administración y validar su comportamiento.',
      'Implementar y desplegar la pila del agente en el proveedor cloud que elijas.',
      'Justificar por qué los servicios de tu nube resuelven el caso (sin depender de un solo proveedor).',
      'Presentar una demo del agente en funcionamiento ante el equipo aliado.',
    ],
    services: [
      'Agent Builder (panel de administración BCP)',
      'Proveedor cloud a elección del participante',
      'Configuración de modelo, herramientas, memoria e integración',
      'Serverless, contenedores y APIs de modelos en la nube elegida',
    ],
    audience: [
      'Estudiantes de computación e informática interesados en IA aplicada.',
      'Perfiles que quieren experiencia práctica creando agentes en banca.',
    ],
    prerequisites:
      'Conocimientos básicos de programación y uso de APIs. Acceso a una cuenta cloud gratuita o de laboratorio. Se recomienda haber usado algún asistente con IA.',
    accessNote: 'Requiere inscripción al reto',
    enrollMessage: 'Para participar, inscríbete en el reto y completa las entregas dentro del plazo.',
    enrollCta: 'Suscribirse',
    enrollHint: 'Certificación al completar',
    lastUpdated: '12 de mayo de 2026',
    outline: [
      {
        title: 'Semana 1 — Configurar el agente',
        items: [
          {
            title: 'Configurar modelo, herramientas, memoria y mensaje del sistema',
            workspaceVideoId: 'GI2C-n8GMbM',
          },
          {
            title: 'Casos de uso en el BCP',
            workspaceVideoId: 'P-SrBY4Fy1w',
          },
          // Para incrustar el video del mentor: añade submissionExplainerVideoId: '<id-de-youtube>'
          {
            title: 'Entrega intermedia: agente creado y patrón de integración definido',
            workspaceSubmission: true,
          },
        ],
      },
      {
        title: 'Semana 2 — Implementar y presentar',
        items: ['Demo final y retroalimentación'],
      },
    ],
    guideResources: [
      {
        provider: 'Nube de AWS',
        description: 'Catálogo de servicios en la nube y herramientas para crear e implementar tu agente.',
        links: [
          {
            label: 'Servicios en la nube de AWS',
            url: 'https://aws.amazon.com/es/products/',
          },
          {
            label: 'Servicios de IA de AWS',
            url: 'https://aws.amazon.com/es/ai/',
          },
        ],
      },
      {
        provider: 'Google Cloud',
        description: 'Productos y servicios de Google Cloud para desplegar modelos, APIs y cómputo.',
        links: [
          {
            label: 'Productos de Google Cloud',
            url: 'https://cloud.google.com/products?hl=es',
          },
          {
            label: 'IA y aprendizaje automático en Google Cloud',
            url: 'https://cloud.google.com/products/ai?hl=es',
          },
        ],
      },
      {
        provider: 'Microsoft Azure',
        description: 'Servicios de Azure para aplicaciones, datos e inteligencia artificial.',
        links: [
          {
            label: 'Productos de Azure',
            url: 'https://azure.microsoft.com/es-es/products',
          },
          {
            label: 'Servicios de IA de Azure',
            url: 'https://azure.microsoft.com/es-es/products/ai-services',
          },
        ],
      },
      {
        provider: 'Herramientas de apoyo',
        description:
          'También puedes usar herramientas gratuitas o de laboratorio para diagramar la arquitectura del agente, documentar flujos y probar APIs.',
        links: [
          {
            label: 'draw.io — diagramas y arquitectura',
            url: 'https://app.diagrams.net/',
          },
          {
            label: 'Lucidchart',
            url: 'https://www.lucidchart.com/pages/es',
          },
          {
            label: 'Excalidraw',
            url: 'https://excalidraw.com/',
          },
          {
            label: 'Miro — mapas y colaboración',
            url: 'https://miro.com/',
          },
          {
            label: 'Postman — pruebas de APIs',
            url: 'https://www.postman.com/',
          },
          {
            label: 'Visual Studio Code',
            url: 'https://code.visualstudio.com/',
          },
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
