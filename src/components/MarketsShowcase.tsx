import { useState } from 'react';
import { ShieldCheck, Target, TrendingUp, Zap, HelpCircle, Flame, Eye, Database } from 'lucide-react';
import { MarketInfo } from '../types';

export default function MarketsShowcase() {
  const [activeMarket, setActiveMarket] = useState<'real' | 'virtual'>('real');

  const marketsList: MarketInfo[] = [
    {
      id: 'escanteios',
      name: 'Escanteios (Cantos)',
      category: 'real',
      description: 'Ensinamos o aluno a ler a estatística de pressão ofensiva e a identificar a dinâmica oculta em cada partida. Com base na nossa experiência e em nossa Metodologia, orientamos você de forma precisa a realizar a leitura de jogo em tempo real.',
      averageAssertiveness: '89.4%',
      difficulty: 'Médio',
      indicator: 'Ataques Perigosos por Minuto (APM) > 1.8'
    },
    {
      id: 'gols',
      name: 'Mercado de Gols (Over/Under)',
      category: 'real',
      description: 'Orientamos nossos alunos a decifrar dados profundos de xG (Expected Goals) e os números ocultos de recomposição tática de cada time. Unindo estatística e leitura de jogo avançada, ensinamos você a extrair padrões matemáticos com base em nossa Metodologia.',
      averageAssertiveness: '84.2%',
      difficulty: 'Médio',
      indicator: 'Mapeamento de Linha Limite • xG Acumulado > 1.4'
    },
    {
      id: 'cartoes',
      name: 'Cartões Dinâmicos',
      category: 'real',
      description: 'Ensinamos você a cruzar estatística rigorosa sobre o perfil do árbitro com a agressividade das equipes. Nossa experiência de mercado e Metodologia exclusiva orientam o aluno na leitura de jogo precisa para dominar estes padrões.',
      averageAssertiveness: '87.1%',
      difficulty: 'Alto',
      indicator: 'Média do Árbitro > 5.5 Cartões por Jogo'
    },
    {
      id: 'gols_virtual',
      name: 'e-Soccer: Gols (Over 1.5 e 2.5)',
      category: 'virtual',
      description: 'As partidas de e-Soccer seguem modelos computacionais cíclicos. Com nossa experiência na leitura de jogo, ensinamos o mapeamento estatístico dessas tabelas e a Metodologia completa para rastrear os números ocultos.',
      averageAssertiveness: '91.3%',
      difficulty: 'Baixo',
      indicator: 'Mapeamento de Círculos de Retenção de Software'
    },
    {
      id: 'vitorias_virtual',
      name: 'e-Soccer: Vitórias (Ambas Marcam & Rescisão)',
      category: 'virtual',
      description: 'Orientamos nossos alunos no mapeamento de tabelas de estatística e nos números ocultos por trás do e-Soccer. Domine a Metodologia e melhore sua leitura de jogo aplicando nossa experiência consolidada.',
      averageAssertiveness: '85.9%',
      difficulty: 'Médio',
      indicator: 'Análise de Histórico de Quadrantes (M20/H1)'
    }
  ];

  const filteredMarkets = marketsList.filter(m => m.category === activeMarket);

  return (
    <section id="mercados" className="space-y-10 py-4 font-sans">
      {/* Disclaimer de Inteligência */}
      <div className="bg-[#0c0c0c] border border-[#00FF66]/15 p-5 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF66]/5 rounded-full blur-2xl" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/25 px-2.5 py-1 rounded">
              DIFERENCIAL SUPREMO
            </span>
            <h4 className="text-xl md:text-2xl font-display font-black text-white italic uppercase tracking-tight">
              NÃO vendemos ferramentas de apostas ou robôs automatizados!
            </h4>
            <p className="text-xs md:text-sm text-zinc-400 max-w-3xl leading-relaxed">
              O maior mentira do marketing esportivo atual é te vender um robô mágico que clica sozinho. 
              <strong> Nós entregamos Orientação de Inteligência Estratégica.</strong> Ensinamos você a usar sites profissionais de análise estatística, interpretar as probabilidades reais de forma independente e maximizar resultados com controle emocional absoluto.
            </p>
          </div>
          <div className="bg-zinc-950 p-4 border border-zinc-850 rounded-2xl flex flex-col items-center justify-center shrink-0 w-36 text-center">
            <Database className="w-8 h-8 text-[#00FF66] mb-2" />
            <span className="text-[10px] text-zinc-550 uppercase font-mono block">Fundamentado por:</span>
            <strong className="text-xs text-zinc-200 mt-1 uppercase font-black">Análise de Dados</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lado Esquerdo - Mercado Switchers e Titulo */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#00FF66] uppercase tracking-widest block">Estatística e Padrões Ocultos</span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white leading-tight uppercase">
              A Geometria Das <br />
              <span className="text-gradient">Probabilidades Vencedoras</span>
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              Operamos apenas nos mercados que oferecem desvios estatísticos de grande valor matemática. Selecione a modalidade para visualizar os detalhes:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#000] border border-zinc-900 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveMarket('real')}
              className={`py-3.5 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeMarket === 'real'
                  ? 'bg-[#00FF66] text-black shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              Futebol Real ⚽
            </button>
            <button
              type="button"
              onClick={() => setActiveMarket('virtual')}
              className={`py-3.5 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeMarket === 'virtual'
                  ? 'bg-[#00FF66] text-black shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              e-Soccer 🎮
            </button>
          </div>

          <div className="bg-zinc-900/20 border border-zinc-850 p-4.5 rounded-2xl space-y-3.5">
            <h5 className="font-display font-black text-white text-xs uppercase tracking-wider text-[#00FF66]">
              {activeMarket === 'real' ? '🎯 Foco do Futebol Real' : '⚡ Foco do e-Soccer'}
            </h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {activeMarket === 'real' 
                ? 'Operações fundamentadas em dados reais de confrontos humanos. Levamos em conta estatística, variações de clima, desgaste de elencos e leitura de jogo.'
                : 'Operações focadas em decifrar os desvios e algoritmos gerados pelas maiores ligas de e-Soccer do mundo. Desvendamos estes padrões estatísticos através de nossa Metodologia.'}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#00FF66]/80 font-bold font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#00FF66]" />
              Análise Estatística {activeMarket === 'real' ? 'Real' : 'e-Soccer'} • LuCanto
            </div>
          </div>
        </div>

        {/* Lado Direito - Cards do Mercado */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMarkets.map((market, index) => {
            const isLastOfOdd = index === filteredMarkets.length - 1 && filteredMarkets.length % 2 !== 0;
            return (
              <div 
                key={market.id} 
                className={`bg-zinc-900/40 border border-zinc-850 hover:border-[#00FF66]/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-[#00FF66]/5 transition-all duration-300 relative group ${
                  isLastOfOdd ? 'md:col-span-2' : ''
                }`}
              >
                {/* Target glow effect */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00FF66] transition-all opacity-40 group-hover:opacity-100 group-hover:scale-125" />

                <div className="space-y-3.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#00FF66] font-bold uppercase block bg-[#00FF66]/10 border border-[#00FF66]/20 px-2 py-0.5 rounded w-fit">
                    Assertividade Ideal: {market.averageAssertiveness}
                  </span>

                  <h4 className="font-display font-black text-white text-base md:text-lg uppercase">
                    {market.name}
                  </h4>

                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                    {market.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-850 grid grid-cols-2 gap-3 text-[11px] font-mono">
                  <div>
                    <span className="text-zinc-500 block uppercase text-[9px] tracking-wide">Indicador Alvo:</span>
                    <span className="font-bold text-zinc-350 text-xs truncate block">{market.indicator}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[9px] tracking-wide">Risco:</span>
                    <span className={`font-bold text-xs flex items-center gap-1 mt-0.5 uppercase ${
                      market.difficulty === 'Baixo' ? 'text-[#00FF66]' :
                      market.difficulty === 'Médio' ? 'text-amber-400' : 'text-rose-500'
                    }`}>
                      <Target className="w-3.5 h-3.5" />
                      {market.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
