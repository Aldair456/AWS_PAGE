import './CertificationPath.css'

export function CertificationPath() {
  return (
    <section className="cert-path" aria-labelledby="cert-path-title">
      <div className="cert-path__split">
        <div className="cert-path__media">
          <img
            className="cert-path__image"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
            alt="Estudiantes colaborando con una laptop"
            loading="lazy"
            width={640}
            height={420}
          />
        </div>

        <div className="cert-path__content">
          <h2 id="cert-path-title" className="cert-path__title">
            Elija su ruta de certificación
          </h2>
          <p className="cert-path__text">
            Descubra qué formación se adapta mejor a sus necesidades según el puesto que ocupa o al
            que aspira, con retos diseñados por BCP, Interbank y otras empresas aliadas.
          </p>
          <a className="cert-path__link" href="#rutas">
            Explore las rutas de certificación
          </a>
        </div>
      </div>

    </section>
  )
}
