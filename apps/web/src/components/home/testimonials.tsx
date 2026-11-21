import { consultationWhatsappUrl } from '@/constants/contact';
import { TestimonialAudio } from './testimonial-audio';

export function Testimonials() {
  return <section id="depoimentos" className="section testimonials-section">
    <div className="section-inner">
      <h2>DEPOIMENTOS</h2>
      <div className="testimonial-grid">
        <div className="testimonial-crop testimonial-first"><img src="/reference/depoimento-3.svg" alt="Depoimento de cliente elogiando a atenção e o trabalho da Dra. Elisiane" /></div>
        <div className="testimonial-crop testimonial-second"><img src="/reference/depoimento-2.svg" alt="Depoimento de cliente sobre o atendimento prestativo e esclarecedor" /></div>
        <TestimonialAudio />
        <div className="testimonial-crop testimonial-third"><img src="/reference/depoimento.svg" alt="Depoimento de cliente satisfeita com o serviço e o acompanhamento" /></div>
      </div>
      <div className="center-action"><a className="button button-red" href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">QUERO UMA CONSULTA</a></div>
      <img className="floating-hearts" src="/reference/coracao.svg" alt="" />
    </div>
  </section>;
}
