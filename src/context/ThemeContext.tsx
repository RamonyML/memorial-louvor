import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import * as repo from '../data/repository';
import { applyTheme } from '../theme/applyTheme';
import { getTheme, TEMA_PADRAO_ID, THEMES, type Theme } from '../theme/themes';

interface ThemeContextValue {
  tema: Theme;
  temas: Theme[];
  setTema: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [temaId, setTemaId] = useState(TEMA_PADRAO_ID);

  useEffect(() => {
    return repo.subscribeTema((id) => {
      if (id) setTemaId(id);
    });
  }, []);

  useEffect(() => {
    applyTheme(getTheme(temaId));
  }, [temaId]);

  function setTema(id: string) {
    setTemaId(id);
    repo.salvarTema(id);
  }

  return (
    <ThemeContext.Provider value={{ tema: getTheme(temaId), temas: THEMES, setTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme deve ser usado dentro de <ThemeProvider>');
  return ctx;
}
