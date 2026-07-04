import type { Culto } from '../data/types';

export const MESES_NOMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function hojeISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function diaSemana(iso: string, curto = false): string {
  const nome = DIAS_SEMANA[new Date(`${iso}T12:00:00`).getDay()];
  return curto ? nome.slice(0, 3).toUpperCase() : nome;
}

export function fmtDia(iso: string): string {
  return iso.split('-')[2];
}

export function fmtMes(iso: string): string {
  return MESES_NOMES[parseInt(iso.split('-')[1], 10) - 1];
}

export function labelMes(ano: number, mes: number): string {
  return `${MESES_NOMES[mes]} ${ano}`;
}

export function cultosDoMes(cultos: Culto[], ano: number, mes: number): Culto[] {
  const pref = `${ano}-${String(mes + 1).padStart(2, '0')}`;
  return cultos.filter((c) => c.data.startsWith(pref)).sort((a, b) => a.data.localeCompare(b.data));
}

export function proximoCulto(cultos: Culto[]): Culto | undefined {
  const hj = hojeISO();
  const ordenados = [...cultos].sort((a, b) => a.data.localeCompare(b.data));
  return ordenados.find((c) => c.data >= hj) ?? ordenados[ordenados.length - 1];
}

/** Todas as datas (ISO) de domingo dentro do mês informado (mes é 0-indexado). */
export function domingosDoMes(ano: number, mes: number): string[] {
  const domingos: string[] = [];
  const data = new Date(ano, mes, 1);
  while (data.getMonth() === mes) {
    if (data.getDay() === 0) {
      const y = data.getFullYear();
      const m = String(data.getMonth() + 1).padStart(2, '0');
      const d = String(data.getDate()).padStart(2, '0');
      domingos.push(`${y}-${m}-${d}`);
    }
    data.setDate(data.getDate() + 1);
  }
  return domingos;
}
