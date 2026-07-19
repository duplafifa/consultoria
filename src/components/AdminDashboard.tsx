import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Course } from '../types';
import { Save, ArrowLeft, BookOpen } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instructor, setInstructor] = useState('');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
    };
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (!title || !category) return;
    await addDoc(collection(db, 'courses'), {
      title,
      category,
      instructor,
      description,
      bannerUrl,
      duration: "0",
      modules: []
    });
    setTitle('');
    setCategory('');
    setInstructor('');
    setDescription('');
    setBannerUrl('');
    window.location.reload();
  };

  return (
    <div className="p-8 bg-[#0a0f12] text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para o Site
        </button>
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Gerenciamento de Cursos</h1>
        
        <section className="bg-zinc-900/50 p-6 rounded-2xl mb-8 border border-zinc-800">
          <h2 className="text-xl mb-6 font-bold text-emerald-400 uppercase tracking-tight">Adicionar Novo Curso</h2>
          <div className="grid grid-cols-1 gap-4">
            <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Título do Curso" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Instrutor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
            <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="URL do Banner" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} />
            <textarea className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Descrição do Curso" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleAddCourse} className="bg-emerald-600 hover:bg-emerald-500 p-4 rounded-xl flex items-center justify-center font-bold uppercase tracking-widest text-sm">
              <Save className="w-5 h-5 mr-2" /> Salvar Curso
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl mb-6 font-bold text-white uppercase tracking-tight">Cursos Cadastrados</h2>
          {courses.map(course => (
            <div key={course.id} className="bg-zinc-900/30 p-6 rounded-xl mb-4 border border-zinc-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-lg">{course.title}</h3>
                <p className="text-sm text-zinc-400">{course.category} | {course.instructor}</p>
              </div>
              <button className="text-emerald-400 hover:text-emerald-300 flex items-center font-bold text-sm">
                <BookOpen className="w-4 h-4 mr-2" /> Gerenciar Conteúdo
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
