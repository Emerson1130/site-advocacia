import { Menu, X } from 'lucide-react';
import { useDisclosure } from '@/hooks/use-disclosure';

const links = [['#inicio', 'ATENDIMENTOS'], ['#atuacao', 'BENEFÍCIOS'], ['#processo', 'PASSO A PASSO'], ['#depoimentos', 'DEPOIMENTOS'], ['#sobre', 'QUEM SOU'], ['#duvidas', 'DÚVIDAS']];
export function SiteHeader() {
  const menu = useDisclosure();
  return <><div className="announcement"><span>MARQUE SUA CONSULTA MARQUE SUA CONSULTA MARQUE SUA CONSULTA MARQUE SUA ANÁLISE</span></div><header className="site-header"><a href="#inicio" className="brand" aria-label="Elisiane Romualdo, início"><img src="/reference/logo-header.png" alt="Elisiane Romualdo Advogada" /></a><nav className="desktop-nav" aria-label="Navegação principal">{links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav><button className="menu-trigger" {...menu.triggerProps} aria-label={menu.isOpen ? 'Fechar menu' : 'Abrir menu'}>{menu.isOpen ? <X /> : <Menu />}</button>{menu.isOpen && <nav {...menu.panelProps} className="mobile-nav" aria-label="Navegação no celular">{links.map(([href, label]) => <a href={href} key={href} onClick={menu.close}>{label}</a>)}<a href="#contato" onClick={menu.close}>CONTATO</a></nav>}</header></>;
}
