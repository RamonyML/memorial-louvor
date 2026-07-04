import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Culto, Membro, NovoCulto, NovoMembro } from '../data/types';
import * as repo from '../data/repository';
import { domingosDoMes } from '../utils/date';

interface ScheduleContextValue {
  membros: Membro[];
  cultos: Culto[];
  loading: boolean;
  updateCulto: (id: number, patch: Partial<Culto>) => void;
  addVoz: (cultoId: number, nome: string) => void;
  removeVoz: (cultoId: number, index: number) => void;
  deleteCulto: (id: number) => void;
  createCulto: (dados: NovoCulto) => Promise<Culto>;
  createMembro: (dados: NovoMembro) => Promise<Membro>;
  toggleDisponivel: (membroId: number) => void;
  gerarDomingosDoMes: (ano: number, mes: number) => Promise<number>;
}

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [cultos, setCultos] = useState<Culto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([repo.listarMembros(), repo.listarCultos()]).then(([m, c]) => {
      setMembros(m);
      setCultos(c);
      setLoading(false);
    });
  }, []);

  function updateCulto(id: number, patch: Partial<Culto>) {
    setCultos((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...patch } : c));
      repo.salvarCultos(next);
      return next;
    });
  }

  function addVoz(cultoId: number, nome: string) {
    setCultos((prev) => {
      const next = prev.map((c) =>
        c.id === cultoId && !c.vozes.includes(nome) ? { ...c, vozes: [...c.vozes, nome] } : c
      );
      repo.salvarCultos(next);
      return next;
    });
  }

  function removeVoz(cultoId: number, index: number) {
    setCultos((prev) => {
      const next = prev.map((c) =>
        c.id === cultoId ? { ...c, vozes: c.vozes.filter((_, i) => i !== index) } : c
      );
      repo.salvarCultos(next);
      return next;
    });
  }

  function deleteCulto(id: number) {
    setCultos((prev) => {
      const next = prev.filter((c) => c.id !== id);
      repo.salvarCultos(next);
      return next;
    });
  }

  async function createCulto(dados: NovoCulto) {
    const novo = await repo.criarCulto(dados);
    setCultos((prev) => [...prev, novo]);
    return novo;
  }

  async function createMembro(dados: NovoMembro) {
    const novo = await repo.criarMembro(dados);
    setMembros((prev) => [...prev, novo]);
    return novo;
  }

  /** Cria automaticamente um culto para cada domingo do mês que ainda não existe. */
  async function gerarDomingosDoMes(ano: number, mes: number) {
    const existentes = new Set(cultos.map((c) => c.data));
    const faltantes = domingosDoMes(ano, mes).filter((data) => !existentes.has(data));
    if (faltantes.length === 0) return 0;

    let proximoId = Math.max(0, ...cultos.map((c) => c.id));
    const novos: Culto[] = faltantes.map((data) => ({
      id: ++proximoId,
      titulo: 'Culto Domingo Noite',
      data,
      ensaio: '17h15',
      culto: '18h00',
      bat: '', bai: '', vio: '', gui: '', tec: '', trom: '',
      vozes: [],
    }));

    const next = [...cultos, ...novos];
    setCultos(next);
    await repo.salvarCultos(next);
    return novos.length;
  }

  function toggleDisponivel(membroId: number) {
    setMembros((prev) => {
      const next = prev.map((m) => (m.id === membroId ? { ...m, disponivel: !m.disponivel } : m));
      repo.salvarMembros(next);
      return next;
    });
  }

  const value = useMemo(
    () => ({
      membros,
      cultos,
      loading,
      updateCulto,
      addVoz,
      removeVoz,
      deleteCulto,
      createCulto,
      createMembro,
      toggleDisponivel,
      gerarDomingosDoMes,
    }),
    [membros, cultos, loading]
  );

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedule deve ser usado dentro de <ScheduleProvider>');
  return ctx;
}
