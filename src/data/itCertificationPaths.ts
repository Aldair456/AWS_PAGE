import { IT_DATA_BADGE_IMAGES } from '../assets/itDataBadges'

export type ItCertificationPath = {
  id: string
  level: string
  title: string
  track: string
  description: string
  badgeImage: string
  badgeAlt: string
  coverImage: string
}

/** Niveles alineados a las insignias: Starter → Builder → Expert */
export const IT_CERTIFICATION_PATHS: ItCertificationPath[] = [
  {
    id: 'starter',
    level: 'STARTER',
    title: 'IT Data Starter',
    track: 'Data Foundations Track',
    description: 'Nivel inicial. Fundamentos de TI y retos de entrada con BCP.',
    badgeImage: IT_DATA_BADGE_IMAGES.starter,
    badgeAlt: 'Insignia IT Data Starter — Data Foundations Track',
    coverImage:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=160&q=80',
  },
  {
    id: 'builder',
    level: 'BUILDER',
    title: 'IT Data Builder',
    track: 'Data Analytics Track',
    description: 'Nivel intermedio. Integración, datos e IA aplicada en retos BCP.',
    badgeImage: IT_DATA_BADGE_IMAGES.builder,
    badgeAlt: 'Insignia IT Data Builder — Data Analytics Track',
    coverImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=160&q=80',
  },
  {
    id: 'expert',
    level: 'EXPERT',
    title: 'IT Data Expert',
    track: 'Advanced Data Science Track',
    description: 'Nivel avanzado. Datos, analítica y mejora de procesos con BCP.',
    badgeImage: IT_DATA_BADGE_IMAGES.expert,
    badgeAlt: 'Insignia IT Data Expert — Advanced Data Science Track',
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=160&q=80',
  },
]
