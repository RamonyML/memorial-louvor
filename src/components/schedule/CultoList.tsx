import type { Culto } from '../../data/types';
import { MonthNav } from './MonthNav';
import { Button } from '../common/Button';
import { diaSemana, fmtDia, fmtMes, hojeISO } from '../../utils/date';
import styles from './CultoList.module.css';

interface CultoListProps {
  cultos: Culto[];
  ano: number;
  mes: number;
  selecionadoId: string | null;
  onMudarMes: (ano: number, mes: number) => void;
  onSelecionar: (id: string) => void;
  onNovo: () => void;
  onGerarDomingos: () => void;
}

export function CultoList({ cultos, ano, mes, selecionadoId, onMudarMes, onSelecionar, onNovo, onGerarDomingos }: CultoListProps) {
  const hj = hojeISO();

  return (
    <aside className={styles.sidebar}>
      <MonthNav ano={ano} mes={mes} onChange={onMudarMes} />

      <div className={styles.list}>
        {cultos.length === 0 && <p className={styles.vazio}>Nenhum culto neste mês</p>}
        {cultos.map((c) => {
          const isHoje = c.data === hj;
          const isVazio = !c.bat && !c.bai;
          const selecionado = c.id === selecionadoId;
          return (
            <div
              key={c.id}
              className={`${styles.item} ${selecionado ? styles.selected : ''} ${isHoje ? styles.hoje : ''}`}
              onClick={() => onSelecionar(c.id)}
            >
              <div className={`${styles.dia} num-display`}>{fmtDia(c.data)}</div>
              <div className={styles.info}>
                <div className={styles.titulo}>{c.titulo}</div>
                <div className={styles.sub}>{diaSemana(c.data, true)} · {fmtMes(c.data)} · {c.culto || '--'}</div>
              </div>
              {isHoje && <span className={styles.badgeHoje}>HOJE</span>}
              {isVazio && !isHoje && <span className={styles.badgeVazio}>vazio</span>}
            </div>
          );
        })}
      </div>

      <Button variant="ghost" icon="add" onClick={onNovo} style={{ width: '100%', justifyContent: 'center' }}>
        Novo culto
      </Button>
      <Button
        variant="ghost"
        icon="auto_awesome"
        onClick={onGerarDomingos}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        Gerar domingos do mês
      </Button>
    </aside>
  );
}
