import { useEffect, useRef } from 'react';
import type { MouseEvent, PointerEvent, PropsWithChildren } from 'react';
import { consultationWhatsappUrl } from '@/constants/contact';

const questions = [
  ['Como funciona o primeiro atendimento?', 'Você pode enviar uma mensagem pelo WhatsApp. Após o contato inicial, serão esclarecidos os próximos passos e as condições do atendimento.'],
  ['O atendimento pode ser feito on-line?', 'Sim. O atendimento pode ser realizado on-line ou presencialmente, conforme disponibilidade e combinação prévia.'],
  ['Quais documentos devo apresentar?', 'Os documentos necessários variam conforme o benefício e a situação de cada pessoa. A orientação será feita após a conversa inicial.'],
  ['O resultado do pedido é garantido?', 'Não. Cada caso é analisado individualmente e a decisão depende dos requisitos legais e da avaliação do órgão responsável.'],
];

function keepMouseHoverOpen(event: MouseEvent<HTMLElement>) {
  const fromMouse = 'pointerType' in event.nativeEvent
    ? event.nativeEvent.pointerType === 'mouse'
    : window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (event.detail > 0 && fromMouse) {
    event.preventDefault();
  }
}

function HoverDetails({ children, className }: PropsWithChildren<{ className?: string }>) {
  const hoverTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
  }, []);

  const scheduleHover = (event: PointerEvent<HTMLDetailsElement>, open: boolean) => {
    if (event.pointerType !== 'mouse') return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);

    const details = event.currentTarget;
    hoverTimer.current = window.setTimeout(() => {
      details.open = open;
      hoverTimer.current = null;
    }, open ? 120 : 160);
  };

  return <details className={className} onPointerEnter={event => scheduleHover(event, true)} onPointerLeave={event => scheduleHover(event, false)}>{children}</details>;
}

export function Faq() {
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const openFromMenu = () => {
      if (window.location.hash === '#duvidas') {
        faqRef.current?.querySelector('details.faq-outer')?.setAttribute('open', '');
        window.requestAnimationFrame(() => faqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    };

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type !== 'reload') openFromMenu();
    window.addEventListener('hashchange', openFromMenu);
    return () => window.removeEventListener('hashchange', openFromMenu);
  }, []);

  return <section id="duvidas" ref={faqRef} className="section faq-section">
    <div className="section-inner">
      <HoverDetails className="faq-outer">
        <summary onClick={keepMouseHoverOpen}><h2>DÚVIDAS FREQUENTES</h2><span>+</span></summary>
        <div className="faq-list">
          {questions.map(([question, answer]) => <HoverDetails key={question}>
            <summary onClick={keepMouseHoverOpen}>{question}<span>+</span></summary>
            <p>{answer}</p>
          </HoverDetails>)}
        </div>
      </HoverDetails>
      <div className="center-action"><a className="button button-red" href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">MARCAR HORÁRIO</a></div>
    </div>
  </section>;
}
