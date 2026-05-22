export type CareerProfileMeta = {
  id: string
  career: string
  profile: string
  group: 'tech' | 'business'
  icon: 'systems' | 'industrial' | 'data' | 'admin' | 'finance' | 'accounting' | 'marketing' | 'law'
  summary: string
  ready: boolean
}

export const CAREER_PROFILES: CareerProfileMeta[] = [
  {
    id: 'sistemas',
    career: 'Ingeniería de sistemas',
    profile: 'Desarrollador y analista TI en banca digital',
    group: 'tech',
    icon: 'systems',
    summary:
      'Retos de desarrollo, integración y plataformas digitales alineados a equipos de tecnología en banca.',
    ready: false,
  },
  {
    id: 'industrial',
    career: 'Computación e informática',
    profile: 'Especialista en IT Data y desarrollo digital',
    group: 'tech',
    icon: 'systems',
    summary:
      'Retos de tecnología, datos y plataformas digitales con certificaciones IT Data de BCP.',
    ready: true,
  },
  {
    id: 'datos',
    career: 'Ciencia de datos',
    profile: 'Científico de datos y analítica financiera',
    group: 'tech',
    icon: 'data',
    summary:
      'Análisis, modelos y visualización de datos para decisiones en entornos regulados como banca y finanzas.',
    ready: false,
  },
  {
    id: 'software',
    career: 'Ingeniería de software',
    profile: 'Ingeniero de producto digital',
    group: 'tech',
    icon: 'systems',
    summary:
      'Construye y mejora productos digitales con enfoque en calidad, despliegue y experiencia de usuario.',
    ready: false,
  },
  {
    id: 'administracion',
    career: 'Administración y negocios',
    profile: 'Analista de negocios y producto bancario',
    group: 'business',
    icon: 'admin',
    summary:
      'Retos de estrategia, producto y operaciones comerciales diseñados con empresas del sector.',
    ready: false,
  },
  {
    id: 'economia',
    career: 'Economía y finanzas',
    profile: 'Asesor financiero y gestión de riesgos',
    group: 'business',
    icon: 'finance',
    summary:
      'Casos de inversión, riesgo y planificación financiera aplicados al mundo bancario real.',
    ready: false,
  },
  {
    id: 'contabilidad',
    career: 'Contabilidad',
    profile: 'Analista contable y cumplimiento normativo',
    group: 'business',
    icon: 'accounting',
    summary:
      'Reportes, controles y normativa contable en escenarios de instituciones financieras.',
    ready: false,
  },
  {
    id: 'marketing',
    career: 'Marketing y comunicaciones',
    profile: 'Especialista en experiencia del cliente',
    group: 'business',
    icon: 'marketing',
    summary:
      'Campañas, comunicación y journey del cliente en productos bancarios digitales.',
    ready: false,
  },
  {
    id: 'derecho',
    career: 'Derecho',
    profile: 'Asesor legal y regulatorio del sector',
    group: 'business',
    icon: 'law',
    summary:
      'Marco legal, cumplimiento y contratos en el ecosistema financiero peruano.',
    ready: false,
  },
  {
    id: 'otra',
    career: 'Otra carrera',
    profile: 'Perfil multidisciplinario en retos BCP',
    group: 'business',
    icon: 'admin',
    summary:
      'Ruta flexible con retos transversales para perfiles que combinan varias disciplinas.',
    ready: false,
  },
]

/** Carrera lista del panel (p. ej. tras login); si no hay match, industrial. */
export function getReadyCareerIdByCareerName(careerName?: string): string {
  if (!careerName) return 'industrial'
  const match = CAREER_PROFILES.find((p) => p.career === careerName && p.ready)
  return match?.id ?? 'industrial'
}

export function getCareerProfile(id: string | undefined): CareerProfileMeta | undefined {
  if (!id) return undefined
  return CAREER_PROFILES.find((profile) => profile.id === id)
}

export const TECH_PROFILES = CAREER_PROFILES.filter((p) => p.group === 'tech')
export const BUSINESS_PROFILES = CAREER_PROFILES.filter((p) => p.group === 'business')
