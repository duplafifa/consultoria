import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Course } from '../types';

interface Props {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

export default function PricingManagement({ courses, setCourses }: Props) {
  const [prices, setPrices] = useState<Record<string, number>>(
    courses.reduce((acc, c) => ({ ...acc, [c.id]: c.price || 0 }), {})
  );
  const [stripeIds, setStripeIds] = useState<Record<string, string>>(
    courses.reduce((acc, c) => ({ ...acc, [c.id]: c.stripeProductId || '' }), {})
  );

  const savePricing = async (courseId: string) => {
    const price = prices[courseId];
    const stripeProductId = stripeIds[courseId];
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, { price, stripeProductId });
    setCourses(courses.map(c => c.id === courseId ? { ...c, price, stripeProductId } : c));
    alert('Preço atualizado!');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-6">Gerenciamento de Preços</h2>
      {courses.map(course => (
        <div key={course.id} className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800 flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-white">{course.title}</h3>
          </div>
          <input 
            className="bg-zinc-800 p-2 rounded border border-zinc-700 w-32" 
            placeholder="Preço" 
            type="number" 
            value={prices[course.id] || ''}
            onChange={(e) => setPrices({...prices, [course.id]: Number(e.target.value)})}
          />
          <input 
            className="bg-zinc-800 p-2 rounded border border-zinc-700 w-64" 
            placeholder="Stripe Product ID" 
            value={stripeIds[course.id] || ''}
            onChange={(e) => setStripeIds({...stripeIds, [course.id]: e.target.value})}
          />
          <button onClick={() => savePricing(course.id)} className="bg-emerald-600 px-4 py-2 rounded-lg text-white font-bold">Salvar</button>
        </div>
      ))}
    </div>
  );
}
