import { Shield, Sparkles, Award, Star, BookOpen, Quote } from 'lucide-react';
// @ts-ignore
import lucantoAvatar from '../assets/images/lucanto_avatar_1780587766125.png';

export default function MentorSection() {
  return (
    <section id="mentor" className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Lado Esquerdo - Foto Visual / Perfil Simulado do Mentor com LuCanto */}
        <div className="lg:col-span-5 relative group">
          {/* Neon Borders Glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00FF66] to-zinc-950 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
          
          <div className="relative bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden p-6 md:p-8 text-center space-y-6">
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-[#00FF66]/40">
              <img 
                src={lucantoAvatar} 
                alt="LuCanto" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
                id="lucanto-avatar-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent" />
            </div>

            <div className="space-y-1">
              <h4 className="font-display font-black text-xl md:text-2xl text-white uppercase italic">LuCanto</h4>
              <p className="text-[#00FF66] font-mono text-xs uppercase tracking-widest font-black">Mentor & Especialista Chefe</p>
            </div>

            <div className="flex justify-center gap-1.5 text-[#00FF66]" id="lucanto-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#00FF66] stroke-none" />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900 text-xs">
              <div className="p-3 bg-zinc-900/50 rounded-xl">
                <span className="text-[10px] text-zinc-550 uppercase font-mono">Anos de Atuação</span>
                <p className="font-display font-black text-white text-sm mt-0.5 uppercase">8+ Anos</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded-xl">
                <span className="text-[10px] text-zinc-550 uppercase font-mono">Alunos Formados</span>
                <p className="font-display font-black text-white text-sm mt-0.5 uppercase">2.400+</p>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 italic block">
              "A verdadeira inteligência não está em descobrir segredos de algoritmos, mas em posicionar a banca com disciplina estatística inabalável."
            </p>
          </div>
        </div>

        {/* Lado Direito - COPY Agressiva do Maior Especialista de Marketing */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#00FF66] uppercase tracking-widest block">A Mente por trás da Dupla Fifa</span>
            <h3 className="text-2xl md:text-4xl font-display font-black text-white leading-tight uppercase">
              Seja Guiado por um dos Maiores <span className="text-gradient">Especialistas</span> nesses mercados
            </h3>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              LuCanto construiu uma legião de investidores esportivos baseado unicamente em dados estatísticos fundamentados. Ele já transformou a vida de milhares de pessoas comuns, retirando-as das amarras de mentores falsificados e robôs enganadores para levá-las à elite financeira das apostas com base analítica.
            </p>
          </div>

          <div className="relative p-5 bg-[#0a0a0a] border border-zinc-900 rounded-2xl block space-y-4">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-[#00FF66]/5 pointer-events-none" />
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed italic font-light">
              "Para vencer as casas de apostas, você precisa parar de agir como torcedor e passar a agir como um banco. Eles usam algoritmos e bancos de dados para tirar o seu dinheiro. Nós usamos as mesmas estatísticas e ferramentas de ponta para localizar desvios de valor. O conhecimento que você vai adquirir aqui é seu para sempre, sem mensalidades abusivas e sem falsas ilusões."
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
              <strong className="text-white text-xs font-mono font-bold uppercase tracking-wider">— LuCanto, Dupla Fifa</strong>
            </div>
          </div>

          {/* Os 3 Pilares e Voto do LuCanto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 bg-[#0c0c0c] border border-zinc-900 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-[#00FF66] font-black border border-[#00FF66]/15">
                1
              </div>
              <h5 className="font-display font-black text-white text-sm uppercase">Controle de Volatilidade</h5>
              <p className="text-zinc-500 leading-snug">Modelos estritos de gestão estatística de banca para jamais expor seu patrimônio.</p>
            </div>

            <div className="p-4 bg-[#0c0c0c] border border-zinc-900 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-[#00FF66] font-black border border-[#00FF66]/15">
                2
              </div>
              <h5 className="font-display font-black text-white text-sm uppercase">Leitura Quantitativa</h5>
              <p className="text-zinc-500 leading-snug">Decifre gráficos de calor de escanteios e tendências virtuais com frieza.</p>
            </div>

            <div className="p-4 bg-[#0c0c0c] border border-zinc-900 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#000000] flex items-center justify-center text-[#00FF66] font-black border border-[#00FF66]/15">
                3
              </div>
              <h5 className="font-display font-black text-white text-sm uppercase">Exclusividade Telegram</h5>
              <p className="text-zinc-500 leading-snug">Acesso contínuo com networking gerado pelos maiores traders VIP do Brasil.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
