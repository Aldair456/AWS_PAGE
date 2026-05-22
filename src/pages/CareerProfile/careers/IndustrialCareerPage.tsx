import type { CareerProfileMeta } from '../../../data/careerProfiles'
import { CareerChallengeCatalog } from '../../../components/CareerChallengeCatalog/CareerChallengeCatalog'
import { CareerProfileLayout } from '../CareerProfileLayout'

type IndustrialCareerPageProps = {
  profile: CareerProfileMeta
}

export function IndustrialCareerPage({ profile }: IndustrialCareerPageProps) {
  return (
    <CareerProfileLayout profile={profile} variant="catalog">
      <CareerChallengeCatalog profile={profile} />
    </CareerProfileLayout>
  )
}
