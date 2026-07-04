import { useState } from 'react';
import type { Culto, InstrumentoKey } from '../../data/types';
import { INSTRUMENTO_FUNCAO } from '../../data/types';
import { INSTRUMENT_ICONS, IconVoz } from '../icons/InstrumentIcons';
import { Button } from '../common/Button';
import { MaterialIcon } from '../icons/MaterialIcon';
import { useSchedule } from '../../context/ScheduleContext';
import { diaSemana, fmtDia, fmtMes } from '../../utils/date';
import styles from './CultoEditor.module.css';

const INSTRUMENTOS: InstrumentoKey[] = ['bat', 'bai', 'vio', 'gui', 'tec', 'trom'];

interface CultoEditorProps {
  culto: Culto;
}

export function CultoEditor({ culto }: CultoEditorProps) {
  const { membros, updateCulto, addVoz, removeVoz, deleteCulto } = useSchedule();
  const [novaVoz, setNovaVoz] = useState('');

  const disponiveis = membros.filter((m) => m.disponivel);
  const membrosVoz = disponiveis.filter((m) => m.funcoes.includes('Voz') && !culto.vozes.includes(m.nome));

  function handleExcluir() {
    if (confirm('Excluir este culto? Esta ação não pode ser desfeita.')) {
      deleteCulto(culto.id);
    }
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.titulo}>{diaSemana(culto.data)}, {fmtDia(culto.data)} de {fmtMes(culto.data)}</h2>
          <div className={styles.sub}>{culto.titulo}</div>
        </div>
        <Button variant="danger" icon="delete" onClick={handleExcluir}>Excluir culto</Button>
      </div>

      <div className={styles.horarios}>
        <div className={styles.horarioBox}>
          <label>Horário de Ensaio</label>
          <input
            defaultValue={culto.ensaio}
            placeholder="17h15"
            onBlur={(e) => updateCulto(culto.id, { ensaio: e.target.value })}
          />
        </div>
        <div className={styles.horarioBox}>
          <label>Horário do Culto</label>
          <input
            defaultValue={culto.culto}
            placeholder="18h00"
            onBlur={(e) => updateCulto(culto.id, { culto: e.target.value })}
          />
        </div>
      </div>

      <div>
        <div className={styles.sectionTitle}>Instrumentistas</div>
        <div className={styles.instGrid}>
          {INSTRUMENTOS.map((key) => {
            const Icon = INSTRUMENT_ICONS[key];
            const funcao = INSTRUMENTO_FUNCAO[key];
            const opcoes = disponiveis.filter((m) => m.funcoes.includes(funcao));
            return (
              <div className={styles.instCard} key={key}>
                <div className={styles.instIcon}><Icon size={19} /></div>
                <div className={styles.instBody}>
                  <div className={styles.instLabel}>{funcao}</div>
                  <select
                    value={culto[key]}
                    onChange={(e) => updateCulto(culto.id, { [key]: e.target.value })}
                  >
                    <option value="">— selecionar —</option>
                    {opcoes.map((m) => <option key={m.id} value={m.nome}>{m.nome}</option>)}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.vozesSection}>
        <div className={styles.vozesHeader}>
          <div className={styles.instIcon}><IconVoz size={19} /></div>
          <div className={styles.sectionTitle}>Vozes</div>
        </div>
        <div className={styles.chips}>
          {culto.vozes.map((v, i) => (
            <div className={styles.chip} key={v}>
              {v}
              <button onClick={() => removeVoz(culto.id, i)} aria-label={`Remover ${v}`}>
                <MaterialIcon name="close" size={14} />
              </button>
            </div>
          ))}
          {culto.vozes.length === 0 && <span className={styles.semVozes}>Nenhuma voz escalada</span>}
        </div>
        <div className={styles.addVoz}>
          <select value={novaVoz} onChange={(e) => setNovaVoz(e.target.value)}>
            <option value="">+ Adicionar voz...</option>
            {membrosVoz.map((m) => <option key={m.id} value={m.nome}>{m.nome}</option>)}
          </select>
          <Button
            variant="ghost"
            onClick={() => { if (novaVoz) { addVoz(culto.id, novaVoz); setNovaVoz(''); } }}
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
