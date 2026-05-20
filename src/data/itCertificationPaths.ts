import badgeAssociado from '../assets/IT_ASSOCIADO.png'
import badgePractitioner from '../assets/IT_PRACTIONER.png'
import badgeProfessional from '../assets/IT_PROFESSIONAL.png'

export type ItCertificationPath = {
  id: string
  level: string
  title: string
  description: string
  badgeImage: string
  badgeAlt: string
}

export const IT_CERTIFICATION_PATHS: ItCertificationPath[] = [
  {
    id: 'practitioner',
    level: 'PRACTITIONER',
    title: 'IT Data Practitioner',
    description: 'Nivel inicial. Fundamentos de TI y retos de entrada con BCP.',
    badgeImage: badgePractitioner,
    badgeAlt: 'Insignia IT Data Practitioner',
  },
  {
    id: 'associate',
    level: 'ASSOCIATE',
    title: 'IT Data Associate',
    description: 'Nivel intermedio. Integración, datos e IA aplicada en retos BCP.',
    badgeImage: badgeAssociado,
    badgeAlt: 'Insignia IT Data Associate',
  },
  {
    id: 'professional',
    level: 'PROFESSIONAL',
    title: 'IT Data Professional',
    description: 'Nivel avanzado. Datos, analítica y mejora de procesos con BCP.',
    badgeImage: badgeProfessional,
    badgeAlt: 'Insignia IT Data Professional',
  },
]
