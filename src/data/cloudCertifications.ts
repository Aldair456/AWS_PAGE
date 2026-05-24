import { IT_DATA_BADGE_IMAGES } from '../assets/itDataBadges'
import type { CertificationCardData } from '../components/BasicCertifications/CertificationCard'

export type CloudCertId = 'starter' | 'builder' | 'expert'

export type CloudCertification = {
  id: CloudCertId
  brand: string
  level: string
  title: string
  description: string
  longDescription: string
  detailTitle: string
  badgeImage: string
  badgeAlt: string
}

export const CLOUD_CERTIFICATIONS: CloudCertification[] = [
  {
    id: 'starter',
    brand: 'BCP',
    level: 'STARTER',
    title: 'Fundamentos en la nube',
    description:
      'Construye tus bases en la nube. Fundamentos de servicios digitales y retos de entrada publicados por BCP.',
    longDescription:
      'La insignia BCP certified Starter valida tus fundamentos en servicios digitales y la nube. Es el punto de partida de la ruta en la nube de BCP: resuelves retos de entrada publicados por el banco y demuestras que puedes construir tus bases en entornos cloud, tanto si recién empiezas en TI como si quieres reforzar conceptos esenciales.',
    detailTitle: 'BCP certified Starter — Fundamentos en la nube',
    badgeImage: IT_DATA_BADGE_IMAGES.starter,
    badgeAlt: 'Insignia Fundamentos en la nube — BCP certified Starter',
  },
  {
    id: 'builder',
    brand: 'BCP',
    level: 'BUILDER',
    title: 'Sistemas digitales escalables',
    description:
      'Diseña, construye y escala. Integra sistemas digitales con retos intermedios de integración y datos en BCP.',
    longDescription:
      'La insignia BCP certified Builder reconoce tu capacidad para diseñar, construir y escalar sistemas digitales. Avanzas con retos intermedios de integración y datos que BCP publica para estudiantes que ya dominaron los fundamentos y quieren demostrar competencias en arquitecturas y flujos operativos.',
    detailTitle: 'BCP certified Builder — Sistemas digitales escalables',
    badgeImage: IT_DATA_BADGE_IMAGES.builder,
    badgeAlt: 'Insignia Sistemas digitales escalables — BCP certified Builder',
  },
  {
    id: 'expert',
    brand: 'BCP',
    level: 'EXPERT',
    title: 'Arquitecto de soluciones',
    description:
      'Retos de nube y arquitectura. Diseña y valida soluciones avanzadas con desafíos de arquitectura publicados por BCP.',
    longDescription:
      'La insignia BCP certified Expert valida soluciones avanzadas de nube y arquitectura. Completas desafíos de arquitectura publicados por BCP y demuestras que puedes diseñar, integrar y validar soluciones complejas alineadas a casos reales del banco.',
    detailTitle: 'BCP certified Expert — Arquitecto de soluciones',
    badgeImage: IT_DATA_BADGE_IMAGES.expert,
    badgeAlt: 'Insignia Arquitecto de soluciones — BCP certified Expert',
  },
]

export function cloudCertificationPath(id: CloudCertId): string {
  return `/certificaciones-cloud/${id}`
}

export function getCloudCertification(id: string | undefined): CloudCertification | undefined {
  return CLOUD_CERTIFICATIONS.find((cert) => cert.id === id)
}

export function toCertificationCardData(cert: CloudCertification): CertificationCardData {
  return {
    brand: cert.brand,
    level: cert.level,
    variant: 'professional',
    title: cert.title,
    description: cert.description,
    href: cloudCertificationPath(cert.id),
    badgeImage: cert.badgeImage,
    badgeAlt: cert.badgeAlt,
  }
}
