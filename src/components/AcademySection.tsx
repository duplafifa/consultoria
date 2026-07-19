import React from 'react';
import { PlayCircle, Award, BookOpen, Clock } from 'lucide-react';
import { Course } from '../types';

const courses: Course[] = [
  {
    id: '1',
    title: "Fundamentos da Probabilidade",
    category: "Iniciante",
    duration: "45 min",
    description: "Entenda os pilares matemáticos que sustentam apostas lucrativas a longo prazo.",
    instructor: "LuCanto",
    modules: [
        { id: 'm1', title: 'Módulo 1', lessons: [
            { id: 'l1', title: 'Introdução à Probabilidade', duration: '15 min', description: 'Conceitos básicos.' },
            { id: 'l2', title: 'Valor Esperado (EV)', duration: '30 min', description: 'Calculando o valor.' }
        ]}
    ]
  },
  {
    id: '2',
    title: "Análise de Escanteios na Prática",
    category: "Intermediário",
    duration: "1h 15min",
    description: "Aprenda a ler o fluxo de jogo e identificar oportunidades em escanteios.",
    instructor: "LuCanto",
    modules: [
        { id: 'm2', title: 'Módulo 1', lessons: [
            { id: 'l3', title: 'Fluxo de Jogo', duration: '40 min', description: 'Identificando padrões.' },
            { id: 'l4', title: 'Execução de Escanteios', duration: '35 min', description: 'Entrada e saída.' }
        ]}
    ]
  },
  {
    id: '3',
    title: "Dominando o Mercado de Gols",
    category: "Avançado",
    duration: "50 min",
    description: "Estratégias avançadas para o mercado de gols, focando em padrões estatísticos.",
    instructor: "LuCanto",
    modules: [
        { id: 'm3', title: 'Módulo 1', lessons: [
            { id: 'l5', title: 'Análise Estatística', duration: '25 min', description: 'Ferramentas.' },
            { id: 'l6', title: 'Técnicas de Gols', duration: '25 min', description: 'Execução.' }
        ]}
    ]
  },
  {
    id: '4',
    title: "Leitura de Jogo em Tempo Real",
    category: "Avançado",
    duration: "1h 30min",
    description: "Desenvolva a habilidade de ler o jogo em tempo real para entradas precisas.",
    instructor: "LuCanto",
    modules: [
        { id: 'm4', title: 'Módulo 1', lessons: [
            { id: 'l7', title: 'Leitura de Padrões', duration: '45 min', description: 'Visualizando jogo.' },
            { id: 'l8', title: 'Tomada de Decisão', duration: '45 min', description: 'Execução rápida.' }
        ]}
    ]
  }
];

interface Props {
  onSelectCourse: (course: Course) => void;
}

export default function AcademySection({ onSelectCourse }: Props) {
  return (
    <section id="academia" className="py-20 bg-[#0a0f12] border-y border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/10">
            Conhecimento
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase">
            Academia Dupla Fifa
          </h2>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            Aprenda as estratégias que transformam amadores em profissionais com nosso conteúdo exclusivo e prático.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            return (
              <button 
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-950/20 text-left w-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-zinc-800/50 rounded-xl text-emerald-400 group-hover:bg-emerald-950/50 transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-800 px-2 py-1 rounded uppercase">
                    {course.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-4">{course.title}</h3>
                <div className="flex items-center text-zinc-500 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {course.duration}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center pt-8">
            <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all">
                Ver todos os cursos
            </button>
        </div>
      </div>
    </section>
  );
}
