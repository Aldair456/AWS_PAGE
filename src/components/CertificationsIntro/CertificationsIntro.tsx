import './CertificationsIntro.css'

const highlights = [
  {
    title: 'Retos con sentido real',
    text: 'Cada reto está alineado a competencias que las empresas buscan en sus equipos: datos, producto, operaciones, atención y más.',
  },
  {
    title: 'Para distintos perfiles',
    text: 'Rutas adaptadas a tu carrera y nivel: practicante, egresado reciente o estudiante avanzado. Avanzas a tu ritmo.',
  },
  {
    title: 'Certificado que cuenta',
    text: 'Al completar un reto, recibes una certificación emitida en conjunto con la empresa — lista para tu CV y LinkedIn.',
  },
]

export function CertificationsIntro() {
  return (
    <section className="cert-intro" aria-labelledby="cert-intro-title">
      <h2 id="cert-intro-title" className="cert-intro__title">
        Cómo te acerca al trabajo que buscas
      </h2>
      <p className="cert-intro__text">
        No son exámenes teóricos aislados: son retos de certificación creados por BCP para que
        demuestres lo que sabes hacer y construyas un historial verificable antes de tu primera
        entrevista.
      </p>

      <ul className="cert-intro__grid">
        {highlights.map((item) => (
          <li key={item.title} className="cert-intro__card">
            <h3 className="cert-intro__card-title">{item.title}</h3>
            <p className="cert-intro__card-text">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
