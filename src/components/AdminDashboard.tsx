import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Course, UserProfile } from '../types';
import { Save, ArrowLeft, BookOpen, Users, Trash2, BarChart3, DollarSign, Pencil } from 'lucide-react';
import ManageCourse from './ManageCourse';
import UserManagement from './UserManagement';
import AdminCharts from './AdminCharts';
import PricingManagement from './PricingManagement';

interface Props {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'courses' | 'users' | 'analytics' | 'pricing'>('analytics');
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<{id: string, data: UserProfile}[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  // ... (existing state)
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
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() as UserProfile })));
    };
    fetchCourses();
    fetchUsers();
  }, []);

  const handleAddCourse = async () => {
    if (!title || !category) return;
    const docRef = await addDoc(collection(db, 'courses'), {
      title,
      category,
      instructor,
      description,
      bannerUrl,
      createdAt: new Date().toISOString(),
      duration: "0",
      modules: [],
      status: 'draft'
    });
    setCourses([...courses, { id: docRef.id, title, category, instructor, description, bannerUrl, createdAt: new Date().toISOString(), duration: "0", modules: [], status: 'draft' }]);
    setTitle('');
    setCategory('');
    setInstructor('');
    setDescription('');
    setBannerUrl('');
  };

  const toggleCourseStatus = async (courseId: string, currentStatus?: 'draft' | 'approved') => {
    const newStatus = currentStatus === 'approved' ? 'draft' : 'approved';
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, { status: newStatus });
    setCourses(courses.map(c => c.id === courseId ? { ...c, status: newStatus } : c));
  };

  const handleUpdateCourse = async (courseId: string) => {
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, {
        title,
        category,
        instructor,
        description,
        bannerUrl
    });
    setCourses(courses.map(c => c.id === courseId ? { ...c, title, category, instructor, description, bannerUrl } : c));
    alert('Curso atualizado!');
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;
    await deleteDoc(doc(db, 'courses', courseId));
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const handleEditClick = (course: Course) => {
    setEditingCourseId(course.id);
    setTitle(course.title);
    setCategory(course.category);
    setInstructor(course.instructor || '');
    setDescription(course.description || '');
    setBannerUrl(course.bannerUrl || '');
  };

  const handleSaveCourse = async () => {
    if (editingCourseId) {
      await handleUpdateCourse(editingCourseId);
      setEditingCourseId(null);
    } else {
      await handleAddCourse();
    }
    setTitle('');
    setCategory('');
    setInstructor('');
    setDescription('');
    setBannerUrl('');
  };

  if (selectedCourse) {
    return <ManageCourse course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="flex bg-[#0a0f12] text-white min-h-screen">
      <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col gap-8">
        <button 
          onClick={onBack}
          className="flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para o Site
        </button>
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'analytics' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <BarChart3 className="w-5 h-5 mr-3" /> Analytics
          </button>
          <button 
            onClick={() => setActiveTab('pricing')} 
            className={`flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'pricing' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <DollarSign className="w-5 h-5 mr-3" /> Preços
          </button>
          <button 
            onClick={() => setActiveTab('courses')} 
            className={`flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'courses' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <BookOpen className="w-5 h-5 mr-3" /> Gerenciar Cursos
          </button>
          <button 
            onClick={() => setActiveTab('users')} 
            className={`flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'users' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
          >
            <Users className="w-5 h-5 mr-3" /> Aprovar Usuários
          </button>
        </nav>
      </aside>
      
      <main className="flex-1 p-8">
        {selectedCourse ? (
          <ManageCourse course={selectedCourse} onBack={() => setSelectedCourse(null)} />
        ) : activeTab === 'analytics' ? (
          <AdminCharts courses={courses} users={users} />
        ) : activeTab === 'pricing' ? (
          <PricingManagement courses={courses} setCourses={setCourses} />
        ) : activeTab === 'courses' ? (
          <>
            <h1 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Gerenciamento de Cursos</h1>
            <section className="bg-zinc-900/50 p-6 rounded-2xl mb-8 border border-zinc-800">
              <h2 className="text-xl mb-6 font-bold text-emerald-400 uppercase tracking-tight">Adicionar Novo Curso</h2>
              <div className="grid grid-cols-1 gap-4">
                <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Título do Curso" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
                <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Instrutor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
                <input className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="URL do Banner" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} />
                <textarea className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 focus:border-emerald-500 outline-none" placeholder="Descrição do Curso" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={handleSaveCourse} className="bg-emerald-600 hover:bg-emerald-500 p-4 rounded-xl flex items-center justify-center font-bold uppercase tracking-widest text-sm">
                  <Save className="w-5 h-5 mr-2" /> {editingCourseId ? 'Atualizar' : 'Salvar'} Curso
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
                    <button 
                      onClick={() => toggleCourseStatus(course.id, course.status)}
                      className={`text-xs font-bold mt-2 px-2 py-1 rounded ${course.status === 'approved' ? 'bg-emerald-900 text-emerald-300' : 'bg-zinc-800 text-zinc-400'}`}
                    >
                      {course.status === 'approved' ? 'APROVADO' : 'RASCUNHO'}
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => setSelectedCourse(course)} className="text-emerald-400 hover:text-emerald-300 flex items-center font-bold text-sm">
                      <BookOpen className="w-4 h-4 mr-2" /> Gerenciar Conteúdo
                    </button>
                    <button onClick={() => handleEditClick(course)} className="text-blue-400 hover:text-blue-300 flex items-center font-bold text-sm ml-4">
                      <Pencil className="w-4 h-4 mr-2" /> Editar
                    </button>
                    <button onClick={() => handleDeleteCourse(course.id)} className="text-red-400 hover:text-red-300 flex items-center font-bold text-sm ml-4">
                      <Trash2 className="w-4 h-4 mr-2" /> Excluir
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <UserManagement />
        )}
      </main>
    </div>
  );
}
