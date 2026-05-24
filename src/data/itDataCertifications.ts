import { IT_DATA_BADGE_IMAGES } from '../assets/itDataBadges'
import type { CertificationCardData } from '../components/BasicCertifications/CertificationCard'

export type ItDataCertId = 'starter' | 'builder' | 'expert'

export type ItDataCertification = {
  id: ItDataCertId
  brand: string
  level: string
  title: string
  track: string
  description: string
  longDescription: string
  detailTitle: string
  badgeImage: string
  badgeAlt: string
}

export const IT_DATA_CERTIFICATIONS: ItDataCertification[] = [
  {
    id: 'starter',
    brand: 'BCP',
    level: 'STARTER',
    title: 'Certificación IT Data Starter',
    track: 'Data Foundations Track',
    description:
      'Nivel de entrada en TI. Resuelves retos reales publicados por BCP sobre nube, servicios digitales y fundamentos tecnológicos. Ideal si recién empiezas y quieres tu primer certificado con el banco.',
    longDescription:
      'La certificación IT Data Starter valida tu nivel de entrada en tecnologías de la información con BCP. Resuelves retos reales sobre nube, servicios digitales y fundamentos tecnológicos que el banco publica para estudiantes. Es el primer paso de la ruta IT Data: ideal si recién empiezas y quieres obtener tu primer certificado respaldado por el banco.',
    detailTitle: 'Certificación IT Data Starter',
    badgeImage: IT_DATA_BADGE_IMAGES.starter,
    badgeAlt: 'Insignia IT Data Starter — Cloud Foundations',
  },
  {
    id: 'builder',
    brand: 'BCP',
    level: 'BUILDER',
    title: 'Certificación IT Data Builder',
    track: 'Data Analytics Track',
    description:
      'Siguiente paso en la ruta TI con BCP. Completas retos guiados de mayor profundidad: integración, datos operativos e IA aplicada en casos del sector bancario diseñados por el banco.',
    longDescription:
      'La certificación IT Data Builder reconoce tu avance en la ruta TI con BCP. Completas retos guiados de mayor profundidad — integración, datos operativos e IA aplicada — en casos del sector bancario diseñados por el banco. Demuestras que puedes diseñar, construir y escalar soluciones digitales en entornos reales.',
    detailTitle: 'Certificación IT Data Builder',
    badgeImage: IT_DATA_BADGE_IMAGES.builder,
    badgeAlt: 'Insignia IT Data Builder — Scalable Digital Systems',
  },
  {
    id: 'expert',
    brand: 'BCP',
    level: 'EXPERT',
    title: 'Certificación IT Data Expert',
    track: 'Advanced Data Science Track',
    description:
      'Retos de BCP en datos y analítica. Validas habilidades en reportes, indicadores y toma de decisiones resolviendo desafíos que el banco publica para estudiantes de TI.',
    longDescription:
      'La certificación IT Data Expert valida competencias avanzadas en datos y analítica con BCP. Resuelves desafíos que el banco publica para estudiantes de TI: reportes, indicadores, arquitectura de datos y toma de decisiones. Es el nivel más alto de la ruta IT Data para quienes quieren demostrar soluciones complejas en nube y arquitectura.',
    detailTitle: 'Certificación IT Data Expert',
    badgeImage: IT_DATA_BADGE_IMAGES.expert,
    badgeAlt: 'Insignia IT Data Expert — Solutions Architect',
  },
]

export function itDataCertificationPath(id: ItDataCertId): string {
  return `/certificaciones-it-data/${id}`
}

export function getItDataCertification(id: string | undefined): ItDataCertification | undefined {
  return IT_DATA_CERTIFICATIONS.find((cert) => cert.id === id)
}

export function toItDataCertificationCardData(cert: ItDataCertification): CertificationCardData {
  return {
    brand: cert.brand,
    level: cert.level,
    title: cert.title,
    description: cert.description,
    href: itDataCertificationPath(cert.id),
    badgeImage: cert.badgeImage,
    badgeAlt: cert.badgeAlt,
  }
}
