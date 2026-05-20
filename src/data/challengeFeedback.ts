import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'
import s4 from '../assets/s4.png'

export type FeedbackStudent = {
  id: string
  name: string
  university: string
  role: string
  initials: string
  avatarColor: string
}

export type FeedbackMedia =
  | { type: 'image'; src: string; alt: string; caption?: string }
  | {
      type: 'video'
      title: string
      duration?: string
      /** ID de YouTube para incrustar (ej. WJVxr0APFz0). */
      youtubeId?: string
      /** Archivo local solo si no hay youtubeId. */
      src?: string
      poster?: string
    }

export type ChallengeFeedbackPost = {
  id: string
  challengeId: string
  student: FeedbackStudent
  title: string
  summary: string
  body: string
  postedAt: string
  tags: string[]
  helpfulCount: number
  commentCount: number
  media: FeedbackMedia[]
}

const STUDENTS: FeedbackStudent[] = [
  {
    id: 'stu-1',
    name: 'Ana García Salazar',
    university: 'UTEC',
    role: 'Computación e informática · 6.º ciclo',
    initials: 'AG',
    avatarColor: '#5b21b6',
  },
  {
    id: 'stu-2',
    name: 'Luis Mendoza Vega',
    university: 'PUCP',
    role: 'Computación e informática · 5.º ciclo',
    initials: 'LM',
    avatarColor: '#1d4ed8',
  },
  {
    id: 'stu-3',
    name: 'Carmen Ríos Paredes',
    university: 'UNI',
    role: 'IT Data · 7.º ciclo',
    initials: 'CR',
    avatarColor: '#047857',
  },
  {
    id: 'stu-4',
    name: 'Diego Torres Luna',
    university: 'UPN',
    role: 'Computación e informática · 4.º ciclo',
    initials: 'DT',
    avatarColor: '#b45309',
  },
  {
    id: 'stu-5',
    name: 'Valeria Chávez Ortiz',
    university: 'ESAN',
    role: 'Egresada · IA aplicada',
    initials: 'VC',
    avatarColor: '#be123c',
  },
  {
    id: 'stu-6',
    name: 'Jorge Huamán Quispe',
    university: 'UNMSM',
    role: 'Computación e informática · 8.º ciclo',
    initials: 'JH',
    avatarColor: '#0e7490',
  },
]

