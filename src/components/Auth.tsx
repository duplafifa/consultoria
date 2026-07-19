import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserRole } from '../types';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('student');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          role: 'student'
        });
      }
    } catch (error) {
      console.error(error);
      alert('Erro no login com Google');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          role
        });
      }
    } catch (error) {
      console.error(error);
      alert('Erro na autenticação');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#0a0f12] text-white">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-zinc-800">
        <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Cadastro'}</h2>
        <input className="w-full bg-zinc-800 p-3 rounded mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full bg-zinc-800 p-3 rounded mb-4" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {!isLogin && (
          <select className="w-full bg-zinc-800 p-3 rounded mb-4" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="student">Aluno</option>
            <option value="admin">Administrador</option>
          </select>
        )}

        <button type="submit" className="w-full bg-emerald-600 p-3 rounded font-bold mb-4">
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
        <button 
          type="button" 
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-black p-3 rounded font-bold mb-4 flex items-center justify-center"
        >
          Entrar com Google
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="w-full text-zinc-400 text-sm">
          {isLogin ? 'Criar conta' : 'Já tem conta? Login'}
        </button>
      </form>
    </div>
  );
}
