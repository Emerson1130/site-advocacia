import { Menu, X } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useDisclosure } from '@/hooks/use-disclosure';

const links = [
  ['#inicio', 'ATENDIMENTOS'],
  ['#atuacao', 'BENEFÍCIOS'],
  ['#processo', 'PASSO A PASSO'],
  ['#depoimentos', 'DEPOIMENTOS'],
  ['#sobre', 'QUEM SOU'],
  ['#duvidas', 'DÚVIDAS'],
];

export function SiteHeader() {
  const menu = useDisclosure();

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    if (href === '#duvidas') target.querySelector('details.faq-outer')?.setAttribute('open', '');
    if (window.location.hash !== href) window.history.pushState(null, '', href);
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  return <>
    <div className="announcement"><span>MARQUE SUA CONSULTA MARQUE SUA CONSULTA MARQUE SUA CONSULTA MARQUE SUA ANÁLISE</span></div>
    <header className="site-header">
      <div className="header-inner">
        <a href="#inicio" className="brand" aria-label="Elisiane Romualdo, início" onClick={event => navigateToSection(event, '#inicio')}><img src="/reference/logo.svg" alt="Elisiane Romualdo Advogada" /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([href, label]) => <a href={href} key={href} onClick={event => navigateToSection(event, href)}>{label}</a>)}
        </nav>
        <button className="menu-trigger" {...menu.triggerProps} aria-label={menu.isOpen ? 'Fechar menu' : 'Abrir menu'}>{menu.isOpen ? <X /> : <Menu />}</button>
        {menu.isOpen && <nav {...menu.panelProps} className="mobile-nav" aria-label="Navegação no celular">
          {links.map(([href, label]) => <a href={href} key={href} onClick={event => { navigateToSection(event, href); menu.close(); }}>{label}</a>)}
          <a href="#contato" onClick={event => { navigateToSection(event, '#contato'); menu.close(); }}>CONTATO</a>
        </nav>}
      </div>
    </header>
  </>;
}
