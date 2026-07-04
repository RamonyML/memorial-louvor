import { createContext, useContext, useState, type ReactNode } from 'react';

const SESSION_KEY = 'escala-louvor:admin-auth';

/**
 * Senha da área gerencial. Configurável via variável de ambiente
 * VITE_ADMIN_PASSWORD (crie um arquivo .env local — veja .env.example).
 * Isto é apenas uma trava temporária no front-end; quando houver backend,
 * a autenticação real substitui este mecanismo.
 */
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'louvor2026';

interface AuthContextValue {
  isAdmin: boolean;
  login: (senha: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  function login(senha: string) {
    if (senha === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setIsAdmin(true);
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }

  return <AuthContext.Provider value={{ isAdmin, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
