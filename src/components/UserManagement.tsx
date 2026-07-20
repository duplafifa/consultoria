import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { UserProfile, UserRole } from '../types';
import { CheckCircle, XCircle, User, Shield } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState<{id: string, data: UserProfile}[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() as UserProfile })));
    };
    fetchUsers();
  }, []);

  const updateUser = async (userId: string, updates: Partial<UserProfile>) => {
    await updateDoc(doc(db, 'users', userId), updates);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase">Gestão de Usuários</h2>
      {users.map(user => (
        <div key={user.id} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex justify-between items-center gap-4">
          <div>
            <p className="text-white font-bold">{user.data.email}</p>
            <div className="flex gap-2 text-sm mt-1">
              <span className={`px-2 py-0.5 rounded ${user.data.status === 'approved' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'}`}>
                {user.data.status || 'pending'}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {user.data.role}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={user.data.role} 
              onChange={(e) => updateUser(user.id, { role: e.target.value as UserRole })}
              className="bg-zinc-800 text-white rounded-lg p-2"
            >
              <option value="student">Estudante</option>
              <option value="admin">Admin</option>
            </select>

            {user.data.status !== 'approved' ? (
              <button onClick={() => updateUser(user.id, { status: 'approved' })} className="bg-emerald-600 p-2 rounded-lg hover:bg-emerald-500">
                <CheckCircle className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={() => updateUser(user.id, { status: 'pending' })} className="bg-amber-600 p-2 rounded-lg hover:bg-amber-500">
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
