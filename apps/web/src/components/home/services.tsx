import { services } from '@/data/services';
import { consultationWhatsappUrl } from '@/constants/contact';
export function Services() {
  return <section id="atuacao" className="section services-section"><div className="section-inner"><img className="gavel-decoration" src="/reference/martelo.svg" alt="" /><h2>RESOLVEMOS CASOS COMO</h2><div className="benefit-grid">{services.map((service, index) => <details className="benefit-card" key={service.number}><summary><img className="benefit-icon" src={`/reference/beneficio-${index + 1}.png`} alt="" /><span>{service.title}</span></summary><p>{service.details}</p><a href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">Solicitar orientação →</a></details>)}</div></div></section>;
}