const AI_AGENTS_FEEDBACK: ChallengeFeedbackPost[] = [
  {
    id: 'post-1',
    challengeId: 'ind-1',
    student: STUDENTS[0],
    title: 'Arquitectura cloud del agente para consultas de productos',
    summary: 'Diagrama en draw.io: API Gateway, Lambda y modelo fundacional con memoria de sesión.',
    body: 'Comparto la arquitectura que usé para el asistente de productos BCP. El agente expone un endpoint vía API Gateway, orquesta herramientas MCP para catálogo y FAQs, y guarda contexto en una base clave-valor. La entrega intermedia incluye este diagrama más el JSON de configuración de Agent Builder.',
    postedAt: 'Hace 2 días',
    tags: ['Arquitectura', 'Agent Builder', 'Multi-cloud'],
    helpfulCount: 24,
    commentCount: 6,
    media: [
      {
        type: 'image',
        src: s1,
        alt: 'Diagrama de arquitectura del agente en la nube',
        caption: 'Vista general — cómputo, APIs y almacenamiento',
      },
    ],
  },
  {
    id: 'post-2',
    challengeId: 'ind-1',
    student: STUDENTS[1],
    title: 'Video: demo del agente en Agent Builder (10 min)',
    summary: 'Muestro configuración de modelo, herramientas MCP y prueba en el panel.',
    body: 'Grabé la demo final como pidió el mentor BCP: recorro el panel de Agent Builder, el mensaje del sistema, las herramientas conectadas y una conversación de prueba sobre apertura de cuenta digital. Al final explico cómo desplegué la pila en mi proveedor cloud.',
    postedAt: 'Hace 3 días',
    tags: ['Agent Builder', 'Demo', 'MCP'],
    helpfulCount: 31,
    commentCount: 9,
    media: [
      {
        type: 'image',
        src: s2,
        alt: 'Captura del panel Agent Builder con el agente configurado',
        caption: 'Modelo, memoria e integración definidos',
      },
      {
        type: 'video',
        youtubeId: 'WJVxr0APFz0',
        title: 'Demo agente — Luis Mendoza',
        duration: '9:42',
      },
    ],
  },
  {
    id: 'post-3',
    challengeId: 'ind-1',
    student: STUDENTS[2],
    title: 'Patrón de integración y plan de despliegue',
    summary: 'Documenté WebSocket + serverless para el canal de sucursal digital.',
    body: 'Adjunto el diagrama de integración y un one-pager con decisiones de seguridad (IAM, red privada, cifrado en tránsito). El agente atiende consultas de horarios y requisitos; las herramientas MCP llaman a APIs internas simuladas del hackathon.',
    postedAt: 'Hace 5 días',
    tags: ['Integración', 'WebSocket', 'Serverless'],
    helpfulCount: 18,
    commentCount: 4,
    media: [
      {
        type: 'image',
        src: s3,
        alt: 'Esquema de integración del agente con sistemas BCP',
        caption: 'Flujo cliente → agente → herramientas',
      },
    ],
  },
  {
    id: 'post-4',
    challengeId: 'ind-1',
    student: STUDENTS[3],
    title: 'Prompt del sistema y pruebas de sesgo',
    summary: 'Tres escenarios: cliente nuevo, consulta de préstamo y escalamiento a humano.',
    body: 'Documenté el system prompt y casos de prueba. El mayor riesgo era respuestas demasiado creativas en montos; añadí guardrails y citas de fuentes MCP. Sin imágenes en esta entrega, solo el informe en Word que subí en la plataforma.',
    postedAt: 'Hace 1 semana',
    tags: ['Prompts', 'Seguridad', 'Pruebas'],
    helpfulCount: 15,
    commentCount: 11,
    media: [],
  },
  {
    id: 'post-5',
    challengeId: 'ind-1',
    student: STUDENTS[4],
    title: 'Implementación en producción (demo) + métricas',
    summary: 'Enfoque en latencia, costo por consulta y trazabilidad de herramientas.',
    body: 'Como egresada comparé dos configuraciones de memoria del agente. Los anexos muestran el dashboard de monitoreo simulado y el recorrido del flujo de una consulta real en laboratorio. Incluyo captura de la arquitectura desplegada y video corto del recorrido.',
    postedAt: 'Hace 1 semana',
    tags: ['Observabilidad', 'Costos', 'Producción'],
    helpfulCount: 27,
    commentCount: 5,
    media: [
      {
        type: 'image',
        src: s4,
        alt: 'Vista del agente desplegado y métricas de uso',
        caption: 'Despliegue y monitoreo en la nube',
      },
      {
        type: 'video',
        youtubeId: 'WJVxr0APFz0',
        title: 'Recorrido de una consulta con el agente',
        duration: '4:15',
      },
    ],
  },
  {
    id: 'post-6',
    challengeId: 'ind-1',
    student: STUDENTS[5],
    title: 'Herramientas MCP y mapa de dependencias',
    summary: 'Tres tools: catálogo, políticas KYC y escalamiento a asesor humano.',
    body: 'Comparto cómo modelé cada herramienta MCP y el diagrama de dependencias entre el agente y los servicios. Dos integraciones concentran el 80% del tráfico según mis pruebas de carga locales.',
    postedAt: 'Hace 2 semanas',
    tags: ['MCP', 'Herramientas', 'Arquitectura'],
    helpfulCount: 12,
    commentCount: 3,
    media: [
      {
        type: 'image',
        src: s1,
        alt: 'Mapa de herramientas MCP conectadas al agente',
        caption: 'Dependencias entre agente y APIs',
      },
      {
        type: 'image',
        src: s2,
        alt: 'Detalle de configuración de herramientas en Agent Builder',
        caption: 'Panel de herramientas y permisos',
      },
    ],
  },
]

const GENERIC_FEEDBACK: ChallengeFeedbackPost[] = [
  {
    id: 'post-gen-1',
    challengeId: '_default',
    student: STUDENTS[1],
    title: 'Nuestra solución con agente de IA',
    summary: 'Resumen del enfoque del equipo para el reto.',
    body: 'Publicamos la arquitectura, la configuración en Agent Builder y lo aprendido en la demo. Próximo paso en un escenario real: conectar con APIs productivas del banco.',
    postedAt: 'Hace 4 días',
    tags: ['Entrega final', 'Agentes'],
    helpfulCount: 8,
    commentCount: 2,
    media: [],
  },
]

export function getFeedbackPostsForChallenge(challengeId: string): ChallengeFeedbackPost[] {
  const specific = AI_AGENTS_FEEDBACK.filter((post) => post.challengeId === challengeId)
  if (specific.length > 0) return specific
  return GENERIC_FEEDBACK.map((post) => ({ ...post, challengeId }))
}
