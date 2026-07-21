import { ArrowRight } from 'lucide-react';
import MarketsShowcase from './MarketsShowcase';
import ReturnCalculator from './ReturnCalculator';
import SocialProof from './SocialProof';
import MentorSection from './MentorSection';
import MentorshipOffer from './MentorshipOffer';
import AcademySection from './AcademySection';
import CourseDetail from './CourseDetail';
import FAQ from './FAQ';
import AuthModal from './AuthModal';
import { Course } from '../types';

interface Props {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  scrollToId: (id: string) => void;
  spotsLeft: number;
  activeCourse: Course | null;
  setActiveCourse: (course: Course | null) => void;
}

export default function LandingPage({ 
  isAuthModalOpen, 
  setIsAuthModalOpen, 
  isCheckoutModalOpen,
  setIsCheckoutModalOpen,
  scrollToId, 
  spotsLeft,
  activeCourse,
  setActiveCourse
}: Props) {
  return (
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
        <MentorshipOffer spotsLeft={spotsLeft} setIsCheckoutModalOpen={setIsCheckoutModalOpen} />
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
  );
}
