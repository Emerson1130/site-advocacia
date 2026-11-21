export function Testimonials() {
  return <section id="depoimentos" className="section testimonials-section">
    <div className="section-inner">
      <h2>DEPOIMENTOS</h2>
      <div className="testimonial-grid">
        <div className="testimonial-crop testimonial-first"><img src="/reference/depoimento-1.webp" alt="Depoimento de cliente elogiando a atenção e o trabalho da Dra. Elisiane" /></div>
        <div className="testimonial-crop testimonial-second"><img src="/reference/depoimento-2.webp" alt="Depoimento de cliente sobre o atendimento prestativo e esclarecedor" /></div>
        <div className="testimonial-audio"><img src="/reference/depoimento-audio.webp" alt="Imagem de uma mensagem de áudio recebida de cliente" /></div>
        <div className="testimonial-crop testimonial-third"><img src="/reference/depoimento-3.webp" alt="Depoimento de cliente satisfeita com o serviço e o acompanhamento" /></div>
      </div>
      <div className="center-action"><a className="button button-red" href="#contato">QUERO UMA CONSULTA</a></div>
      <img className="floating-hearts" src="/reference/coracoes.png" alt="" />
    </div>
  </section>;
}
