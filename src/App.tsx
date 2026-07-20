/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Send, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  CheckCircle, 
  Compass, 
  Activity, 
  ChevronRight, 
  AlertCircle, 
  ArrowRight, 
  Star, 
  Volume2, 
  Menu, 
  X,
  Lock,
  Instagram,
  Youtube,
  LogOut
} from 'lucide-react';

import MarketsShowcase from './components/MarketsShowcase';
import ReturnCalculator from './components/ReturnCalculator';
import SocialProof from './components/SocialProof';
import MentorSection from './components/MentorSection';
import MentorshipOffer from './components/MentorshipOffer';
import AcademySection from './components/AcademySection';
import CourseDetail from './components/CourseDetail';
import StudentProfile from './components/StudentProfile';
import AdminDashboard from './components/AdminDashboard';
import LmsShell from './components/LmsShell';
import AuthModal from './components/AuthModal';
import FAQ from './components/FAQ';
import Auth from './components/Auth';
import { Course } from './types';
import { useAuth } from './context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

// Helper functions and constants
interface CustomNotification {
  type: 'standard' | 'vitalicia';
  message: string;
  tag: string;
}

const getCountdownTo18 = () => {
  const now = new Date();
  const target = new Date();
  target.setHours(18, 0, 0, 0);
  
  if (now.getTime() >= target.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  
  const diffMs = target.getTime() - now.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);
  
  return { hours, minutes, seconds };
};

