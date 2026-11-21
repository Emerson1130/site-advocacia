import { ArrowRight } from 'lucide-react';
import { steps } from '@/data/services';
export function Process() {
  return <section id="processo" className="section process-section"><div className="section-inner"><h2>PASSO A PASSO DO PROCESSO</h2><div className="process-steps">{steps.map((step, index) => <div className="process-step" key={step.number}><div className="step-top"><span>{step.number}</span>{index < steps.length - 1 && <ArrowRight size={20} />}</div><h3>{step.title}</h3></div>)}</div></div></section>;
}
