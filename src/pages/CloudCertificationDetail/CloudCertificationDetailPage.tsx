import { Navigate, useParams } from 'react-router-dom'
import { getCloudCertification } from '../../data/cloudCertifications'
import { CertificationDetailView } from '../CertificationDetail/CertificationDetailView'

export function CloudCertificationDetailPage() {
  const { certId } = useParams<{ certId: string }>()
  const certification = getCloudCertification(certId)

  if (!certification) {
    return <Navigate to="/#certificaciones" replace />
  }

  return (
    <CertificationDetailView
      certification={{
        level: certification.level,
        detailTitle: certification.detailTitle,
        subtitle: certification.title,
        longDescription: certification.longDescription,
        badgeImage: certification.badgeImage,
        badgeAlt: certification.badgeAlt,
      }}
    />
  )
}
