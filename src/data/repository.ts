import {
  collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc,
  arrayUnion, arrayRemove, writeBatch, getDocs, type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Culto, Membro, NovoCulto, NovoMembro } from './types';
import { SEED_CULTOS, SEED_MEMBROS } from './seed';
import { domingosDoMes } from '../utils/date';

/**
 * Camada de acesso a dados — Firestore. As telas não sabem que o banco
 * é o Firestore; se um dia trocar de backend, só este arquivo muda.
 */

const cultosCol = collection(db, 'cultos');
const membrosCol = collection(db, 'membros');

// ── SEED (roda uma vez, só se o banco estiver vazio) ────────────
export async function seedSeVazio(): Promise<void> {
  const [cSnap, mSnap] = await Promise.all([getDocs(cultosCol), getDocs(membrosCol)]);
  if (!cSnap.empty || !mSnap.empty) return;

  const batch = writeBatch(db);
  SEED_MEMBROS.forEach((m) => batch.set(doc(membrosCol), m));
  SEED_CULTOS.forEach((c) => batch.set(doc(cultosCol), c));
  await batch.commit();
}

// ── MEMBROS ──────────────────────────────────────────────────
export function subscribeMembros(cb: (membros: Membro[]) => void): Unsubscribe {
  return onSnapshot(membrosCol, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Membro));
  });
}

export async function criarMembro(dados: NovoMembro): Promise<string> {
  const ref = await addDoc(membrosCol, dados);
  return ref.id;
}

export async function atualizarDisponibilidade(id: string, disponivel: boolean): Promise<void> {
  await updateDoc(doc(db, 'membros', id), { disponivel });
}

// ── CULTOS ───────────────────────────────────────────────────
export function subscribeCultos(cb: (cultos: Culto[]) => void): Unsubscribe {
  return onSnapshot(cultosCol, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Culto));
  });
}

export async function criarCulto(dados: NovoCulto): Promise<string> {
  const ref = await addDoc(cultosCol, {
    ...dados, bat: '', bai: '', vio: '', gui: '', tec: '', trom: '', vozes: [],
  });
  return ref.id;
}

export async function atualizarCulto(id: string, patch: Partial<Culto>): Promise<void> {
  const { id: _ignorado, ...campos } = patch;
  await updateDoc(doc(db, 'cultos', id), campos);
}

export async function excluirCulto(id: string): Promise<void> {
  await deleteDoc(doc(db, 'cultos', id));
}

export async function adicionarVoz(cultoId: string, nome: string): Promise<void> {
  await updateDoc(doc(db, 'cultos', cultoId), { vozes: arrayUnion(nome) });
}

export async function removerVoz(cultoId: string, nome: string): Promise<void> {
  await updateDoc(doc(db, 'cultos', cultoId), { vozes: arrayRemove(nome) });
}

/** Cria um culto para cada domingo do mês que ainda não existir (datasExistentes já vem do estado atual). */
export async function gerarDomingosDoMes(ano: number, mes: number, datasExistentes: string[]): Promise<number> {
  const faltantes = domingosDoMes(ano, mes).filter((data) => !datasExistentes.includes(data));
  if (faltantes.length === 0) return 0;

  const batch = writeBatch(db);
  faltantes.forEach((data) => {
    batch.set(doc(cultosCol), {
      titulo: 'Culto Domingo Noite', data, ensaio: '17h15', culto: '18h00',
      bat: '', bai: '', vio: '', gui: '', tec: '', trom: '', vozes: [],
    });
  });
  await batch.commit();
  return faltantes.length;
}
