export type Funcao =
  | 'Bateria'
  | 'Baixo'
  | 'Violão'
  | 'Guitarra'
  | 'Teclado'
  | 'Voz'
  | 'Trompete';

export const FUNCOES: Funcao[] = [
  'Bateria',
  'Baixo',
  'Violão',
  'Guitarra',
  'Teclado',
  'Voz',
  'Trompete',
];

export interface Membro {
  id: number;
  nome: string;
  funcoes: Funcao[];
  disponivel: boolean;
}

/** chaves de instrumento usadas no registro de um culto */
export type InstrumentoKey = 'bat' | 'bai' | 'vio' | 'gui' | 'tec' | 'trom';

export const INSTRUMENTO_FUNCAO: Record<InstrumentoKey, Funcao> = {
  bat: 'Bateria',
  bai: 'Baixo',
  vio: 'Violão',
  gui: 'Guitarra',
  tec: 'Teclado',
  trom: 'Trompete',
};

export interface Culto {
  id: number;
  titulo: string;
  /** ISO yyyy-mm-dd */
  data: string;
  ensaio: string;
  culto: string;
  bat: string;
  bai: string;
  vio: string;
  gui: string;
  tec: string;
  trom: string;
  vozes: string[];
}

export type NovoCulto = Omit<Culto, 'id' | 'bat' | 'bai' | 'vio' | 'gui' | 'tec' | 'trom' | 'vozes'>;
export type NovoMembro = Omit<Membro, 'id'>;
