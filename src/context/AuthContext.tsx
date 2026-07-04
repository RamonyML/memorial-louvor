import {
  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ADMIN_EMAILS, auth } from '../firebase/config';

interface AuthContextValue {
  user: User | null;
  /** true só se o usuário estiver logado E o e-mail estiver em ADMIN_EMAILS */
  isAdmin: boolean;
  /** logado com Google, mas fora da lista de e-mails autorizados */
  acessoNegado: boolean;
  loading: boolean;
  loginComGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  async function loginComGoogle() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function logout() {
    await signOut(auth);
  }

  const isAdmin = !!user && ADMIN_EMAILS.includes(user.email ?? '');
  const acessoNegado = !!user && !isAdmin;

  return (
    <AuthContext.Provider value={{ user, isAdmin, acessoNegado, loading, loginComGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
