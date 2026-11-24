import { useEffect, useRef } from 'react';
import type { PointerEvent, PropsWithChildren } from 'react';
import { consultationWhatsappUrl } from '@/constants/contact';

const questions = [
  ['Como funciona a primeira consulta com a Dra. Elisiane?', 'Na primeira consulta, a Dra. Elisiane analisa o seu caso, avalia os documentos disponíveis e orienta você sobre os seus direitos e os possíveis caminhos para conseguir o seu benefício. Para melhores esclarecimentos, entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta.'],
  ['O atendimento pode ser feito on-line?', 'Sim, você pode solicitar atendimento on-line ou presencial em Silvânia-GO ou Goiânia-GO, conforme disponibilidade de agenda. Entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta.'],
  ['Como faço para agendar uma consulta?', 'É simples! Basta entrar em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marcar a sua consulta.'],
  ['Como saber se tenho direito a algum benefício do INSS?', 'Cada caso depende de fatores como histórico de contribuições, documentos e situação pessoal. Uma análise individual ajuda a identificar os benefícios que podem ser aplicáveis ao seu caso. Para melhores esclarecimentos, entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta.'],
  ['Tive meu benefício negado pelo INSS. Ainda posso recorrer?', 'Sim. Em muitos casos, existem medidas administrativas ou judiciais que podem ser avaliadas para reverter a decisão. As possibilidades e as estratégias dependem do motivo da negativa e dos documentos disponíveis. Para melhores esclarecimentos, entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta.'],
  ['Quem tem uma doença ou deficiência pode receber benefício do INSS?', 'Sim, caso preencha os requisitos legais e apresente documentação necessária, é possível ter o seu benefício no INSS. Solicite uma consulta para a análise de documentos. Entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157.'],
  ['Sofri um acidente e não consigo trabalhar. Tenho direito a benefício?', 'Sim, você pode ter direito a benefício de acordo com as consequências do acidente, a incapacidade para o trabalho e os demais requisitos legais. Havendo validação do INSS, você pode conseguir o seu benefício. Entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta para a análise do seu caso.'],
  ['Tenho direito ao salário-maternidade?', 'O direito depende da sua categoria, da situação que dá origem ao benefício e dos requisitos previdenciários aplicáveis a cada caso. Entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta para a análise do seu caso.'],
  ['Qual a idade mínima para a aposentadoria por idade no INSS?', 'Atualmente, os homens se aposentam a partir de 65 anos de idade, e as mulheres a partir de 62 anos de idade. Entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta para a análise da sua aposentadoria.'],
  ['Já fiz o pedido no INSS por conta própria. Ainda posso contratar uma advogada?', 'Sim. O seu pedido poderá ser analisado, e as possibilidades cabíveis para o seu caso poderão ser estudadas. Entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta para a análise do seu benefício.'],
  ['Posso revisar um benefício que já estou recebendo?', 'Depende da situação, sim. É necessária uma análise do seu caso para avaliar se existem erros ou questões que justifiquem uma revisão dentro dos requisitos e prazos legais. Para melhores esclarecimentos, entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta.'],
  ['Como vou acompanhar o andamento do meu processo?', 'Durante o processo, você receberá orientações e atualizações pela equipe da Dra. Elisiane sobre as etapas do seu processo, por e-mail ou WhatsApp.'],
  ['Posso contratar a Dra. Elisiane mesmo morando em outra cidade?', 'Sim. O atendimento e processo podem ser feitos 100% on-line, não afetando as atualizações e notificações sobre o seu processo. Tudo será enviado por WhatsApp e e-mail sobre as etapas, orientações e documentações necessárias para o sucesso do seu benefício no INSS. Para melhores esclarecimentos, entre em contato pelo WhatsApp clicando aqui, ou pelo número a seguir +55 (62) 98176-7157 e marque a sua consulta.'],
];

function Answer({ text }: { text: string }) {
  const [before, after] = text.split('clicando aqui');
  return <p>{before}{after === undefined ? null : <><a href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">clicando aqui</a>{after}</>}</p>;
}

function HoverDetails({ children, className, closeOnLeave = true }: PropsWithChildren<{ className?: string; closeOnLeave?: boolean }>) {
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

  return <details className={className} onPointerEnter={event => scheduleHover(event, true)} onPointerLeave={closeOnLeave ? event => scheduleHover(event, false) : undefined}>{children}</details>;
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
      <HoverDetails className="faq-outer" closeOnLeave={false}>
        <summary><h2>DÚVIDAS FREQUENTES</h2><span>+</span></summary>
        <div className="faq-list">
          {questions.map(([question, answer], index) => <article className="faq-card" key={question}>
            <h3>{index + 1}. {question}</h3>
            <Answer text={answer} />
          </article>)}
        </div>
      </HoverDetails>
      <div className="center-action"><a className="button button-red" href={consultationWhatsappUrl} target="_blank" rel="noopener noreferrer">MARCAR HORÁRIO</a></div>
    </div>
  </section>;
}
