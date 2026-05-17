import { Navigate, useParams } from 'react-router-dom'
import { getCareerProfile } from '../../data/careerProfiles'
import { CareerProfileComingSoon } from './CareerProfileComingSoon'
import { IndustrialCareerPage } from './careers/IndustrialCareerPage'

export function CareerProfilePage() {
  const { careerId } = useParams<{ careerId: string }>()
  const profile = getCareerProfile(careerId)

  if (!profile) {
    return <Navigate to="/estudiante/panel" replace />
  }

  if (profile.id === 'industrial') {
    return <IndustrialCareerPage profile={profile} />
  }

  return <CareerProfileComingSoon profile={profile} />
}
