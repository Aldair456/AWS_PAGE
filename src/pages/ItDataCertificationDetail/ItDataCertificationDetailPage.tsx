import { Navigate, useParams } from 'react-router-dom'
import { getItDataCertification } from '../../data/itDataCertifications'
import { CertificationDetailView } from '../CertificationDetail/CertificationDetailView'

export function ItDataCertificationDetailPage() {
  const { certId } = useParams<{ certId: string }>()
  const certification = getItDataCertification(certId)

  if (!certification) {
    return <Navigate to="/#certificaciones" replace />
  }

  return (
    <CertificationDetailView
      certification={{
        level: certification.level,
        detailTitle: certification.detailTitle,
        subtitle: certification.track,
        longDescription: certification.longDescription,
        badgeImage: certification.badgeImage,
        badgeAlt: certification.badgeAlt,
      }}
    />
  )
}
