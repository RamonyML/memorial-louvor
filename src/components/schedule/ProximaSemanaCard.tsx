import type { Culto, InstrumentoKey } from '../../data/types';
import { diaSemana, fmtDia, fmtMes } from '../../utils/date';
import styles from './ProximaSemanaCard.module.css';

const LABEL_CURTO: Record<InstrumentoKey, string> = {
  bat: 'Bat', bai: 'Bai', vio: 'Vio', gui: 'Gui', tec: 'Tec', trom: 'Tpt',
};
const INSTRUMENTOS: InstrumentoKey[] = ['bat', 'bai', 'vio', 'gui', 'tec', 'trom'];

interface ProximaSemanaCardProps {
  culto: Culto;
}

export function ProximaSemanaCard({ culto }: ProximaSemanaCardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.dia} num-display`}>{fmtDia(culto.data)}</div>
      <div className={styles.body}>
        <div className={styles.titulo}>{diaSemana(culto.data)} · {fmtMes(culto.data)}</div>
        <div className={styles.grid}>
          {INSTRUMENTOS.map((key) => (
            <div className={styles.item} key={key}>
              <span className={styles.lbl}>{LABEL_CURTO[key]}</span>
              <span className={styles.val}>{culto[key] || '—'}</span>
            </div>
          ))}
        </div>
        {culto.vozes.length > 0 && (
          <div className={styles.vozes}>Voz&nbsp; {culto.vozes.join(' · ')}</div>
        )}
      </div>
    </div>
  );
}
