import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Course } from '../types';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface Props {
  onSelectCourse: (course: Course) => void;
}

export default function MyCourses({ onSelectCourse }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(coursesData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 text-zinc-200 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-white">Meus Cursos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-emerald-500/30 transition-colors"
          >
            <div className="p-3 bg-zinc-800 rounded-lg text-emerald-400 w-fit mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{course.title}</h3>
            <p className="text-sm text-zinc-400 mb-4 flex-grow">{course.description}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center text-zinc-500 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {course.duration}
                </div>
                <button 
                  onClick={() => onSelectCourse(course)}
                  className="text-emerald-500 text-sm font-bold flex items-center hover:text-emerald-400"
                >
                  Continuar <ArrowRight className="w-4 h-4 ml-1" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
