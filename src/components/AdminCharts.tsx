import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Course, UserProfile } from '../types';

interface Props {
  courses: Course[];
  users: { id: string; data: UserProfile }[];
}

export default function AdminCharts({ courses, users }: Props) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const data = last30Days.map(date => {
    const coursesCount = courses.filter(c => c.createdAt?.startsWith(date)).length;
    const usersCount = users.filter(u => u.data.createdAt?.startsWith(date)).length;
    return { date, courses: coursesCount, users: usersCount };
  });

  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 mb-8">
      <h2 className="text-xl mb-6 font-bold text-white uppercase tracking-tight">Atividade (Últimos 30 dias)</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" tick={{fontSize: 10}} />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{backgroundColor: '#18181b', borderColor: '#3f3f46'}} />
            <Legend />
            <Line type="monotone" dataKey="courses" stroke="#10b981" name="Cursos" />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Usuários" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
