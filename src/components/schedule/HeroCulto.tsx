import type { Culto, InstrumentoKey } from '../../data/types';
import { INSTRUMENTO_FUNCAO } from '../../data/types';
import { INSTRUMENT_ICONS, IconVoz } from '../icons/InstrumentIcons';
import { diaSemana, fmtDia, fmtMes, hojeISO } from '../../utils/date';
import styles from './HeroCulto.module.css';

const INSTRUMENTOS: InstrumentoKey[] = ['bat', 'bai', 'vio', 'gui', 'tec', 'trom'];

interface HeroCultoProps {
  culto: Culto;
}

export function HeroCulto({ culto }: HeroCultoProps) {
  const isHoje = culto.data === hojeISO();

  return (
    <div className={styles.hero}>
      <div className={styles.badge}>{isHoje ? 'HOJE' : 'PRÓXIMO DOMINGO'}</div>

      <div className={styles.top}>
        <div className={`${styles.dia} num-display`}>{fmtDia(culto.data)}</div>
        <div className={styles.topInfo}>
          <div className={styles.diaSemana}>{diaSemana(culto.data)}</div>
          <div className={styles.mes}>{fmtMes(culto.data)} · {culto.titulo}</div>
          <div className={styles.horarios}>
            <span><em>Ensaio</em><strong>{culto.ensaio || '--'}</strong></span>
            <span><em>Culto</em><strong>{culto.culto || '--'}</strong></span>
          </div>
        </div>
      </div>

      <div className={styles.instGrid}>
        {INSTRUMENTOS.map((key) => {
          const Icon = INSTRUMENT_ICONS[key];
          const nome = culto[key];
          return (
            <div className={styles.instItem} key={key}>
              <div className={styles.instIcon}><Icon size={20} /></div>
              <div>
                <div className={styles.instLabel}>{INSTRUMENTO_FUNCAO[key]}</div>
                <div className={styles.instNome}>{nome || '—'}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.vozes}>
        <div className={styles.instIcon}><IconVoz size={20} /></div>
        <div className={styles.vozesBody}>
          <div className={styles.instLabel}>Vozes</div>
          <div className={styles.vozesChips}>
            {culto.vozes.length > 0
              ? culto.vozes.map((v) => <span key={v} className={styles.chip}>{v}</span>)
              : <span className={styles.semVozes}>Nenhuma voz escalada</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
