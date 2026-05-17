import { SubNav } from '../SubNav'
import { Hero } from '../Hero'
import { BasicCertifications } from '../BasicCertifications'
import { ProfessionalCertifications } from '../ProfessionalCertifications'
import { CertificationPath } from '../CertificationPath'
import { WhyCertification } from '../WhyCertification'
import './Landing.css'

export function Landing() {
  return (
    <div className="landing">
      <div className="landing__bg" aria-hidden>
        <span className="landing__zone landing__zone--peach" />
        <span className="landing__zone landing__zone--blue" />
        <span className="landing__zone landing__zone--cream" />
        <span className="landing__zone landing__zone--lavender" />
      </div>

      <div className="landing__subnav-wrap">
        <SubNav />
      </div>
      <Hero />
      <BasicCertifications />
      <ProfessionalCertifications />
      <CertificationPath />
      <WhyCertification />
    </div>
  )
}
