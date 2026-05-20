export type ResultCriterion = {
  id: string
  label: string
  score: number
  maxScore: number
  feedback: string
}

export type ChallengeAiAnalysis = {
  summary: string
  strengths: string[]
  improvements: string[]
  developmentNote: string
}

export type ChallengeResults = {
  totalScore: number
  maxScore: number
  certificateMinScore: number
  completedAt: string
  criteria: ResultCriterion[]
  ai: ChallengeAiAnalysis
}

const CERTIFICATE_MIN = 700
const MAX_SCORE = 1000

/** Escenario tipo flujo Lean / back-office (p. ej. Interbank ind-2). */
function simulatedResultsBackOfficeFlow(challengeTitle: string): ChallengeResults {
  return {
    totalScore: 742,
    maxScore: MAX_SCORE,
    certificateMinScore: CERTIFICATE_MIN,
    completedAt: '19 de mayo de 2026',
    criteria: [
      {
        id: 'map',
        label: 'Mapeo AS-IS y diagnóstico',
        score: 165,
        maxScore: 200,
        feedback: 'Buen detalle en tiempos de ciclo y cuellos de botella identificados.',
      },
      {
        id: 'lean',
        label: 'Análisis Lean y priorización',
        score: 178,
        maxScore: 200,
        feedback: 'Matriz de impacto–esfuerzo bien argumentada con datos del reto.',
      },
      {
        id: 'tobe',
        label: 'Diseño TO-BE y plan de mejoras',
        score: 155,
        maxScore: 200,
        feedback: 'Propuesta coherente; podrías profundizar métricas a 60 días.',
      },
      {
        id: 'present',
        label: 'Presentación y defensa oral',
        score: 124,
        maxScore: 200,
        feedback: 'Comunicación clara; refuerza el cierre con riesgos de implementación.',
      },
      {
        id: 'community',
        label: 'Participación y entregas',
        score: 120,
        maxScore: 200,
        feedback: 'Completaste todos los pasos y aportaste en la comunidad del reto.',
      },
    ],
    ai: {
      summary: `Tu desempeño en «${challengeTitle}» muestra dominio sólido del flujo operativo y criterio Lean para priorizar mejoras en un contexto bancario.`,
      strengths: [
        'Identificaste con precisión los handoffs entre sucursal digital y backoffice.',
        'Las mejoras propuestas están alineadas con experiencia del cliente y costo operativo.',
        'Tu narrativa en la defensa conecta el AS-IS con quick wins medibles a 30 días.',
      ],
      improvements: [
        'Incorpora escenarios de riesgo (cumplimiento, fraude) en el plan TO-BE.',
        'Amplía indicadores de seguimiento post-implementación más allá del NPS.',
      ],
      developmentNote:
        'El análisis con IA revisó tus entregas paso a paso, el tiempo invertido por módulo y la coherencia entre objetivos del reto y tu informe final. Este informe es orientativo para tu certificación BCP.',
    },
  }
}

/** Reto BCP «Crear e implementar agentes de IA» (Agent Builder, multi-cloud). */
function simulatedResultsAiAgents(challengeTitle: string): ChallengeResults {
  return {
    totalScore: 742,
    maxScore: MAX_SCORE,
    certificateMinScore: CERTIFICATE_MIN,
    completedAt: '19 de mayo de 2026',
    criteria: [
      {
        id: 'agent-builder',
        label: 'Configuración en Agent Builder',
        score: 168,
        maxScore: 200,
        feedback:
          'Modelo, herramientas, memoria y mensaje del sistema bien acotados al caso; refina el patrón de integración con APIs internas.',
      },
      {
        id: 'bcp-use-case',
        label: 'Caso de uso y contexto BCP',
        score: 172,
        maxScore: 200,
        feedback:
          'El agente responde a un problema concreto del negocio bancario; podrías explicitar más supuestos de datos y cumplimiento.',
      },
      {
        id: 'cloud-deploy',
        label: 'Implementación y despliegue en la nube',
        score: 154,
        maxScore: 200,
        feedback:
          'Despliegue coherente en el proveedor elegido; documenta costos aproximados y entornos (dev/prod).',
      },
      {
        id: 'demo',
        label: 'Demo, pruebas y comunicación',
        score: 128,
        maxScore: 200,
        feedback:
          'Demo clara y alineada al caso BCP; refuerza métricas de calidad del agente (precisión, latencia, errores).',
      },
      {
        id: 'community',
        label: 'Participación y entregas',
        score: 120,
        maxScore: 200,
        feedback:
          'Completaste los pasos del workspace (semana 1 y cierre) y las entregas registradas en el reto.',
      },
    ],
    ai: {
      summary: `Tu desempeño en «${challengeTitle}» refleja buen criterio en diseño de agentes con Agent Builder, alineación con el caso BCP y capacidad para implementar en el cloud que elegiste.`,
      strengths: [
        'Definiste con claridad el rol del agente y cómo usa herramientas y contexto para el caso asignado.',
        'Tu despliegue muestra que entiendes la cadena API–funciones–datos sin depender de un solo proveedor.',
        'La demo final articula valor para el negocio y decisiones técnicas razonables.',
      ],
      improvements: [
        'Refuerza lineamientos de datos sensibles, trazabilidad y auditoría cuando el agente invoque sistemas o APIs externas.',
        'Incorpora un plan de medición post-demo: pruebas con usuarios, umbrales de calidad y mejora continua del prompt y las herramientas.',
      ],
      developmentNote:
        'El análisis con IA tomó en cuenta tu entrega intermedia, el tiempo por módulo en el workspace, la coherencia con los objetivos del reto (Agent Builder, multi-cloud) y el cierre con demo y retroalimentación. Este informe es orientativo para tu certificación BCP.',
    },
  }
}

/**
 * Resultados demostrativos por reto (simulación).
 * Amplía el mapa cuando añadas retos con criterios propios.
 */
export function getSimulatedChallengeResults(
  challengeId: string,
  challengeTitle: string,
): ChallengeResults {
  switch (challengeId) {
    case 'ind-1':
      return simulatedResultsAiAgents(challengeTitle)
    case 'ind-2':
    default:
      return simulatedResultsBackOfficeFlow(challengeTitle)
  }
}

export function isCertificateEligible(totalScore: number, minScore: number): boolean {
  return totalScore >= minScore
}
