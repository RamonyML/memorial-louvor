import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Culto, Membro, NovoCulto, NovoMembro } from '../data/types';
import * as repo from '../data/repository';

interface ScheduleContextValue {
  membros: Membro[];
  cultos: Culto[];
  loading: boolean;
  updateCulto: (id: string, patch: Partial<Culto>) => void;
  addVoz: (cultoId: string, nome: string) => void;
  removeVoz: (cultoId: string, nome: string) => void;
  deleteCulto: (id: string) => void;
  createCulto: (dados: NovoCulto) => Promise<{ id: string }>;
  createMembro: (dados: NovoMembro) => Promise<{ id: string }>;
  toggleDisponivel: (membroId: string) => void;
  gerarDomingosDoMes: (ano: number, mes: number) => Promise<number>;
}

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [cultos, setCultos] = useState<Culto[]>([]);
  const [cultosProntos, setCultosProntos] = useState(false);
  const [membrosProntos, setMembrosProntos] = useState(false);

  useEffect(() => {
    let ativo = true;
    repo.seedSeVazio().finally(() => {
      if (!ativo) return;
    });

    const unsubCultos = repo.subscribeCultos((c) => {
      setCultos(c);
      setCultosProntos(true);
    });
    const unsubMembros = repo.subscribeMembros((m) => {
      setMembros(m);
      setMembrosProntos(true);
    });

    return () => {
      ativo = false;
      unsubCultos();
      unsubMembros();
    };
  }, []);

  function updateCulto(id: string, patch: Partial<Culto>) {
    repo.atualizarCulto(id, patch);
  }

  function addVoz(cultoId: string, nome: string) {
    const culto = cultos.find((c) => c.id === cultoId);
    if (culto && !culto.vozes.includes(nome)) repo.adicionarVoz(cultoId, nome);
  }

  function removeVoz(cultoId: string, nome: string) {
    repo.removerVoz(cultoId, nome);
  }

  function deleteCulto(id: string) {
    repo.excluirCulto(id);
  }

  async function createCulto(dados: NovoCulto) {
    const id = await repo.criarCulto(dados);
    return { id };
  }

  async function createMembro(dados: NovoMembro) {
    const id = await repo.criarMembro(dados);
    return { id };
  }

  function toggleDisponivel(membroId: string) {
    const membro = membros.find((m) => m.id === membroId);
    if (membro) repo.atualizarDisponibilidade(membroId, !membro.disponivel);
  }

  async function gerarDomingosDoMes(ano: number, mes: number) {
    return repo.gerarDomingosDoMes(ano, mes, cultos.map((c) => c.data));
  }

  const value = useMemo(
    () => ({
      membros,
      cultos,
      loading: !(cultosProntos && membrosProntos),
      updateCulto,
      addVoz,
      removeVoz,
      deleteCulto,
      createCulto,
      createMembro,
      toggleDisponivel,
      gerarDomingosDoMes,
    }),
    [membros, cultos, cultosProntos, membrosProntos]
  );

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedule deve ser usado dentro de <ScheduleProvider>');
  return ctx;
}
