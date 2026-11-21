import { useEffect, useRef, useState } from 'react';
import { services } from '@/data/services';
import { consultationWhatsappUrl } from '@/constants/contact';

type Service = (typeof services)[number];

function BenefitCard({ service, index }: { service: Service; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const supportsHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cancelClose = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
  }, []);

  return (
    <details
      className="benefit-card"
      open={isOpen}
      onMouseEnter={() => {
        if (!supportsHover()) return;
        cancelClose();
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (!supportsHover()) return;
        cancelClose();
        closeTimer.current = setTimeout(() => {
          setIsOpen(false);
          closeTimer.current = null;
        }, 420);
      }}
    >
      <summary onClick={(event) => { event.preventDefault(); cancelClose(); setIsOpen((open) => !open); }}>
        <img className="benefit-icon" src={`/reference/beneficio-${index + 1}.png`} alt="" />
        <span>{service.title}</span>
      </summary>
      <p>{service.details}</p>
      <a href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">Solicitar orientação →</a>
    </details>
  );
}

export function Services() {
  return (
    <section id="atuacao" className="section services-section">
      <div className="section-inner">
        <img className="gavel-decoration" src="/reference/martelo.svg" alt="" />
        <h2>RESOLVEMOS CASOS COMO</h2>
        <div className="benefit-grid">
          {services.map((service, index) => <BenefitCard key={service.number} service={service} index={index} />)}
        </div>
      </div>
    </section>
  );
}
