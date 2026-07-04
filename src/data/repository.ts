import type { Culto, Membro, NovoCulto, NovoMembro } from './types';
import { SEED_CULTOS, SEED_MEMBROS } from './seed';

/**
 * Camada de acesso a dados. Hoje persiste em localStorage; a ideia é que,
 * quando houver backend/banco, apenas esta implementação troque (as telas
 * já consomem tudo por aqui, de forma assíncrona).
 */

const KEYS = {
  membros: 'escala-louvor:membros',
  cultos: 'escala-louvor:cultos',
};

function readStorage<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function nextId(items: { id: number }[]): number {
  return Math.max(0, ...items.map((i) => i.id)) + 1;
}

// ── MEMBROS ──────────────────────────────────────────────────
export async function listarMembros(): Promise<Membro[]> {
  return readStorage(KEYS.membros, SEED_MEMBROS);
}

export async function salvarMembros(membros: Membro[]): Promise<void> {
  writeStorage(KEYS.membros, membros);
}

export async function criarMembro(dados: NovoMembro): Promise<Membro> {
  const membros = await listarMembros();
  const novo: Membro = { id: nextId(membros), ...dados };
  await salvarMembros([...membros, novo]);
  return novo;
}

// ── CULTOS ───────────────────────────────────────────────────
export async function listarCultos(): Promise<Culto[]> {
  return readStorage(KEYS.cultos, SEED_CULTOS);
}

export async function salvarCultos(cultos: Culto[]): Promise<void> {
  writeStorage(KEYS.cultos, cultos);
}

export async function criarCulto(dados: NovoCulto): Promise<Culto> {
  const cultos = await listarCultos();
  const novo: Culto = {
    id: nextId(cultos),
    ...dados,
    bat: '', bai: '', vio: '', gui: '', tec: '', trom: '',
    vozes: [],
  };
  await salvarCultos([...cultos, novo]);
  return novo;
}
