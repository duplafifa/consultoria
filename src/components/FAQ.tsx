import { useState } from 'react';
import { HelpCircle, Plus, Minus, CheckCircle, ShieldCheck } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'O que é a Mentoria Dupla Fifa e qual o papel do LuCanto?',
      answer: 'A Dupla Fifa é a mentoria de elite em inteligência estratégica de apostas esportivas, idealizada pelo LuCanto, maior autoridade no segmento. Diferente do mercado convencional que tenta te vender robôs de cliques fraudulentos ou falsas facilidades, o LuCanto ensina a decifrar os desvios estatísticos e padrões comportamentais ocultos por trás das tendências de alta assertividade nos mercados de futebol real e e-Soccer.'
    },
    {
      id: '2',
      question: 'Vocês vendem robôs ou softwares automáticos de apostas?',
      answer: 'NÃO! Absolutamente não. Nós repudiamos qualquer venda de falsas ilusões de enriquecimento gerado por bônus ilegais ou bots que quebram bancas em poucos dias. Nós ensinamos Inteligência Estratégica Independente. Nós utilizamos os melhores sites profissionais de análise estatística de futebol para fundamentação, e ensinamos a você a ler estes dados com eficácia para que você tenha total autonomia pelo resto da vida.'
    },
    {
      id: '3',
      question: 'A cobrança é recorrente? Vou ter de pagar mensalidades?',
      answer: 'Não. Esse é o maior diferencial financeiro do projeto: a cobrança é de taxa única e o acesso é vitalício. Você paga uma única vez e garante seu login definitivo para todos os conteúdos, todas as aulas futuras, novos modelos de análise estatística e acesso livre à comunidade VIP exclusiva do Telegram.'
    },
    {
      id: '4',
      question: 'Quais mercados específicos vocês operam na mentoria?',
      answer: 'Trabalhamos estritamente com os dois ecossistemas mais lucrativos de trading: Futebol Real (com foco absoluto nos mercados de Escanteios, Gols e Cartões) e e-Soccer (dominando os mercados de Gols e Vitórias). Ambos os mercados são explorados por meio de leituras quantitativas, estatística avançada e software profissional.'
    },
    {
      id: '5',
      question: 'Como funciona o suporte e a comunidade no Telegram?',
      answer: 'Ao efetuar sua inscrição VIP, você entra na nossa Comunidade Exclusiva do Telegram. É um ambiente fechado, seguro, com acompanhamento contínuo onde os alunos trocam análises em tempo real e o LuCanto envia direcionamentos diariamente. Você nunca operará sozinho.'
    },
    {
      id: '6',
      question: 'Consigo aplicar as estratégias se eu for iniciante absoluto?',
      answer: 'Sim! A mentoria é desenhada com uma esteira de conhecimento que vai do zero absoluto ao nível profissional. Você aprenderá como configurar suas ferramentas de análise, como realizar a gestão de banca matematicamente inquebrável, até a tomada de decisão cirúrgica de grandes operações.'
    }
  ];

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="space-y-12 font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold text-[#00FF66] uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-[#00FF66]/15">
          Dúvidas Frequentes
        </span>
        <h3 className="text-2xl md:text-4xl font-display font-black text-white uppercase italic tracking-tight">
          Respostas Sem Enrolação
        </h3>
        <p className="text-sm md:text-base text-zinc-400">
          Transparência total. Se você tem dúvidas sobre como funciona a mentoria vitalícia ou nosso ecossistema de dados, encontre as respostas rápidas abaixo.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div 
              key={item.id} 
              className={`border rounded-2xl transition-all duration-300 ${
                isOpen 
                  ? 'bg-zinc-900 border-[#00FF66]/35 shadow-lg shadow-[#00FF66]/5' 
                  : 'bg-zinc-900/40 border-zinc-850 hover:border-zinc-700'
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                className="w-full flex justify-between items-center p-5 md:p-6 text-left"
              >
                <span className="font-display font-black text-sm md:text-base text-white pr-4 uppercase italic">
                  {item.question}
                </span>
                <span className={`p-1.5 rounded-lg transition-all ${isOpen ? 'bg-[#00FF66] text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-[400px] border-t border-zinc-850' : 'max-h-0'
                }`}
              >
                <p className="p-5 md:p-6 text-zinc-400 text-xs md:text-sm leading-relaxed font-light">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#0c0c0c] border border-zinc-900 p-6 rounded-3xl max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4">
          <span className="p-3 bg-zinc-950 text-[#00FF66] rounded-2xl h-fit border border-zinc-900">
            <ShieldCheck className="w-6 h-6" />
          </span>
          <div>
            <h5 className="font-display font-black text-white text-sm md:text-base uppercase">Garantia Incondicional Dupla Fifa</h5>
            <p className="text-xs text-zinc-500 mt-1">
              Seu acesso é vitalício, assegurado e em conformidade estrita com todos os padrões de security e suporte que o LuCanto garante.
            </p>
          </div>
        </div>
        <a 
          href="#vagas" 
          className="bg-[#00FF66] hover:bg-neutral-100 text-black font-black uppercase font-mono py-3 px-5 rounded-xl text-xs whitespace-nowrap transition-all tracking-wider"
          style={{ boxShadow: '0 0 15px rgba(0, 255, 102, 0.15)' }}
        >
          Minha Vaga Vitalícia
        </a>
      </div>
    </section>
  );
}
