import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Smartphone, AlertTriangle, Send, Sparkles } from 'lucide-react';

interface MentorshipOfferProps {
  spotsLeft?: number;
}

export default function MentorshipOffer({ spotsLeft: propsSpotsLeft }: MentorshipOfferProps) {
  const getDynamicSpots = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    const startMinutes = 9 * 60; // 09:00 AM
    const endMinutes = 22 * 60;   // 22:00 PM (10:00 PM)
    
    if (totalMinutes < startMinutes) {
      return 13;
    } else if (totalMinutes >= endMinutes) {
      return 2;
    } else {
      const elapsed = totalMinutes - startMinutes;
      const duration = endMinutes - startMinutes;
      const ratio = elapsed / duration;
      const rawSpots = 13 - (ratio * 11);
      const spots = Math.ceil(rawSpots);
      return Math.max(2, spots);
    }
  };

  const [localSpots, setLocalSpots] = useState<number>(getDynamicSpots());

  useEffect(() => {
    if (propsSpotsLeft !== undefined) return;
    const interval = setInterval(() => {
      setLocalSpots(getDynamicSpots());
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [propsSpotsLeft]);

  const spotsLeft = propsSpotsLeft !== undefined ? propsSpotsLeft : localSpots;

  return (
    <section id="vagas" className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3 font-sans">
        <span className="text-[10px] font-mono font-black text-[#00FF66] uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-[#00FF66]/15">
          CONDIÇÃO ÚNICA & VITALÍCIA
        </span>
        <h3 className="text-2xl md:text-4xl font-display font-black text-white uppercase italic tracking-tight">
          Sua Transição para o <span className="text-[#00FF66]">Time Profissional</span>
        </h3>
        <p className="text-sm md:text-base text-zinc-400">
          Chega de sustentar o faturamento gerado por cassinos online e robôs que te manipulam. Garanta sua vaga com taxa única vitalícia agora.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto font-sans">
        {/* Antigo Caminho / Fraude Comercial */}
        <div className="lg:col-span-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h4 className="font-display font-black text-sm md:text-base uppercase text-zinc-200">A Armadilha Comum</h4>
            </div>
            
            <p className="text-xs text-zinc-500 leading-relaxed">
              O mercado de apostas está lotado de mentiras automatizadas projetadas para liquidar sua banca:
            </p>

            <ul className="space-y-3.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                <span><strong>Mensalidades Abusivas:</strong> Cobranças recorrentes todo mês que pesam na sua banca.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                <span><strong>Robôs Cegos:</strong> Algoritmos automáticos falsos que operam sem critérios.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                <span><strong>Suporte Inexistente:</strong> Ninguém para te orientar nas maiores perdas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                <span><strong>Cassinos Favorecidos:</strong> Links de afiliação que lucram com seu prejuízo.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-zinc-900/60">
            <p className="text-[10px] text-zinc-650 uppercase font-mono tracking-wider text-center">
              FUJA DO MÉTODO QUE TE QUEBRA
            </p>
          </div>
        </div>

        {/* Proposta Nobre e Suprema - Dupla Fifa */}
        <div className="lg:col-span-7 bg-[#0c0c0c] border-2 border-[#00FF66]/80 p-6 md:p-10 rounded-3xl space-y-8 relative shadow-2xl shadow-[#00FF66]/5 flex flex-col justify-between overflow-hidden">
          {/* Badge de Oferta de Valor */}
          <div className="absolute top-0 right-0 bg-[#00FF66] text-black px-6 py-1.5 font-display font-black text-xs uppercase tracking-wider rounded-bl-2xl">
            VAGAS ELITE LIMITADAS
          </div>

          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#00FF66] uppercase tracking-widest block">O Portal de Inteligência</span>
              <h4 className="text-xl md:text-2xl font-display font-black text-white flex items-center gap-2 uppercase italic">
                Domínio com a Dupla Fifa <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
              </h4>
            </div>

            <ul className="space-y-4 text-xs md:text-sm text-zinc-350">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-bold">Pagamento Único & Sem Mensalidades:</strong> Pague apenas uma taxa única e garanta acesso definitivo de graça para sempre. Sem juros recorrentes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-bold">Mentor Oficial LuCanto:</strong> Acompanhamento direto da maior autoridade em inteligência de dados esportivos.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-bold">Comunidade VIP no Telegram:</strong> Exclusividade completa para debates, relatórios ao vivo e acompanhamento contínuo em ambiente criptografado e seguro.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-bold">Ecossistema Profissional Real & e-Soccer:</strong> Métodos refinados baseados em estatística para Escanteios, Gols e Cartões (Real) e Gols e Vitórias (e-Soccer) unindo leitura de jogo e nossa experiência.
                </span>
              </li>
            </ul>

            {/* Price Hidden with locked placeholder */}
            <div className="bg-[#000] border border-zinc-900 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#00FF66]" />
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
                  <span className="text-[10px] font-mono font-bold uppercase text-[#00FF66] tracking-wider">
                    {spotsLeft > 0 ? `Últimas ${spotsLeft} Vagas no Lote Especial` : 'Lote Especial Esgotado - Fila de Espera'}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 uppercase font-mono tracking-widest">Valor do Acesso Vitalício</p>
                <p className="text-lg md:text-xl font-display font-black text-white flex items-center gap-2 tracking-tight">
                  <Lock className="w-4 h-4 text-[#00FF66] shrink-0" /> PROTEGIDO & EXCLUSIVO
                </p>
              </div>

              <div className="text-right w-full sm:w-auto">
                <span className="block text-[9px] text-zinc-500 uppercase font-mono">Taxa única disponível no canal:</span>
                <span className="inline-block px-3 py-1.5 bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/25 text-xs font-black rounded-lg uppercase tracking-wider mt-1 font-mono">
                  Taxa Única Sem Recorrência
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* The Ultimate CTA connecting to Telegram */}
            <a
              href="https://t.me/+iQL8Cra9Dso3NDlh" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#00FF66] hover:bg-neutral-100 text-black font-black font-display py-4 md:py-5 px-6 rounded-2xl text-center shadow-lg transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer"
              style={{ boxShadow: '0 0 20px rgba(0, 255, 102, 0.25)' }}
            >
              <Send className="w-4 h-4 text-black fill-black shrink-0" />
              REVELAR VALOR DA TAXA ÚNICA & GARANTIR MINHA VAGA NO TELEGRAM VIP
              <ArrowRight className="w-4 h-4 text-black shrink-0" />
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] text-zinc-500 font-mono tracking-wider">
              <span className="flex items-center gap-1 text-[#00FF66]/80 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> AMBIENTE TOTALMENTE SEGURO DE SUPORTE
              </span>
              <span className="hidden sm:inline text-zinc-800">•</span>
              <span className="flex items-center gap-1 uppercase">
                <Smartphone className="w-3.5 h-3.5 text-zinc-600" /> COMPATÍVEL COM COMPUTADOR E CELULAR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
