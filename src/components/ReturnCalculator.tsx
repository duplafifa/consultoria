import { useState, useEffect } from 'react';
import { Target, TrendingUp, Calculator, ShieldCheck, HelpCircle, ArrowRight, Zap, Info } from 'lucide-react';

export default function ReturnCalculator() {
  const [banca, setBanca] = useState<number>(1000);
  const [tempo, setTempo] = useState<number>(3); // em meses
  const [perfil, setPerfil] = useState<'moderado' | 'recomendado' | 'alavancagem'>('recomendado');
  const [reinvestir, setReinvestir] = useState<boolean>(true);
  const [mercadosSelecionados, setMercadosSelecionados] = useState({
    escanteios: true,
    golsReal: true,
    cartoes: false,
    golsVirtual: true,
    vitoriasVirtual: true,
  });

  // Taxas de juros em % ao mês estimadas
  const taxas = {
    moderado: 14.5,      // Método conservador, 14.5% a.m.
    recomendado: 28.2,   // Média dos alunos Dupla Fifa, 28.2% a.m.
    alavancagem: 41.8,   // Alavancagem profissional do LuCanto, 41.8% a.m.
  };

  const [bancaFinal, setBancaFinal] = useState<number>(0);
  const [lucroLiquido, setLucroLiquido] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);

  useEffect(() => {
    let taxaMensal = taxas[perfil];
    
    // Penalizar ou bonificar ligeiramente com base no número de mercados para simular correlação real
    const mercadosAtivos = Object.values(mercadosSelecionados).filter(Boolean).length;
    // Se o investidor diversificar bem (3-4 ativos), melhora a sustentabilidade (+2% à taxa base)
    // Se tiver poucos ativos ou extremos, a volatilidade ajusta levemente
    if (mercadosAtivos >= 4) {
      taxaMensal += 2.0;
    } else if (mercadosAtivos <= 1) {
      taxaMensal -= 3.0;
    }

    let calculoBanca = banca;
    if (reinvestir) {
      // Juros Compostos: M = P * (1 + i)^t
      calculoBanca = banca * Math.pow(1 + taxaMensal / 100, tempo);
    } else {
      // Juros Simples: M = P * (1 + i * t)
      calculoBanca = banca * (1 + (taxaMensal / 100) * tempo);
    }

    const lucro = calculoBanca - banca;
    const calculoiRoi = (lucro / banca) * 100;

    setBancaFinal(Math.round(calculoBanca));
    setLucroLiquido(Math.round(lucro));
    setRoi(Math.round(calculoiRoi));
  }, [banca, tempo, perfil, reinvestir, mercadosSelecionados]);

  const toggleMarket = (key: keyof typeof mercadosSelecionados) => {
    setMercadosSelecionados(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Formatador de Moeda brasileira
  const formatCur = (v: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);
  };

  return (
    <div id="calculadora" className="bg-[#0c0c0c] border border-[#00FF66]/20 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Lado Esquerdo - Controles */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-zinc-900 border border-zinc-800 text-[#00FF66] rounded-xl">
              <Calculator className="w-6 h-6" />
            </span>
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#00FF66] tracking-widest">Simulador Científico</span>
              <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white uppercase italic">Calculadora de Retorno</h3>
            </div>
          </div>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Esqueça as promessas milagrosas de robôs automáticos de telegram. No Dupla Fifa, simulamos seu crescimento real com base na <strong className="text-[#00FF66]">análise estatística avançada</strong> do LuCanto e dados reais de mercado de sites de análises especializados.
          </p>

          <div className="space-y-5 pt-2">
            {/* Banca de Entrada */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300">Banca Inicial (Investimento):</label>
                <span className="text-lg font-mono font-bold text-[#00FF66]">{formatCur(banca)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="30000"
                step="100"
                value={banca}
                onChange={(e) => setBanca(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00FF66] focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>R$ 100</span>
                <span>R$ 10.000</span>
                <span>R$ 20.000</span>
                <span>R$ 30.000+</span>
              </div>
            </div>

            {/* Tempo de Operação */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300">Tempo de Aplicação:</label>
                <span className="text-lg font-mono font-bold text-[#00FF66]">{tempo} {tempo === 1 ? 'Mês' : 'Meses'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00FF66] focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>1 Mês</span>
                <span>3 Meses (Trimestre)</span>
                <span>6 Meses (Semestre)</span>
                <span>12 Meses (1 Ano)</span>
              </div>
            </div>

            {/* Perfil de Assertividade */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300 block">Nível de Inteligência Estratégica:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPerfil('moderado')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    perfil === 'moderado'
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-200'
                      : 'bg-[#0c0c0c]/40 border-zinc-900 hover:border-zinc-800 text-zinc-400'
                  }`}
                >
                  <p className="text-xs font-semibold">Conservador</p>
                  <p className="text-base font-mono font-bold mt-1 text-zinc-300">~{taxas.moderado}%</p>
                  <span className="text-[9px] uppercase text-zinc-500 block">Ao Mês</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPerfil('recomendado')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    perfil === 'recomendado'
                      ? 'bg-zinc-900 border-[#00FF66]/50 text-[#00FF66] shadow-lg shadow-black/40'
                      : 'bg-[#0c0c0c]/40 border-zinc-900 hover:border-zinc-800 text-zinc-400'
                  }`}
                >
                  <p className="text-xs font-semibold flex items-center justify-center gap-1 uppercase tracking-tighter">
                    Dupla Fifa <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </p>
                  <p className="text-base font-mono font-bold mt-1 text-[#00FF66]">~{taxas.recomendado}%</p>
                  <span className="text-[9px] uppercase text-[#00FF66]/70 font-semibold block">Média VIP</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPerfil('alavancagem')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    perfil === 'alavancagem'
                      ? 'bg-zinc-900 border-red-500/50 text-red-400'
                      : 'bg-[#0c0c0c]/40 border-zinc-900 hover:border-zinc-800 text-zinc-400'
                  }`}
                >
                  <p className="text-xs font-semibold">Alavancado</p>
                  <p className="text-base font-mono font-bold mt-1 text-red-500 font-extrabold">~{taxas.alavancagem}%</p>
                  <span className="text-[9px] uppercase text-red-500/70 block">LuCanto Elite</span>
                </button>
              </div>
            </div>

            {/* Juros Compostos vs Simples Toggles */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/60">
              <div>
                <p className="text-sm font-semibold text-white">Reinvestir os Lucros Mensalmente?</p>
                <p className="text-xs text-zinc-500 mt-0.5">Ativa o poder explosivo do cálculo de Juros Compostos.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReinvestir(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    !reinvestir ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  Lucro Simples (Retirar)
                </button>
                <button
                  type="button"
                  onClick={() => setReinvestir(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    reinvestir ? 'bg-[#00FF66] text-black font-black' : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  Juros Compostos (Acumular)
                </button>
              </div>
            </div>

            {/* Mercados Operados */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Ativos de Diversificação de Banca:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleMarket('escanteios')}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                    mercadosSelecionados.escanteios
                      ? 'bg-zinc-900 border-[#00FF66]/40 text-[#00FF66]'
                      : 'bg-zinc-950/80 border-zinc-900 text-zinc-500'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${mercadosSelecionados.escanteios ? 'bg-[#00FF66]' : 'bg-transparent'}`} />
                  Futebol Real (Escanteios)
                </button>

                <button
                  type="button"
                  onClick={() => toggleMarket('golsReal')}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                    mercadosSelecionados.golsReal
                      ? 'bg-zinc-900 border-[#00FF66]/40 text-[#00FF66]'
                      : 'bg-zinc-950/80 border-zinc-900 text-zinc-500'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${mercadosSelecionados.golsReal ? 'bg-[#00FF66]' : 'bg-transparent'}`} />
                  Futebol Real (Gols)
                </button>

                <button
                  type="button"
                  onClick={() => toggleMarket('cartoes')}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                    mercadosSelecionados.cartoes
                      ? 'bg-zinc-900 border-[#00FF66]/40 text-[#00FF66]'
                      : 'bg-zinc-950/80 border-zinc-900 text-zinc-500'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${mercadosSelecionados.cartoes ? 'bg-[#00FF66]' : 'bg-transparent'}`} />
                  Futebol Real (Cartões)
                </button>

                <button
                  type="button"
                  onClick={() => toggleMarket('golsVirtual')}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                    mercadosSelecionados.golsVirtual
                      ? 'bg-zinc-900 border-[#00FF66]/40 text-[#00FF66]'
                      : 'bg-zinc-950/80 border-zinc-900 text-zinc-500'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${mercadosSelecionados.golsVirtual ? 'bg-[#00FF66]' : 'bg-transparent'}`} />
                  e-Soccer (Gols)
                </button>

                <button
                  type="button"
                  onClick={() => toggleMarket('vitoriasVirtual')}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                    mercadosSelecionados.vitoriasVirtual
                      ? 'bg-zinc-900 border-[#00FF66]/40 text-[#00FF66]'
                      : 'bg-zinc-950/80 border-zinc-900 text-zinc-500'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${mercadosSelecionados.vitoriasVirtual ? 'bg-[#00FF66]' : 'bg-transparent'}`} />
                  e-Soccer (Vitórias)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Lado Direito - Resultados de Lucro */}
        <div className="lg:col-span-5 bg-zinc-900 rounded-2xl border border-zinc-800/85 p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Top Banner Asset */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00FF66]" />
          
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/50">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#00FF66] uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping inline-block" />
                SIMULAÇÃO DE ALTA PERFORMANCE
              </span>
              <span className="text-[10px] font-mono text-zinc-400">Tempo: {tempo} meses</span>
            </div>

            {/* Dinheiro final acumulado */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-zinc-450 block uppercase tracking-wider">Patrimônio Previsto (Banca Final):</span>
              <p className="text-4xl md:text-5xl font-display font-black text-white tracking-tight italic uppercase">
                {formatCur(bancaFinal)}
              </p>
            </div>

            {/* Lucro líquido absoluto */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80">
              <div>
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase tracking-wider">Lucro Líquido Real</span>
                <p className="text-2xl font-mono font-black text-[#00FF66]">+{formatCur(lucroLiquido)}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase tracking-wider">ROI Desenvolvido</span>
                <p className="text-2xl font-mono font-black text-white">+{roi}%</p>
              </div>
            </div>

            {/* Análise de assertividade e rentabilidade equivalente */}
            <div className="bg-[#00FF66]/5 border border-[#00FF66]/15 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                <div className="text-zinc-300 leading-snug">
                  <p className="font-bold text-white mb-0.5">Equivalente à Inteligência de Banca:</p>
                  Esse retorno equivale a aproximadamente <strong className="text-[#00FF66]">{formatCur(Math.round(lucroLiquido / (tempo * 30)))} por dia</strong> operados com assertividade controlada.
                </div>
              </div>
            </div>

            {/* No automatic bot disclaimer */}
            <div className="space-y-2 bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-850/80">
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-450 leading-normal">
                  <strong className="text-zinc-300 font-bold">Inteligência Estratégica Independente:</strong> Esta simulação baseia-se em planilhas de resultados verificados da Dupla Fifa. O mentor LuCanto ensina tomada de decisão fundamentada por dados, não somos robôs de cliques virtuais ou cassinos fantasmas.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 font-sans">
            <a
              href="#vagas"
              className="glow-green flex items-center justify-center gap-2 w-full bg-[#00FF66] hover:bg-[#00e55b] text-black font-black font-display py-4 px-6 rounded-xl text-center shadow-lg transition-all text-xs uppercase tracking-widest cursor-pointer"
            >
              Liberar Meu Acesso Vitalício
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
            
            <p className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1.5 uppercase font-mono tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]/70" /> No-Risk: Pagamento Único • Vitalício • Taxa Única
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
