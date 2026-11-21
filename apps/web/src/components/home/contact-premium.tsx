import type { FormEvent } from 'react';
import { ArrowUpRight, LockKeyhole, MessageSquare } from 'lucide-react';
import { services } from '@/data/services';
import { whatsappUrl } from '@/lib/contact-links';

const contactPhone = '+55 62 98176-7157';

function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const value = (name: string) => String(data.get(name) ?? '').trim();
  const message = [
    'Olá! Gostaria de marcar um horário para conversar sobre o meu caso.',
    `Nome: ${value('name')}`,
    `E-mail: ${value('email')}`,
    value('phone') && `Telefone: ${value('phone')}`,
    value('subject') && `Assunto: ${value('subject')}`,
    `Mensagem: ${value('message')}`,
  ].filter(Boolean).join('\n');
  const url = whatsappUrl({ phone: contactPhone, text: message });
  const popup = window.open(url, '_blank');

  if (popup) {
    popup.opener = null;
  } else {
    window.location.assign(url);
  }
}

/** Static-hosting contact flow; no PocketBase service is available on Web Premium. */
export function ContactPremium() {
  return (
    <section id="contato" className="section contact-section">
      <a className="contact-close" href="#duvidas">Fechar formulário ×</a>
      <div className="section-heading"><span className="section-index">04</span><p className="eyebrow">ENTRE EM CONTATO</p></div>
      <div className="contact-grid">
        <div className="contact-copy">
          <h2>Vamos conversar<br /><span>sobre seus direitos?</span></h2>
          <p>Compartilhe sua necessidade. O primeiro contato é o início de uma orientação mais clara.</p>
          <div className="contact-info"><MessageSquare strokeWidth={1.4} size={23} /><div><h3>Um espaço para ouvir você</h3><p>Preencha os campos e continue a conversa pelo WhatsApp.</p></div></div>
          <div className="contact-security"><LockKeyhole size={17} /><p>Revise sua mensagem antes de enviá-la no WhatsApp. Evite incluir documentos ou dados sensíveis.</p></div>
        </div>
        <form className="contact-form" onSubmit={onSubmit}>
          <h3>Conte como podemos ajudar</h3>
          <p className="form-intro">Os campos com * são obrigatórios.</p>
          <div className="form-fields">
            <label>Nome completo *<input name="name" placeholder="Como podemos chamar você?" required minLength={2} maxLength={120} autoComplete="name" /></label>
            <div className="form-two">
              <label>E-mail *<input name="email" type="email" placeholder="seuemail@exemplo.com" required autoComplete="email" /></label>
              <label>Telefone<input name="phone" type="tel" placeholder="(DDD) 00000-0000" maxLength={30} autoComplete="tel" /></label>
            </div>
            <label>Assunto<select name="subject" defaultValue="Orientação geral"><option value="Orientação geral">Selecione um assunto</option>{services.map(service => <option key={service.title} value={service.title}>{service.title}</option>)}<option value="Outro assunto">Outro assunto</option></select></label>
            <label>Sua mensagem *<textarea name="message" placeholder="Descreva brevemente sua necessidade, sem incluir dados sensíveis." required minLength={10} maxLength={5000} rows={4} /></label>
            <label className="consent-label"><input type="checkbox" required name="consent" value="true" /><span>Concordo em abrir o WhatsApp com os dados preenchidos para decidir se desejo enviá-los.</span></label>
          </div>
          <button type="submit" className="button button-red">Continuar pelo WhatsApp<ArrowUpRight size={19} /></button>
          <p className="form-disclaimer">A mensagem será preparada no WhatsApp. Confira e toque em enviar para concluir o contato. O envio não estabelece relação contratual nem substitui uma consulta jurídica.</p>
          <details className="privacy-details"><summary>Informações de privacidade</summary><p>Os dados preenchidos são usados no seu navegador para preparar uma mensagem no WhatsApp. Este site não os armazena. Se você enviar a mensagem, eles serão recebidos pela advogada para responder ao contato.</p></details>
        </form>
      </div>
    </section>
  );
}
