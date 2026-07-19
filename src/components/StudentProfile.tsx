import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { UserProfile, Course } from '../types';

export default function StudentProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        }

        const coursesSnap = await getDocs(collection(db, 'courses'));
        const coursesList = coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <div className="text-white p-10">Carregando...</div>;
  if (!profile) return <div className="text-white p-10">Perfil não encontrado.</div>;

  const purchasedCourses = courses.filter(c => profile.purchasedCourses.includes(c.id));

  return (
    <div className="p-8 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8">Minhas Mentorias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCourses.map(course => {
          const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
          const completedLessonsInCourse = profile.completedLessons.filter(lessonId => 
            course.modules.some(mod => mod.lessons.some(les => les.id === lessonId))
          ).length;
          const progress = totalLessons > 0 ? (completedLessonsInCourse / totalLessons) * 100 : 0;

          return (
            <div key={course.id} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <img src={course.bannerUrl} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-zinc-400 mb-4 text-sm">{course.description}</p>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-emerald-500 h-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-sm font-bold text-emerald-400">{Math.round(progress)}% concluído</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
