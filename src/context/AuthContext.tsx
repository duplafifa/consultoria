import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true, error: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth listener");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("AuthProvider: Auth state changed:", currentUser);
      if (currentUser) {
        setUser(currentUser);
        try {
            console.log("AuthProvider: Fetching user role for", currentUser.uid);
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              setRole(userDoc.data().role as UserRole);
              console.log("AuthProvider: Role set:", userDoc.data().role);
            } else {
              setRole('student'); // Default role
              console.log("AuthProvider: No user doc, default role set to student");
            }
        } catch(e) {
            console.error("AuthProvider: Error fetching user role", e);
            setError("Erro ao carregar permissões");
        }
      } else {
        setUser(null);
        setRole(null);
        console.log("AuthProvider: No user, setting loading false");
      }
      setLoading(false);
      console.log("AuthProvider: Loading set to false");
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
