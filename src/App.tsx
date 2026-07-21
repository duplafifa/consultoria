/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentCourseView from './components/StudentCourseView';
import StudentProfile from './components/StudentProfile';
import AdminDashboard from './components/AdminDashboard';
import LmsShell from './components/LmsShell';
import MyCourses from './components/MyCourses';
import Auth from './components/Auth';
import CheckoutModal from './components/CheckoutModal';
import { Course } from './types';
import { useAuth } from './context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { migrateCourses } from './lib/seed';
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
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [view, setView] = useState<'home' | 'admin' | 'studentProfile' | 'lms' | 'meusCursos'>('home');
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
    if (role === 'admin') {
      migrateCourses();
    }
  }, [role]);

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
    <Router>
      <div className="min-h-screen bg-[#070b0d] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950 overflow-x-hidden antialiased">
        <CheckoutModal 
          isOpen={isCheckoutModalOpen} 
          onClose={() => setIsCheckoutModalOpen(false)} 
          amount={19700} // Vitalício example
          onSuccess={() => { setIsCheckoutModalOpen(false); alert('Pagamento efetuado!'); }}
        />
        {/* Header Fixo */}
        <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#070b0d]/90 border-b border-zinc-900/60 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 p-[1.5px] shadow-lg shadow-emerald-500/10">
                <div className="w-full h-full bg-[#070b0d] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-emerald-400 text-lg tracking-tighter">DF</span>
                </div>
              </div>
              <span className="text-sm font-display font-black tracking-widest text-zinc-100 block uppercase">DUPLA FIFA</span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {user ? (
                <>
                  <a href="/app" className="hover:text-emerald-400 transition-colors">Meus Cursos</a>
                  <a href="/profile" className="hover:text-emerald-400 transition-colors">Perfil</a>
                  {role === 'admin' && <a href="/admin" className="hover:text-emerald-400 transition-colors">Painel Admin</a>}
                  <button onClick={() => signOut(auth)} className="hover:text-red-400 transition-colors">Sair</button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  Login/Cadastro
                </button>
              )}
            </nav>
          </div>
        </header>
        
        <Routes>
          <Route path="/" element={<LandingPage 
            isAuthModalOpen={isAuthModalOpen}
            setIsAuthModalOpen={setIsAuthModalOpen}
            isCheckoutModalOpen={isCheckoutModalOpen}
            setIsCheckoutModalOpen={setIsCheckoutModalOpen}
            scrollToId={scrollToId}
            spotsLeft={spotsLeft}
            activeCourse={activeCourse}
            setActiveCourse={setActiveCourse}
          />} />
          <Route path="/admin/*" element={role === 'admin' ? <AdminDashboard onBack={() => {}} /> : <Navigate to="/" />} />
          <Route path="/app/*" element={user ? (
            activeCourse ? (
              <StudentCourseView 
                course={activeCourse} 
                completedLessons={[]} 
                onLessonClick={(lesson) => console.log('Lesson clicked:', lesson)} 
                onBack={() => setActiveCourse(null)}
              />
            ) : (
              <MyCourses onSelectCourse={setActiveCourse} />
            )
          ) : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

// Restoring the Footer and Notification Popup
// ... (I will need to add the code here)

export function Footer() {
  return (
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
                <li><button className="hover:text-[#00FF66] transition-colors">Mercados Futebol Real e e-Soccer</button></li>
                <li><button className="hover:text-[#00FF66] transition-colors">Calculadora de Lucros e ROI</button></li>
                <li><button className="hover:text-[#00FF66] transition-colors">Depoimentos Verificados</button></li>
                <li><button className="hover:text-[#00FF66] transition-colors">Sobre o Mentor LuCanto</button></li>
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
  );
}
