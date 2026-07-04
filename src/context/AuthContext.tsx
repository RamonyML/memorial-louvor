import {
  onAuthStateChanged, signInWithEmailAndPassword, signOut, type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '../firebase/config';

interface AuthContextValue {
  user: User | null;
  /** true se houver alguém logado — as contas são criadas manualmente no Firebase Console */
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, senha: string) => Promise<{ ok: boolean; erro?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function mensagemErro(codigo: string): string {
  switch (codigo) {
    case 'auth/invalid-email':
      return 'E-mail inválido.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'E-mail ou senha incorretos.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
    default:
      return 'Não foi possível entrar. Tente novamente.';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  async function login(email: string, senha: string) {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      return { ok: true };
    } catch (e) {
      const codigo = (e as { code?: string }).code ?? '';
      return { ok: false, erro: mensagemErro(codigo) };
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
