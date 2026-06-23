/** Diálogos del mentor NPC por paso del workspace (ind-1) */
export const NPC_DIALOGUES_BY_LESSON: Record<string, string[]> = {
  'lesson-0-0': [
    '¡Hola! Soy tu guía en este reto. Acabas de ver cómo funciona Agent Builder en el BCP.',
    'Primero eliges el modelo de IA: define qué tan capaz y rápido será tu agente según el caso de uso bancario.',
    'Luego configuras herramientas y memoria. Las herramientas le permiten consultar datos; la memoria guarda contexto de la conversación.',
    'El mensaje del sistema es la personalidad del agente: tono, límites y reglas que debe seguir con clientes reales.',
    'En la entrega intermedia demostrarás que entendiste cada pieza antes de desplegar en la nube.',
  ],
  'lesson-0-1': [
    'Perfecto, ya viste casos de uso reales del BCP. Aquí la clave es pensar en problemas concretos del negocio.',
    'Un agente puede orientar sobre productos, apoyar a asesores o resolver consultas frecuentes de clientes.',
    'Tu agente no debe depender de un solo proveedor cloud: el reto valora que elijas la nube que ya manejas.',
    'Documenta por qué tu diseño resuelve el caso asignado y cómo se integra con otros sistemas del banco.',
    'Siguiente paso: prepara tu entrega intermedia con diagrama, Word y evidencias de prueba.',
  ],
}

/** Escena del mentor tras los dos videos intro (ind-1) */
export const INTRO_SCENE_DIALOGUES = [
  '¡Bienvenido! Soy tu mentor en este reto. Acabas de ver la introducción: ahora te cuento de qué va todo.',
  'Tu misión es crear un agente de IA con Agent Builder del BCP — modelo, herramientas, memoria, prompt e integración.',
  'Después lo implementas en la nube que prefieras. No estás atado a un solo proveedor: usa la que ya manejas.',
  'Habrá una entrega intermedia con tu diseño y, al final, una demo funcional ante el equipo del banco.',
  'Si completas el reto, puedes obtener tu certificación. ¿Listo para empezar?',
]

const NPC_DEFAULT_DIALOGUES = [
  'Este reto te pide crear e implementar un agente de IA con Agent Builder del BCP.',
  'Configura modelo, herramientas, memoria e integración; despliega en la nube que prefieras.',
  'Al final presentas una demo funcional ante el mentor y puedes obtener tu certificación.',
]

export function getNpcDialogues(lessonId: string): string[] {
  return NPC_DIALOGUES_BY_LESSON[lessonId] ?? NPC_DEFAULT_DIALOGUES
}

export function getIntroSceneDialogues(): string[] {
  return INTRO_SCENE_DIALOGUES
}
