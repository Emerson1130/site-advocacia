import { site } from '@/constants/site';
import { consultationWhatsappUrl } from '@/constants/contact';

export function Hero() {
  return <>
    <section id="inicio" className="hero">
      <img className="hero-image" src={site.officeImage} alt="Dra. Elisiane Romualdo em seu escritório" />
      <div className="hero-inner">
        <div className="hero-content">
          <h1>DRA. ELISIANE ROMUALDO</h1>
          <p className="hero-role">ADVOGADA PREVIDENCIARISTA<br /><strong>OAB-GO 64.219</strong></p>
          <p className="hero-description">Defendendo os seus direitos e de sua família contra o INSS!<br />Clique na opção abaixo que faz mais sentido para o seu caso:</p>
          <div className="hero-actions">
            <a className="button button-red" href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">QUERO ATENDIMENTO ON-LINE</a>
            <a className="button button-red" href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">QUERO ATENDIMENTO PRESENCIAL</a>
          </div>
        </div>
      </div>
    </section>
    <section className="trust-band" aria-label="Dados sobre benefícios do INSS">
      <div className="trust-inner">
        <p className="trust-caption">Entre Janeiro e Junho de 2026, de acordo com <strong>Instituto Nacional do Seguro Social (INSS):</strong></p>
        <div className="trust-stat"><strong>70<em>%</em></strong><span>DOS BENEFÍCIOS FORAM<br />NEGADOS NO INSS</span></div>
        <p className="trust-note">Podendo ser possível reverter esse caso somente<br />com a contratação de um advogado(a)</p>
      </div>
    </section>
  </>;
}
