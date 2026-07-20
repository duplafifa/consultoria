import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Course, Module, Lesson } from '../types';
import { ArrowLeft, Save, Plus } from 'lucide-react';

interface Props {
  course: Course;
  onBack: () => void;
}

export default function ManageCourse({ course, onBack }: Props) {
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState('');

  const addModule = async () => {
    if (!newModuleTitle) return;
    const courseRef = doc(db, 'courses', course.id);
    await updateDoc(courseRef, {
      modules: arrayUnion({ id: Date.now().toString(), title: newModuleTitle, lessons: [] })
    });
    setNewModuleTitle('');
    window.location.reload();
  };

  const addLesson = async (moduleIndex: number) => {
    if (!newLessonTitle) return;
    const courseRef = doc(db, 'courses', course.id);
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].lessons.push({
      id: Date.now().toString(),
      title: newLessonTitle,
      videoUrl: newLessonVideoUrl,
      duration: '0',
      description: ''
    });
    await updateDoc(courseRef, { modules: updatedModules });
    setNewLessonTitle('');
    setNewLessonVideoUrl('');
    window.location.reload();
  };

  return (
    <div className="p-8 bg-[#0a0f12] text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar ao Painel
        </button>
        <h1 className="text-3xl font-bold mb-8">Gerenciar: {course.title}</h1>
        
        <div className="mb-8 p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <input className="w-full bg-zinc-800 p-4 rounded-xl mb-4" placeholder="Título do Novo Módulo" value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} />
          <button onClick={addModule} className="bg-emerald-600 px-6 py-3 rounded-xl font-bold uppercase text-sm">Adicionar Módulo</button>
        </div>

        {course.modules.map((module, mIdx) => (
          <div key={module.id} className="mb-6 p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">{module.title}</h2>
            {module.lessons.map(lesson => (
              <div key={lesson.id} className="p-3 bg-zinc-800 rounded-lg mb-2">{lesson.title}</div>
            ))}
            <div className="mt-4 flex gap-2">
              <input className="flex-grow bg-zinc-700 p-2 rounded-lg" placeholder="Título da Aula" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} />
              <button onClick={() => addLesson(mIdx)} className="bg-emerald-600 px-4 py-2 rounded-lg"><Plus className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
