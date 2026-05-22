const ESTUDIANTES_PROD = 'https://0k9u060818.execute-api.us-east-1.amazonaws.com/dev'
const RETOS_PROD = 'https://llw6ciwl24.execute-api.us-east-1.amazonaws.com/dev'
const SUSCRIPCIONES_PROD = 'https://d2lszp0r0g.execute-api.us-east-1.amazonaws.com/dev'
const UPLOADS_PROD = 'https://yyttmg8mpb.execute-api.us-east-1.amazonaws.com/dev'
const EVALUACIONES_PROD = 'https://7q0szxlpu5.execute-api.us-east-1.amazonaws.com/dev'
const CERTIFICACIONES_PROD = 'https://015f64ddgc.execute-api.us-east-1.amazonaws.com/dev'
const EMAILS_PROD = 'https://pbns3gv4s4.execute-api.us-east-1.amazonaws.com/dev'

/** POST estudiantes — en dev usa proxy `/api`. */
export const ESTUDIANTES_API_BASE_URL =
  (import.meta.env.VITE_ESTUDIANTES_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? '/api' : ESTUDIANTES_PROD)

/** GET retos — en dev usa proxy `/api-retos`. */
export const RETOS_API_BASE_URL =
  (import.meta.env.VITE_RETOS_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? '/api-retos' : RETOS_PROD)

/** POST suscripciones — en dev usa proxy `/api-suscripciones`. */
export const SUSCRIPCIONES_API_BASE_URL =
  (import.meta.env.VITE_SUSCRIPCIONES_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? '/api-suscripciones' : SUSCRIPCIONES_PROD)

/** POST uploads presigned — en dev usa proxy `/api-uploads`. */
export const UPLOADS_API_BASE_URL =
  (import.meta.env.VITE_UPLOADS_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? '/api-uploads' : UPLOADS_PROD)

/** POST/GET evaluaciones IA — en dev usa proxy `/api-evaluaciones`. */
export const EVALUACIONES_API_BASE_URL =
  (import.meta.env.VITE_EVALUACIONES_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? '/api-evaluaciones' : EVALUACIONES_PROD)

/** POST certificaciones — en dev usa proxy `/api-certificaciones`. */
export const CERTIFICACIONES_API_BASE_URL =
  (import.meta.env.VITE_CERTIFICACIONES_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? '/api-certificaciones' : CERTIFICACIONES_PROD)

/** POST emails/certificacion — en dev usa proxy `/api-emails`. */
export const EMAILS_API_BASE_URL =
  (import.meta.env.VITE_EMAILS_API_BASE_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? '/api-emails' : EMAILS_PROD)
