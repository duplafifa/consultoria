import React from 'react';
import { ArrowLeft, Clock, BookOpen, Award, Users } from 'lucide-react';
import { Course } from '../types';

interface Props {
  course: Course;
  onClose: () => void;
}

export default function CourseDetail({ course, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f12] overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button 
          onClick={onClose}
          className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Academia
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/10">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed">
                {course.description}
              </p>
            </header>

            <section className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-white uppercase">Conteúdo do Curso</h3>
              {course.modules.map((module) => (
                <div key={module.id} className="space-y-4">
                  <h4 className="text-lg font-bold text-emerald-400">{module.title}</h4>
                  <div className="space-y-3">
                    {module.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
                        <span className="font-mono text-zinc-500 text-lg font-bold w-8">{String(index + 1).padStart(2, '0')}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{lesson.title}</h4>
                          <p className="text-sm text-zinc-400">{lesson.description}</p>
                        </div>
                        <div className="flex items-center text-zinc-500 text-xs font-mono">
                          <Clock className="w-3.5 h-3.5 mr-1.5" />
                          {lesson.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 sticky top-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-mono">{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-mono">Certificado incluso</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-mono">{course.instructor}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all">
                Inscrever-se agora
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
