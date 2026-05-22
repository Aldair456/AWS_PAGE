export { clearCertificacionDedupe, createCertificacionWithEmail } from './createCertificacionWithEmail'
export { getEstudianteCertificacion } from './getEstudianteCertificacion'
export { parseCertificacionId } from './parseCertificacionId'
export { postCertificacion } from './postCertificacion'
export type {
  CertificacionCreated,
  EstudianteCertificacion,
  PostCertificacionBody,
  PostCertificacionResponse,
} from './types'
export { CERTIFICACIONES_ESTUDIANTE, CERTIFICACIONES_POST } from './routes'
