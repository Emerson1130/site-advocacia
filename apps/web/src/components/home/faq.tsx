const questions = [
  ['Como funciona o primeiro atendimento?', 'Você pode enviar uma mensagem pelo formulário. Após o contato inicial, serão esclarecidos os próximos passos e as condições do atendimento.'],
  ['O atendimento pode ser feito on-line?', 'Sim. O atendimento pode ser realizado on-line ou presencialmente, conforme disponibilidade e combinação prévia.'],
  ['Quais documentos devo apresentar?', 'Os documentos necessários variam conforme o benefício e a situação de cada pessoa. A orientação será feita após a conversa inicial.'],
  ['O resultado do pedido é garantido?', 'Não. Cada caso é analisado individualmente e a decisão depende dos requisitos legais e da avaliação do órgão responsável.'],
];
export function Faq() { return <section id="duvidas" className="section faq-section"><div className="section-inner"><details className="faq-outer"><summary><h2>DÚVIDAS FREQUENTES</h2><span>+</span></summary><div className="faq-list">{questions.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></details><div className="center-action"><a className="button button-red" href="#contato">MARCAR HORÁRIO</a></div></div></section>; }
