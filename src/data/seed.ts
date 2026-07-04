import type { Culto, Membro } from './types';

type SeedMembro = Omit<Membro, 'id'>;
type SeedCulto = Omit<Culto, 'id'>;

/** Dados usados para popular o Firestore automaticamente na primeira vez que o banco estiver vazio. */
export const SEED_MEMBROS: SeedMembro[] = [
  { nome: 'Ramony', funcoes: ['Bateria', 'Baixo', 'Violão'], disponivel: true },
  { nome: 'Felipe', funcoes: ['Bateria', 'Baixo'], disponivel: true },
  { nome: 'Guilherme', funcoes: ['Bateria'], disponivel: true },
  { nome: 'Isabela', funcoes: ['Bateria', 'Baixo', 'Violão'], disponivel: true },
  { nome: 'Rarisson', funcoes: ['Baixo', 'Violão', 'Guitarra'], disponivel: true },
  { nome: 'Davi', funcoes: ['Baixo', 'Violão', 'Guitarra'], disponivel: true },
  { nome: 'Victor', funcoes: ['Teclado'], disponivel: true },
  { nome: 'Sarah', funcoes: ['Teclado'], disponivel: true },
  { nome: 'Van', funcoes: ['Voz'], disponivel: true },
  { nome: 'Marilda', funcoes: ['Voz'], disponivel: true },
  { nome: 'Juliana', funcoes: ['Voz'], disponivel: true },
  { nome: 'Rui', funcoes: ['Voz'], disponivel: true },
  { nome: 'Robson', funcoes: ['Voz'], disponivel: true },
  { nome: 'Monteiro', funcoes: ['Trompete'], disponivel: true },
];

export const SEED_CULTOS: SeedCulto[] = [
  {
    titulo: 'Culto Domingo Noite', data: '2026-07-05', ensaio: '17h15', culto: '18h00',
    bat: 'Ramony', bai: 'Isabela', vio: 'Rarisson', gui: 'Davi', tec: 'Victor', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
  {
    titulo: 'Culto Domingo Noite', data: '2026-07-12', ensaio: '17h15', culto: '18h00',
    bat: 'Felipe', bai: 'Ramony', vio: 'Isabela', gui: 'Rarisson', tec: 'Sarah', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
  {
    titulo: 'Culto Domingo Noite', data: '2026-07-19', ensaio: '17h15', culto: '18h00',
    bat: 'Guilherme', bai: 'Isabela', vio: 'Ramony', gui: 'Davi', tec: 'Victor', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
  {
    titulo: 'Culto Domingo Noite', data: '2026-07-26', ensaio: '17h15', culto: '18h00',
    bat: 'Isabela', bai: 'Felipe', vio: 'Davi', gui: 'Rarisson', tec: 'Sarah', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
];
