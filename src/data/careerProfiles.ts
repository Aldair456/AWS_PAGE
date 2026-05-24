export type CareerProfileMeta = {
  id: string
  career: string
  profile: string
  group: 'tech' | 'business'
  icon: 'systems' | 'industrial' | 'data' | 'admin' | 'finance' | 'accounting' | 'marketing' | 'law'
  /** Imagen representativa de la carrera (Unsplash). */
  imageUrl: string
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
    imageUrl:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&h=200&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1600880292203-75762a271058?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1533750349088-c7472910f9ad?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop&q=80',
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
