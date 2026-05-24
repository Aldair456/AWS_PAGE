import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import '../../App.css'
import './CertificationDetailPage.css'

export type CertificationDetailContent = {
  level: string
  detailTitle: string
  subtitle: string
  longDescription: string
  badgeImage: string
  badgeAlt: string
}

type CertificationDetailViewProps = {
  certification: CertificationDetailContent
}

export function CertificationDetailView({ certification }: CertificationDetailViewProps) {
  const { level, detailTitle, subtitle, longDescription, badgeImage, badgeAlt } = certification

  return (
    <div className="app cert-detail-page">
      <Header />
      <main className="cert-detail-page__main">
        <nav className="cert-detail-page__nav" aria-label="Navegación">
          <Link to="/#certificaciones" className="cert-detail-page__back">
            ← Volver a certificaciones
          </Link>
        </nav>

        <article className="cert-detail-page__hero">
          <div className="cert-detail-page__badge-wrap">
            <img src={badgeImage} alt={badgeAlt} className="cert-detail-page__badge" />
          </div>

          <div className="cert-detail-page__content">
            <p className="cert-detail-page__level">{level}</p>
            <h1 className="cert-detail-page__title">{detailTitle}</h1>
            <p className="cert-detail-page__subtitle">{subtitle}</p>
            <p className="cert-detail-page__description">{longDescription}</p>
            <div className="cert-detail-page__actions">
              <Link to="/rutas-certificacion" className="cert-detail-page__cta">
                Ver ruta de certificación
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
