import type { Culto, Membro } from './types';

export const SEED_MEMBROS: Membro[] = [
  { id: 1, nome: 'Ramony', funcoes: ['Bateria', 'Baixo', 'Violão'], disponivel: true },
  { id: 2, nome: 'Felipe', funcoes: ['Bateria', 'Baixo'], disponivel: true },
  { id: 3, nome: 'Guilherme', funcoes: ['Bateria'], disponivel: true },
  { id: 4, nome: 'Isabela', funcoes: ['Bateria', 'Baixo', 'Violão'], disponivel: true },
  { id: 5, nome: 'Rarisson', funcoes: ['Baixo', 'Violão', 'Guitarra'], disponivel: true },
  { id: 6, nome: 'Davi', funcoes: ['Baixo', 'Violão', 'Guitarra'], disponivel: true },
  { id: 7, nome: 'Victor', funcoes: ['Teclado'], disponivel: true },
  { id: 8, nome: 'Sarah', funcoes: ['Teclado'], disponivel: true },
  { id: 9, nome: 'Van', funcoes: ['Voz'], disponivel: true },
  { id: 10, nome: 'Marilda', funcoes: ['Voz'], disponivel: true },
  { id: 11, nome: 'Juliana', funcoes: ['Voz'], disponivel: true },
  { id: 12, nome: 'Rui', funcoes: ['Voz'], disponivel: true },
  { id: 13, nome: 'Robson', funcoes: ['Voz'], disponivel: true },
  { id: 14, nome: 'Monteiro', funcoes: ['Trompete'], disponivel: true },
];

export const SEED_CULTOS: Culto[] = [
  {
    id: 1, titulo: 'Culto Domingo Noite', data: '2026-07-05', ensaio: '17h15', culto: '18h00',
    bat: 'Ramony', bai: 'Isabela', vio: 'Rarisson', gui: 'Davi', tec: 'Victor', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
  {
    id: 2, titulo: 'Culto Domingo Noite', data: '2026-07-12', ensaio: '17h15', culto: '18h00',
    bat: 'Felipe', bai: 'Ramony', vio: 'Isabela', gui: 'Rarisson', tec: 'Sarah', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
  {
    id: 3, titulo: 'Culto Domingo Noite', data: '2026-07-19', ensaio: '17h15', culto: '18h00',
    bat: 'Guilherme', bai: 'Isabela', vio: 'Ramony', gui: 'Davi', tec: 'Victor', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
  {
    id: 4, titulo: 'Culto Domingo Noite', data: '2026-07-26', ensaio: '17h15', culto: '18h00',
    bat: 'Isabela', bai: 'Felipe', vio: 'Davi', gui: 'Rarisson', tec: 'Sarah', trom: 'Monteiro',
    vozes: ['Van', 'Marilda', 'Juliana', 'Rui', 'Robson'],
  },
];