const getInitialSpots = () => {
  const stored = localStorage.getItem('duplafifa_spots_left');
  if (stored) {
    const parsed = parseInt(stored, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  
  const startMinutes = 9 * 60;
  const endMinutes = 22 * 60;
  
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

const notificationsList = [
  "Carlos H. de São Paulo garantiu vaga vitalícia ✅",
  "Juliana M. de Porto Alegre ativou o acesso VIP ✅",
  "Guto R. acabou de entrar no Telegram Dupla Fifa ✅",
  "Lucas S. simulou e garantiu acesso com o LuCanto ✅",
  "Vinícius P. de Belo Horizonte liberou o lote vitalício ✅"
];

const footballFanNames = [
  "Thiago 'Artilheiro do Chute a Gol' Silva ⚽",
  "Rodrigo 'Louco Pelo Timão' Almeida ⚽",
  "Marcos 'Mito do Cartola FC' Oliveira ⚽",
  "Gabriel 'Sócio Arquibancada VIP' Santos ⚽",
  "Felipe 'Fanático do Allianz' Costa ⚽",
  "Xande 'Geral do Grêmio' Souza ⚽",
  "Igor 'Voto de Confiança no VAR' Pereira ⚽",
  "Lucas 'Camisa 10 do Racha' Lima ⚽",
  "Neto 'Comentarista de Sofá' Ribeiro ⚽",
  "Vini 'Rei do e-Soccer' Martins ⚽",
  "Dudu 'Manto Sagrado' Carvalho ⚽",
  "Zeca 'Churrasco & Premiere Esportes' Ramos ⚽",
  "Beto 'Fanático da Colina' Guedes ⚽",
  "Afonso 'Sócio Torcedor Vitalício' Barbosa ⚽",
  "Renato 'Cruzador de Escanteio' Mendes ⚽",
  "Matheus 'Fiel Louco do Bando' Pinto ⚽",
  "Bruno 'Arquibancada e Cerveja' Ferreira ⚽",
  "Daniel 'Oito e Meia do Racha' Cardoso ⚽",
  "Rafa 'Olheiro Oficial da Rodada' Teixeira ⚽",
  "Guto 'Fanático Tricolor Paulista' Moraes ⚽",
  "Henrique 'Gênio dos Dados Esportivos' Castro ⚽",
  "Tito 'Estrela das Ligas VIP' Azevedo ⚽",
  "Eduardo 'Louco da Geral' Barros ⚽",
  "Otávio 'Coronel do Cartola' Neves ⚽",
  "Caio 'Fanático por Escanteios' Faria ⚽"
];

export default function App() {
  console.log("App component rendered");
  const { user, role, loading, error } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [view, setView] = useState<'home' | 'admin' | 'studentProfile' | 'lms'>('home');
  const [timeLeft, setTimeLeft] = useState(getCountdownTo18());
  const [spotsLeft, setSpotsLeft] = useState<number>(getInitialSpots());
  const [recentNotification, setRecentNotification] = useState<CustomNotification | null>(null);

  const handleLmsAccess = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setView('lms');
    }
    setMobileMenuOpen(false);
  };

  const triggerStandardNotification = () => {
    const randomText = notificationsList[Math.floor(Math.random() * notificationsList.length)];
    setRecentNotification({
      type: 'standard',
      tag: 'Inscrição Confirmada VIP',
      message: randomText
    });
    
    setTimeout(() => {
      setRecentNotification(null);
    }, 5000);
  };

  const triggerVitaliciaPurchase = () => {
    const randomFan = footballFanNames[Math.floor(Math.random() * footballFanNames.length)];
    
    setSpotsLeft((prev) => {
      const nextSpots = Math.max(2, prev - 1);
      localStorage.setItem('duplafifa_spots_left', nextSpots.toString());
      return nextSpots;
    });

    localStorage.setItem('duplafifa_last_purchase', Date.now().toString());

    setRecentNotification({
      type: 'vitalicia',
      tag: '🏆 COMPRA VAGA VITALÍCIA',
      message: `🎉 ${randomFan} acabou de adquirir seu Acesso Vitalício! ⚡`
    });

    setTimeout(() => {
      setRecentNotification(null);
    }, 7000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdownTo18());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const initialTimeout = setTimeout(triggerStandardNotification, 3000);
    const interval = setInterval(triggerStandardNotification, 20000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const nowMs = Date.now();
    const lastTimestamp = localStorage.getItem('duplafifa_last_purchase');
    const intervalMs = 45 * 60 * 1000;
    
    if (lastTimestamp) {
      const lastTime = parseInt(lastTimestamp, 10);
      if (!isNaN(lastTime)) {
        const elapsedMs = nowMs - lastTime;
        if (elapsedMs >= intervalMs) {
          const finishedPeriods = Math.floor(elapsedMs / intervalMs);
          setSpotsLeft((prev) => {
            const nextSpots = Math.max(2, prev - finishedPeriods);
            localStorage.setItem('duplafifa_spots_left', nextSpots.toString());
            return nextSpots;
          });
          const updatedLastTime = lastTime + (finishedPeriods * intervalMs);
          localStorage.setItem('duplafifa_last_purchase', updatedLastTime.toString());
        }
      }
    } else {
      localStorage.setItem('duplafifa_last_purchase', nowMs.toString());
    }

    const demoTimeout = setTimeout(() => {
      const alreadyShownInSession = sessionStorage.getItem('duplafifa_demo_shown');
      if (!alreadyShownInSession) {
        triggerVitaliciaPurchase();
        sessionStorage.setItem('duplafifa_demo_shown', 'true');
      }
    }, 8000);

    const realTimeCheckInterval = setInterval(() => {
      const currentNowMs = Date.now();
      const currentLastTimestamp = localStorage.getItem('duplafifa_last_purchase');
      if (currentLastTimestamp) {
        const currentLastTime = parseInt(currentLastTimestamp, 10);
        if (!isNaN(currentLastTime) && currentNowMs - currentLastTime >= intervalMs) {
          triggerVitaliciaPurchase();
        }
      }
    }, 30000);

    return () => {
      clearTimeout(demoTimeout);
      clearInterval(realTimeCheckInterval);
    };
  }, []);

  if (loading) return <div className="text-white text-center p-20">Carregando...</div>;
  if (error) return <div className="text-red-500 text-center p-20">{error}</div>;

  // Scroll suave com ID
  const scrollToId = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070b0d] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950 overflow-x-hidden antialiased">
      {/* Top Banner de Urgência de Lote */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-750 text-white text-[10px] sm:text-xs md:text-sm py-2 px-4 text-center font-display font-bold flex items-center justify-center gap-2 relative z-[999]">
        <span className="w-2.5 h-2.5 bg-zinc-950 rounded-full animate-ping shrink-0" />
        <span>ATENÇÃO: Taxa Única Vitalícia disponível apenas para as últimas vagas. O Lote Expira em</span>
        <span className="bg-zinc-950/40 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/20 font-black">
          {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Header Fixo */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#070b0d]/90 border-b border-zinc-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Badge da Dupla Fifa */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 p-[1.5px] shadow-lg shadow-emerald-500/10">
              <div className="w-full h-full bg-[#070b0d] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-emerald-400 text-lg tracking-tighter">DF</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border border-[#070b0d] rounded-full" />
            </div>
            <div>
              <span className="text-sm font-display font-black tracking-widest text-zinc-100 block uppercase">DUPLA FIFA</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-400 uppercase block -mt-1">Inteligência Esportiva</span>
            </div>
          </div>

          {/* Menu de Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <button onClick={() => { setView('home'); scrollToId('mercados'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">Mercados</button>
            <button onClick={() => { setView('home'); scrollToId('calculadora'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">Análise & ROI</button>
            <button onClick={() => { setView('home'); scrollToId('academia'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">Academia</button>
            <button onClick={() => { setView('home'); scrollToId('depoimentos'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">Prova Social</button>
            <button onClick={() => { setView('home'); scrollToId('mentor'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">O Mentor</button>
            {role === 'student' && (
              <button onClick={() => setView('studentProfile')} className="hover:text-emerald-400 transition-colors cursor-pointer">Meu Perfil</button>
            )}
            {role === 'admin' && (
              <button onClick={() => setView('admin')} className="hover:text-emerald-400 transition-colors cursor-pointer">Admin</button>
            )}
          </nav>

          {/* CTA Header */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <button 
                onClick={() => signOut(auth)}
                className="p-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-all"
              >
                Login/Cadastro
              </button>
            )}
            <button 
              onClick={() => scrollToId('vagas')}
              className="px-5 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              Exclusivo Telegram
            </button>
          </div>

          {/* Menu Botão Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070b0d] border-b border-zinc-900 px-4 py-6 space-y-4 font-display font-bold text-sm uppercase tracking-wider">
            <button onClick={() => scrollToId('mercados')} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Mercados Operados</button>
            <button onClick={() => scrollToId('calculadora')} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Calculadora de Retorno</button>
            <button onClick={() => scrollToId('academia')} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Academia</button>
            <button onClick={() => scrollToId('depoimentos')} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Prova Social & Depoimentos</button>
            <button onClick={() => scrollToId('mentor')} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Sobre o LuCanto</button>
            <button onClick={() => scrollToId('faq')} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Dúvidas Comuns</button>
            <button onClick={handleLmsAccess} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Ambiente LMS</button>
            {role === 'admin' && (
              <button onClick={() => { setView('admin'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-zinc-400 hover:text-emerald-400">Painel Admin</button>
            )}
            <div className="pt-4 border-t border-zinc-900">
              <button 
                onClick={() => scrollToId('vagas')} 
                className="w-full bg-emerald-500 text-zinc-950 text-center py-3.5 rounded-xl font-bold text-xs uppercase"
              >
                Garantir Acesso Vitalício
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION DE IMPACTO AGRESSIVO */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-zinc-900/40">
        
        {/* Glow de fundo esportivo verde */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Tagline superior */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/20 rounded-full">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              SISTEMA DE ANÁLISE QUANTITATIVA • VITALÍCIO & PAGAMENTO ÚNICO
            </span>
          </div>

          {/* Título Principal Agressivo feito por Especialista em Marketing */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.1] uppercase">
              Pare de quebrar sua banca! <br />
              <span className="text-[#00FF66]">Aprenda a Pensar</span> como os grandes tipsters!
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              O principal segredo do mercado revelado pelo nosso tipster <strong className="text-white font-medium">LuCanto</strong>. Desenvolva autonomia, inteligência e leitura de jogo para operar com consistência em mercados de futebol real e e-Soccer baseando-se estritamente em nossa experiência, Metodologia exclusiva e estatística de valor, por meio de uma taxa única sem assinatura recorrente.
            </p>
          </div>

          {/* CTAs do Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => scrollToId('vagas')}
              className="glow-green w-full sm:w-auto px-8 py-4.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              Liberar Vaga VIP
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
            
            <button
              onClick={() => scrollToId('calculadora')}
              className="w-full sm:w-auto px-8 py-4.5 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 rounded-xl font-display font-bold text-xs md:text-sm uppercase tracking-wider transition-all text-center cursor-pointer"
            >
              Simular Meu Potencial ROI
            </button>
          </div>

          {/* Principais Provas das Características Diferenciais (3 Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-xs md:text-sm font-sans border-t border-zinc-900/65 max-w-5xl mx-auto">
            <div className="flex gap-3">
              <span className="p-2 bg-emerald-955 text-emerald-400 rounded-lg h-fit border border-emerald-500/10">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white uppercase text-xs tracking-wider">Acesso 100% Vitalício</h3>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">Pague o acesso apenas uma vez. Use o ecossistema, participe da comunidade e assista às mentorias sem cobranças futuras.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="p-2 bg-emerald-955 text-emerald-400 rounded-lg h-fit border border-emerald-500/10">
                <Send className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white uppercase text-xs tracking-wider">Comunidade VIP no Telegram</h3>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">Canal fechado e monitorado, onde você opera integrado com outros alunos de alta performance e recebe suporte diário.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="p-2 bg-zinc-955 text-emerald-400 rounded-lg h-fit border border-emerald-500/10">
                <TrendingUp className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white uppercase text-xs tracking-wider">Modelagem de Padrões</h3>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">Operações fundamentadas estritamente em desvios estatísticos frios e ciclos matemáticos identificados em plataformas parceiras.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CONTAINER PRINCIPAL */}
      {view === 'admin' ? (
        <AdminDashboard onBack={() => setView('home')} />
      ) : view === 'lms' ? (
        <LmsShell onBack={() => setView('home')} />
      ) : view === 'studentProfile' ? (
        <StudentProfile />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32 pt-24">
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
          
          {/* SECTION 1: MERCADOS OPERADOS & SHOWCASE */}
          <section id="mercados" className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/10">
                Onde Operamos
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase">
                Mercados Selecionados
              </h2>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                Trabalhamos cirurgicamente nos ecossistemas com as maiores assimetrias matemáticas de probabilidade para maximizar seus ganhos de trading com segurança.
              </p>
            </div>
  
            <MarketsShowcase />
          </section>
  
          {/* SECTION 2: CALCULADORA DE RETORNO */}
          <section id="calculadora" className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/10">
                ROI & Performance
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase">
                Simular Meu Potencial de Lucros
              </h2>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                Descubra por meio de dados reais de performance como sua banca pode crescer de forma exponencial aplicando inteligência estratégica e juros compostos.
              </p>
            </div>
  
            <ReturnCalculator />
          </section>
  
          {/* SECTION 3: PROVA SOCIAL ROBUSTA */}
          <section id="depoimentos" className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/10">
                Resultados de Alunos
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase">
                Comprovado Em Resultados
              </h2>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                Pessoas de todo o país que pararam de agir como amadores e aprenderam a operar baseados em dados reais.
              </p>
            </div>
  
            <SocialProof />
          </section>
  
          {/* SECTION 4: O MENTOR LUCANTO */}
          <section id="mentor" className="space-y-6">
            <MentorSection />
          </section>
  
          {/* SECTION 5: VALORES & COMPRAS VITALÍCIAS */}
          <section id="vagas" className="space-y-6">
            <MentorshipOffer spotsLeft={spotsLeft} />
          </section>
  
          {/* SECTION 6: ACADEMIA DUPLA FIFA */}
          <AcademySection onSelectCourse={setActiveCourse} />
  
          {activeCourse && (
            <CourseDetail course={activeCourse} onClose={() => setActiveCourse(null)} />
          )}
  
          {/* SECTION 7: FAQ ACCORDION COMPLETO */}
          <section id="faq" className="space-y-6">
            <FAQ />
          </section>
  
        </main>
      )}

      {/* FOOTER PREMIUM COM AVISO DE JOGO RESPONSÁVEL E LEGALIDADE */}
      <footer className="bg-[#000000] border-t border-zinc-900 py-16 text-xs text-zinc-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Lado Esquerdo Footer */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <span className="font-display font-black text-[#00FF66] text-sm tracking-tighter">DF</span>
                </div>
                <div>
                  <span className="font-display font-black text-zinc-200 uppercase tracking-wider block">DUPLA FIFA</span>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase block -mt-1">Orientação de Inteligência Estratégica</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed max-w-sm">
                A Dupla Fifa é constituída exclusivamente por serviços educacionais e estudos de probabilidades quantitativas. Nós não somos operadores financeiros, cassinos de azar ou desenvolvedores de robôs de apostas.
              </p>
              
              <div className="space-y-2 pt-2">
                <h6 className="text-[10px] uppercase tracking-wider font-bold text-zinc-450 font-mono">Nossas Redes</h6>
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="https://instagram.com/duplafifa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-[#00FF66] transition-all duration-300"
                    title="Instagram @duplafifa"
                  >
                    <Instagram className="w-4 h-4 text-zinc-400 hover:text-[#00FF66]" />
                    <span className="text-[11px] font-mono">@duplafifa</span>
                  </a>
                  <a 
                    href="https://youtube.com/@duplafifa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-[#00FF66] transition-all duration-300"
                    title="YouTube duplafifa"
                  >
                    <Youtube className="w-4 h-4 text-zinc-400 hover:text-[#00FF66]" />
                    <span className="text-[11px] font-mono">duplafifa</span>
                  </a>
                  <a 
                    href="https://t.me/+iQL8Cra9Dso3NDlh" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-[#00FF66] hover:text-black hover:bg-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/20 px-2.5 py-1 rounded-lg transition-all duration-300 font-bold"
                    title="Telegram Grupo Free"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Telegram Free</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-display font-black text-zinc-300 uppercase tracking-wider text-xs">Acesso Rápido</h5>
              <ul className="space-y-2 text-[11px] text-zinc-400">
                <li><button onClick={() => scrollToId('mercados')} className="hover:text-[#00FF66] transition-colors">Mercados Futebol Real e e-Soccer</button></li>
                <li><button onClick={() => scrollToId('calculadora')} className="hover:text-[#00FF66] transition-colors">Calculadora de Lucros e ROI</button></li>
                <li><button onClick={() => scrollToId('depoimentos')} className="hover:text-[#00FF66] transition-colors">Depoimentos Verificados</button></li>
                <li><button onClick={() => scrollToId('mentor')} className="hover:text-[#00FF66] transition-colors">Sobre o Mentor LuCanto</button></li>
              </ul>
            </div>

            {/* Proteção, Termos e Segurança */}
            <div className="md:col-span-5 space-y-3">
              <h5 className="font-display font-black text-zinc-300 uppercase tracking-wider text-xs">Termos de Responsabilidade e Segurança</h5>
              <p className="text-[10px] text-zinc-500 leading-normal">
                <strong>ATENÇÃO JOGO RESPONSÁVEL:</strong> As simulações contidas nesta página são baseadas em dados históricos reais obtidos de ferramentas de análise parceiras. Retornos passados não garantem retornos futuros. Operações esportivas envolvem risco para o seu capital. Recomendamos operar apenas com valores que você esteja disposto a destinar para essa finalidade, com gestão estrita ensinada na mentoria. Mentoria destinada estritamente a maiores de 18 anos.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[10px] text-zinc-400">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-850 rounded">18+ JOGO RESPONSÁVEL</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-855 rounded">PAGAMENTO SEGURO</span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-[#00FF66]/15 text-[#00FF66] rounded">VITALÍCIO</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-650 font-mono">
            <p>© {new Date().getFullYear()} Dupla Fifa por LuCanto. Todos os direitos reservados. Inteligência Estratégica Esportiva.</p>
            <p>Desenvolvido por Dupla Fifa Pro</p>
          </div>

        </div>
      </footer>

      {/* FLOAT NOTIFICATION POPUP (EFEITO FOMO EXTRAORDINÁRIO) */}
      {recentNotification && (
        <div 
          className={`fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl shadow-2xl flex items-center gap-3.5 transition-all duration-350 transform translate-y-0 ${
            recentNotification.type === 'vitalicia'
              ? 'bg-zinc-950 border-2 border-amber-400' 
              : 'bg-neutral-950 border-2 border-[#00FF66]'
          }`} 
          style={{ 
            boxShadow: recentNotification.type === 'vitalicia' 
              ? '0 0 22px rgba(251, 191, 36, 0.25)' 
              : '0 0 20px rgba(0, 255, 102, 0.15)' 
          }}
        >
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            recentNotification.type === 'vitalicia' 
              ? 'bg-amber-400 animate-pulse' 
              : 'bg-[#00FF66] animate-ping'
          }`} />
          <div className="space-y-0.5 font-sans">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${
              recentNotification.type === 'vitalicia' ? 'text-amber-400' : 'text-[#00FF66]'
            }`}>
              {recentNotification.tag}
            </span>
            <p className="text-xs font-bold text-white leading-tight">{recentNotification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
