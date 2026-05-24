import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import '../../App.css'
import './CertificationRoutesPage.css'

/** Mismo PDF que src/assets/Ruta de Certificación.pdf (copia en public para el visor) */
const RUTA_CERTIFICACION_PDF = '/ruta-certificacion.pdf'
const pdfViewerSrc = `${RUTA_CERTIFICACION_PDF}#view=FitH&toolbar=1`

export function CertificationRoutesPage() {
  return (
    <div className="app cert-routes-page">
      <Header />
      <main className="cert-routes-page__main" aria-labelledby="cert-routes-title">
        <div className="cert-routes-page__toolbar">
          <Link to="/" className="cert-routes-page__back">
            ← Volver al inicio
          </Link>
          <h1 id="cert-routes-title" className="cert-routes-page__title">
            Ruta de certificación
          </h1>
          <a
            href={RUTA_CERTIFICACION_PDF}
            download="Ruta-de-Certificacion.pdf"
            className="cert-routes-page__download"
          >
            Descargar PDF
          </a>
        </div>

        <div className="cert-routes-page__viewer-wrap">
          <embed
            className="cert-routes-page__viewer"
            src={pdfViewerSrc}
            type="application/pdf"
            title="Ruta de certificación — documento PDF"
          />
        </div>
      </main>
    </div>
  )
}
