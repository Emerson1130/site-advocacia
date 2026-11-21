import { services } from '@/data/services';
export function Services() {
  return <section id="atuacao" className="section services-section"><div className="section-inner"><img className="gavel-decoration" src="/reference/martelo.png" alt="" /><h2>RESOLVEMOS CASOS COMO</h2><div className="benefit-grid">{services.map((service, index) => <details className="benefit-card" key={service.number}><summary><img className="benefit-icon" src={`/reference/beneficio-${index + 1}.png`} alt="" /><span>{service.title}</span></summary><p>{service.details}</p><a href="#contato">Solicitar orientação →</a></details>)}</div></div></section>;
}
