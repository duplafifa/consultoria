import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Course } from '../types';
import StudentCourseView from './StudentCourseView';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function LmsShell({ onBack }: { onBack: () => void }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      setCourses(coursesData);
    };
    fetchCourses();
  }, []);

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
        <button onClick={() => setSelectedCourse(null)} className="mb-6 flex items-center text-emerald-400">
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar para Meus Cursos
        </button>
        <StudentCourseView course={selectedCourse} completedLessons={[]} onLessonClick={(lesson) => console.log(lesson)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Meus Cursos</h1>
        <button onClick={onBack} className="flex items-center text-zinc-400 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar para Home
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-zinc-400 mb-4">{course.description}</p>
            <button 
              onClick={() => setSelectedCourse(course)}
              className="flex items-center text-emerald-400 font-bold"
            >
              <BookOpen className="w-5 h-5 mr-2" /> Acessar Curso
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
