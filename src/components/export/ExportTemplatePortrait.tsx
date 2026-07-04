import { forwardRef } from 'react';
import type { Culto, InstrumentoKey } from '../../data/types';
import { INSTRUMENTO_FUNCAO } from '../../data/types';
import { fmtDia, fmtMes, hojeISO } from '../../utils/date';
import styles from './ExportTemplatePortrait.module.css';

const INSTRUMENTOS: InstrumentoKey[] = ['bat', 'bai', 'vio', 'gui', 'tec', 'trom'];
const LABEL_CURTO: Record<InstrumentoKey, string> = {
  bat: 'BAT', bai: 'BAI', vio: 'VIO', gui: 'GUI', tec: 'TEC', trom: 'TPT',
};

interface ExportTemplatePortraitProps {
  hero: Culto;
  proximas: Culto[];
  mesLabel: string;
}

export const ExportTemplatePortrait = forwardRef<HTMLDivElement, ExportTemplatePortraitProps>(
  function ExportTemplatePortrait({ hero, proximas, mesLabel }, ref) {
    const isHoje = hero.data === hojeISO();
    const slots = [...proximas];
    while (slots.length < 3) slots.push(null as unknown as Culto);

    return (
      <div ref={ref} className={styles.canvas}>
        <div className={styles.header}>
          <div className={styles.titulo}>Escala</div>
          <div className={styles.subtitulo}>Louvor &amp; Adoração · Igreja Batista Memorial</div>
          <div className={styles.mesRow}>
            <div className={styles.mes}>{mesLabel}</div>
            <div className={styles.mesSub}>Domingo à Noite</div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.hero}>
            <div className={styles.badge}>{isHoje ? 'HOJE' : 'PRÓXIMO'}</div>
            <div className={`${styles.dia} num-display`}>{fmtDia(hero.data)}</div>
            <div className={styles.diaInfo}>
              <div className={styles.diaLabel}>DOMINGO · {fmtMes(hero.data).toUpperCase()}</div>
              <div className={styles.horarios}>
                <div className={styles.horItem}><span>Ensaio</span><strong>{hero.ensaio || '--'}</strong></div>
                <div className={styles.horItem}><span>Culto</span><strong>{hero.culto || '--'}</strong></div>
              </div>
            </div>

            <div className={styles.cards}>
              {INSTRUMENTOS.map((key) => (
                <div className={styles.card} key={key}>
                  <div className={styles.cardLbl}>{INSTRUMENTO_FUNCAO[key]}</div>
                  <div className={styles.cardNome}>{hero[key] || '—'}</div>
                </div>
              ))}
            </div>

            <div className={styles.vozes}>
              <div className={styles.vozesLbl}>VOZES</div>
              <div className={styles.vozesChips}>
                {hero.vozes.map((v) => <div className={styles.vozChip} key={v}>{v}</div>)}
              </div>
            </div>
          </div>

          <div className={styles.proximas}>
            <div className={styles.proxTitulo}>PRÓXIMAS SEMANAS</div>
            <div className={styles.proxCards}>
              {slots.map((c, i) =>
                c ? (
                  <div className={styles.proxCard} key={c.id}>
                    <div className={`${styles.proxDia} num-display`}>{fmtDia(c.data)}</div>
                    <div className={styles.proxInsts}>
                      <div className={styles.proxRow}>
                        <span className={styles.proxLbl}>{LABEL_CURTO.bat}</span><span>{c.bat || '—'}</span>
                        <span className={styles.proxLbl}>{LABEL_CURTO.bai}</span><span>{c.bai || '—'}</span>
                      </div>
                      <div className={styles.proxRow}>
                        <span className={styles.proxLbl}>{LABEL_CURTO.vio}</span><span>{c.vio || '—'}</span>
                        <span className={styles.proxLbl}>{LABEL_CURTO.gui}</span><span>{c.gui || '—'}</span>
                      </div>
                      <div className={styles.proxRow}>
                        <span className={styles.proxLbl}>{LABEL_CURTO.tec}</span><span>{c.tec || '—'}</span>
                        <span className={styles.proxLbl}>{LABEL_CURTO.trom}</span><span>{c.trom || '—'}</span>
                      </div>
                      <div className={styles.proxVoz}>VOZ &nbsp;{c.vozes.join(' · ')}</div>
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.proxCard} ${styles.proxCardVazio}`} key={`vazio-${i}`}>
                    <div className={`${styles.proxDia} num-display`}>—</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.aviso}>Informe indisponibilidade com até uma semana de antecedência</div>
          <div className={styles.marca}>memorial / igreja batista</div>
        </div>
      </div>
    );
  }
);
