import { Star, ShieldCheck, TrendingUp, Users, MessageSquare, Flame, Video, Coins } from 'lucide-react';
import { Testimonial } from '../types';

export default function SocialProof() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Mateus Ribeiro',
      role: 'Empresário',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      text: 'Eu cansei de comprar robô que só quebrava a minha banca. Com o LuCanto eu aprendi de verdade a ver onde tá o green em escanteio e cartão. Já fiz mais de 4 mil reais nesse mês sozinho! Só de não ter que pagar mensalidade e ter o grupo pro resto da vida já valeu cada centavo.',
      verifiedProfit: '+R$ 4.200,00',
      rating: 5,
      date: ''
    },
    {
      id: '2',
      name: 'Juliana Santos',
      role: 'Autônoma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      text: 'Sempre achei que e-Soccer era pura sorte e marmelada, mas depois que aprendi o método e a olhar os números certos, mudei de ideia. A leitura de jogo é foda! Hoje tiro uma graninha extra muito boa e o melhor: paguei uma vez só e o acesso é pra sempre.',
      verifiedProfit: '+R$ 2.950,05',
      rating: 5,
      date: ''
    },
    {
      id: '3',
      name: 'Thiago Novaes',
      role: 'Estudante de Engenharia',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      text: 'Essa mentoria é direta ao ponto! O LuCanto não fica enrolando. O grupo do Telegram é sensacional, um ajuda o outro todo dia. Recuperei o valor que paguei em menos de uma semana só operando no futebol real com o que ele ensina lá.',
      verifiedProfit: '+R$ 6.120,00',
      rating: 5,
      date: ''
    },
    {
      id: '4',
      name: 'Lucas Albuquerque',
      role: 'Investidor Privado',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      text: 'A call ao vivo no Zoom com o LuCanto é outro nível, cara. Ele faz as entradas junto com a gente colocando a grana dele também, o que dá uma moral sem tamanho. Vendo ele operar na prática eu perdi o medo e agora consigo fazer minhas próprias análises com confiança.',
      verifiedProfit: '+R$ 5.410,00',
      rating: 5,
      date: ''
    }
  ];

  return (
    <section id="depoimentos" className="space-y-16 py-8 font-sans">
      {/* Estatísticas Chave */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#0c0c0c] border border-zinc-900 p-5 rounded-2xl text-center flex flex-col justify-center items-center">
          <span className="p-2.5 bg-zinc-950/40 text-[#00FF66] rounded-xl mb-3 border border-zinc-850">
            <Users className="w-5 h-5 text-[#00FF66]" />
          </span>
          <p className="text-2xl md:text-3xl font-display font-black text-white italic">12.4K+</p>
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 mt-1 tracking-wider">Alunos no Telegram</span>
        </div>

        <div className="bg-[#0c0c0c] border border-zinc-900 p-5 rounded-2xl text-center flex flex-col justify-center items-center">
          <span className="p-2.5 bg-zinc-950/40 text-[#00FF66] rounded-xl mb-3 border border-zinc-850">
            <TrendingUp className="w-5 h-5 text-[#00FF66]" />
          </span>
          <p className="text-2xl md:text-3xl font-display font-black text-white italic">88.4%</p>
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 mt-1 tracking-wider">Assertividade Média</span>
        </div>

        <div className="bg-[#0c0c0c] border border-zinc-900 p-5 rounded-2xl text-center flex flex-col justify-center items-center">
          <span className="p-2.5 bg-zinc-950/40 text-[#00FF66] rounded-xl mb-3 border border-zinc-850">
            <MessageSquare className="w-5 h-5 text-[#00FF66]" />
          </span>
          <p className="text-2xl md:text-3xl font-display font-black text-white italic">4.9 / 5</p>
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 mt-1 tracking-wider">Satisfação Geral</span>
        </div>

        <div className="bg-[#0c0c0c] border border-zinc-900 p-5 rounded-2xl text-center flex flex-col justify-center items-center">
          <span className="p-2.5 bg-zinc-950/40 text-[#00FF66] rounded-xl mb-3 border border-zinc-850">
            <Flame className="w-5 h-5 text-red-500" />
          </span>
          <p className="text-2xl md:text-3xl font-display font-black text-red-500 italic uppercase">Taxa Única</p>
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 mt-1 tracking-wider">Acesso Vitalício</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 items-start">
        {/* Testemunhos de alunos */}
        <div className="space-y-8 max-w-7xl mx-auto w-full">
          <div className="space-y-2 text-center">
            <span className="text-xs font-mono font-bold text-[#00FF66] uppercase tracking-widest block">Histórias reais dos nossos alunos</span>
            <h3 className="text-2xl md:text-4xl font-display font-black text-white leading-tight uppercase italic animate-pulse">
              A Prova Que o Conhecimento Transforma Sorte em <span className="text-gradient">Lucro Consistente</span>
            </h3>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto">
              Confira os depoimentos enviados diretamente no nosso grupo VIP de suporte por quem parou de dar dinheiro para a casa e aprendeu a pensar como profissional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <div 
                key={test.id} 
                className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl space-y-4 relative hover:border-[#00FF66]/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={test.avatar} 
                        alt={test.name} 
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-[#00FF66]/25" 
                      />
                      <div>
                        <h5 className="font-display font-black text-zinc-100 text-sm md:text-base uppercase">{test.name}</h5>
                        <span className="text-zinc-500 text-xs font-mono">{test.role}</span>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto p-2 bg-[#00FF66]/5 rounded-xl border border-[#00FF66]/15">
                      <span className="text-[8px] text-[#00FF66]/70 uppercase tracking-widest font-black font-mono">Retorno Pago</span>
                      <strong className="text-xs md:text-sm font-mono text-[#00FF66] font-black">{test.verifiedProfit}</strong>
                    </div>
                  </div>

                  <p className="text-zinc-355 text-xs md:text-sm leading-relaxed italic font-light">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 text-xs border-t border-zinc-900/40 mt-auto">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    ))}
                    <span className="text-zinc-500 font-mono text-xs ml-1.5 font-bold">5.0</span>
                  </div>
                  <span className="text-[9px] uppercase font-mono font-black text-[#00FF66] flex items-center gap-1 bg-[#00FF66]/10 border border-[#00FF66]/20 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" /> ALUNO MATRICULADO GERAL
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Nova CTA - Mentoria Individual via Zoom com operações ao vivo */}
          <div className="mt-8 bg-gradient-to-r from-zinc-950 via-[#002f12]/40 to-zinc-950 border-2 border-[#00FF66]/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-[#00FF66]/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-900/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-[#00FF66]/15 border border-[#00FF66]/30 px-3.5 py-1 rounded-full text-[10px] md:text-xs font-mono font-black text-[#00FF66] uppercase tracking-wider">
                  <Video className="w-3.5 h-3.5 animate-pulse text-[#00FF66]" /> Mentoria Individual & Ao Vivo
                </div>
                <h4 className="text-2xl md:text-3xl font-display font-black text-white uppercase italic leading-tight">
                  Operações <span className="text-gradient">Lado a Lado</span> Via Zoom
                </h4>
                <p className="text-xs md:text-sm text-zinc-450 leading-relaxed">
                  Não ensinamos somente a teoria. Nossas sessões de mentoria são <strong className="text-white">100% individuais e realizadas via Zoom</strong>, onde abrimos o mercado em tempo real e realizamos as entradas de forma conjunta. Para garantir que cada passo seja compreendido de forma prática, <strong className="text-[#00FF66] font-semibold">o mentor realiza as entradas junto com você usando os próprios valores investidos</strong> nas operações. É aprendizado colocando também nosso risco!
                </p>
              </div>

              <div className="w-full md:w-auto shrink-0 self-stretch flex md:flex-col justify-center gap-3">
                <div className="flex-1 md:flex-none bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Coins className="w-6 h-6 text-[#00FF66] mb-2" />
                  <span className="text-[9px] uppercase font-mono font-black text-zinc-550">Compromisso</span>
                  <span className="text-xs font-bold font-mono text-white mt-0.5">Capital Alinhado</span>
                </div>
                <div className="flex-1 md:flex-none bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Video className="w-6 h-6 text-[#00FF66] mb-2" />
                  <span className="text-[9px] uppercase font-mono font-black text-zinc-550 font-bold">Aulas Zoom</span>
                  <span className="text-xs font-bold font-mono text-white mt-0.5">1-on-1 Exclusivo</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
