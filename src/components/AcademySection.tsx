import React, { useState, useEffect } from 'react';
import { PlayCircle, Award, BookOpen, Clock } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Course } from '../types';

interface Props {
  onSelectCourse: (course: Course) => void;
}

export default function AcademySection({ onSelectCourse }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
    };
    fetchCourses();
  }, []);

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
          {courses.filter(c => c.status === 'approved').map((course) => {
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
