import { AnimatedPercent } from './AnimatedPercent'
import { ScrollReveal } from '../ScrollReveal'
import './WhyCertification.css'

const sideStats = [
  {
    value: 91,
    text: 'de las organizaciones con personal certificado afirman que contar con ese talento potencia la innovación en sus equipos digitales.',
  },
  {
    value: 90,
    text: 'de los responsables de TI que emplean personal certificado afirman que la productividad mejoró, y el 89 % informa que la solución de problemas es más rápida.',
  },
]

export function WhyCertification() {
  return (
    <section className="why-cert" aria-labelledby="why-cert-title">
      <ScrollReveal>
        <h2 id="why-cert-title" className="why-cert__title">
          ¿Para qué obtener una certificación?
        </h2>
      </ScrollReveal>

      <div className="why-cert__layout">
        <ScrollReveal as="article" delay={80} className="why-cert__featured">
          <p className="why-cert__headline">
            Se pronostica el <AnimatedPercent value={28} className="why-cert__percent" />
          </p>
          <p className="why-cert__text">
            de crecimiento previsto en puestos que requerirán habilidades digitales y en la nube en
            los próximos cinco años. Completar retos es una gran forma de desarrollar esas
            habilidades.
          </p>
          <a className="why-cert__link" href="#beneficios">
            Explore los beneficios de la certificación
          </a>
        </ScrollReveal>

        <div className="why-cert__side">
          {sideStats.map((stat, index) => (
            <ScrollReveal
              as="article"
              key={stat.value}
              delay={160 + index * 120}
              className="why-cert__stat"
            >
              {index > 0 && <hr className="why-cert__divider" aria-hidden />}
              <p className="why-cert__headline why-cert__headline--sm">
                El <AnimatedPercent value={stat.value} className="why-cert__percent" />
              </p>
              <p className="why-cert__text">{stat.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
