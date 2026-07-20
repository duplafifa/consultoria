import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState<{id: string, data: UserProfile}[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() as UserProfile })));
    };
    fetchUsers();
  }, []);

  const approveUser = async (userId: string) => {
    await updateDoc(doc(db, 'users', userId), { status: 'approved' });
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase">Usuários Pendentes</h2>
      {users.filter(u => u.data.status !== 'approved').map(user => (
        <div key={user.id} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex justify-between items-center">
          <div>
            <p className="text-white font-bold">{user.data.email}</p>
            <p className="text-zinc-400 text-sm">{user.data.role}</p>
          </div>
          <button onClick={() => approveUser(user.id)} className="bg-emerald-600 p-2 rounded-lg hover:bg-emerald-500">
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
