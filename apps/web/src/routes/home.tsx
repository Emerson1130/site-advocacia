import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { site } from '@/constants/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/home/hero';
import { About } from '@/components/home/about';
import { Services } from '@/components/home/services';
import { Comparison } from '@/components/home/comparison';
import { Process } from '@/components/home/process';
import { Testimonials } from '@/components/home/testimonials';
import { Faq } from '@/components/home/faq';
import { Contact } from '@/components/home/contact';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Dra. Elisiane Romualdo | Advocacia Previdenciária', description: 'Orientação jurídica previdenciária com atendimento humanizado para você e sua família. Conheça os benefícios e entre em contato.', image: site.officeImage, jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, inLanguage: 'pt-BR' }, { '@context': 'https://schema.org', '@type': 'LegalService', name: 'Dra. Elisiane Romualdo', description: 'Advocacia previdenciária e orientação sobre benefícios do INSS.' }] }); }
export default function HomePage() { return <><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><SiteHeader /><main id="conteudo"><Hero /><Services /><Comparison /><Process /><Testimonials /><About /><Faq /><Contact /></main><SiteFooter /></>; }
