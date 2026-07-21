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
  const [courseState, setCourseState] = useState(course);

  const updateCoursePriceAndId = async (price: number, stripeProductId: string) => {
    const courseRef = doc(db, 'courses', course.id);
    await updateDoc(courseRef, { price, stripeProductId });
    setCourseState({ ...courseState, price, stripeProductId });
    alert('Preço e ID do Stripe atualizados!');
  };
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newLesson, setNewLesson] = useState({ title: '', videoUrl: '', description: '', bannerUrl: '', backgroundImageUrl: '' });
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);

  const [price, setPrice] = useState(courseState.price || 0);
  const [stripeProductId, setStripeProductId] = useState(courseState.stripeProductId || '');

  const addModule = async () => {
    if (!newModuleTitle) return;
    const courseRef = doc(db, 'courses', course.id);
    const newModule = { id: Date.now().toString(), title: newModuleTitle, lessons: [] };
    await updateDoc(courseRef, {
      modules: arrayUnion(newModule)
    });
    // In a real app, update local state instead of relying on refresh if possible,
    // but here for simplicity, I will just clear input.
    // For a better experience, we should pass an update function from AdminDashboard.
    setNewModuleTitle('');
    alert('Módulo adicionado! Recarregue para ver as mudanças.'); // Temporary UX fix
  };

  const addLesson = async (moduleIndex: number) => {
    if (!newLesson.title) return;
    const courseRef = doc(db, 'courses', course.id);
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].lessons.push({
      id: Date.now().toString(),
      title: newLesson.title,
      videoUrl: newLesson.videoUrl,
      bannerUrl: newLesson.bannerUrl,
      backgroundImageUrl: newLesson.backgroundImageUrl,
      description: newLesson.description,
      duration: '0'
    });
    await updateDoc(courseRef, { modules: updatedModules });
    setNewLesson({ title: '', videoUrl: '', description: '', bannerUrl: '', backgroundImageUrl: '' });
    setActiveModuleIndex(null);
    alert('Aula adicionada! Recarregue para ver as mudanças.'); // Temporary UX fix
  };

  return (
    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
        <button onClick={onBack} className="flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar ao Painel
        </button>
        <h1 className="text-3xl font-bold mb-8">Gerenciar: {course.title}</h1>
        
        <div className="mb-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <input className="w-full bg-zinc-800 p-4 rounded-xl mb-4 border border-zinc-700" placeholder="Título do Novo Módulo" value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} />
          <button onClick={addModule} className="bg-emerald-600 px-6 py-3 rounded-xl font-bold uppercase text-sm">Adicionar Módulo</button>
        </div>

        {course.modules.map((module, mIdx) => (
          <div key={module.id} className="mb-6 p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">{module.title}</h2>
            {module.lessons.map(lesson => (
              <div key={lesson.id} className="p-3 bg-zinc-800 rounded-lg mb-2">{lesson.title}</div>
            ))}
            
            {activeModuleIndex === mIdx ? (
              <div className="mt-4 p-4 bg-zinc-800 rounded-lg space-y-3">
                <input className="w-full bg-zinc-700 p-2 rounded" placeholder="Preço (em centavos)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <input className="w-full bg-zinc-700 p-2 rounded" placeholder="Stripe Product ID" value={stripeProductId} onChange={(e) => setStripeProductId(e.target.value)} />
                <button onClick={() => updateCoursePriceAndId(price, stripeProductId)} className="bg-zinc-600 px-4 py-2 rounded-lg text-white font-bold w-full">Salvar Preço/ID</button>
                <hr className="border-zinc-700 my-4" />
                <input className="w-full bg-zinc-700 p-2 rounded" placeholder="Título da Aula" value={newLesson.title} onChange={(e) => setNewLesson({...newLesson, title: e.target.value})} />
                <input className="w-full bg-zinc-700 p-2 rounded" placeholder="URL do Vídeo" value={newLesson.videoUrl} onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})} />
                <input className="w-full bg-zinc-700 p-2 rounded" placeholder="URL da Capa" value={newLesson.bannerUrl} onChange={(e) => setNewLesson({...newLesson, bannerUrl: e.target.value})} />
                <input className="w-full bg-zinc-700 p-2 rounded" placeholder="URL da Imagem de Fundo" value={newLesson.backgroundImageUrl} onChange={(e) => setNewLesson({...newLesson, backgroundImageUrl: e.target.value})} />
                <textarea className="w-full bg-zinc-700 p-2 rounded" placeholder="Descrição da Aula" value={newLesson.description} onChange={(e) => setNewLesson({...newLesson, description: e.target.value})} />
                <div className="flex gap-2">
                    <button onClick={() => addLesson(mIdx)} className="bg-emerald-600 px-4 py-2 rounded-lg">Salvar Aula</button>
                    <button onClick={() => setActiveModuleIndex(null)} className="bg-zinc-600 px-4 py-2 rounded-lg">Cancelar</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setActiveModuleIndex(mIdx)} className="mt-4 flex items-center gap-2 text-emerald-500 font-bold"><Plus className="w-5 h-5" /> Adicionar Aula</button>
            )}
          </div>
        ))}
    </div>
  );
}
