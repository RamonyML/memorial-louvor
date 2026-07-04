import { useEffect, useState } from 'react';
import { CultoList } from '../components/schedule/CultoList';
import { CultoEditor } from '../components/schedule/CultoEditor';
import { NovoCultoModal } from '../components/schedule/NovoCultoModal';
import { EmptyState } from '../components/common/EmptyState';
import { useSchedule } from '../context/ScheduleContext';
import { useToast } from '../context/ToastContext';
import { cultosDoMes, proximoCulto } from '../utils/date';
import styles from './AdminSchedulePage.module.css';

export function AdminSchedulePage() {
  const { cultos, loading, gerarDomingosDoMes } = useSchedule();
  const { showToast } = useToast();
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState({ ano: hoje.getFullYear(), mes: hoje.getMonth() });
  const [cultoSelId, setCultoSelId] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [inicializado, setInicializado] = useState(false);

  useEffect(() => {
    if (loading || inicializado || cultos.length === 0) return;
    const prox = proximoCulto(cultos);
    if (prox) {
      const [ano, mes] = prox.data.split('-').map(Number);
      setMesAtual({ ano, mes: mes - 1 });
      setCultoSelId(prox.id);
    }
    setInicializado(true);
  }, [loading, inicializado, cultos]);

  const doMes = cultosDoMes(cultos, mesAtual.ano, mesAtual.mes);
  const cultoSel = cultos.find((c) => c.id === cultoSelId) ?? null;

  async function handleGerarDomingos() {
    const criados = await gerarDomingosDoMes(mesAtual.ano, mesAtual.mes);
    showToast(
      criados > 0
        ? `${criados} domingo${criados > 1 ? 's' : ''} criado${criados > 1 ? 's' : ''}!`
        : 'Todos os domingos deste mês já estão cadastrados.'
    );
  }

  return (
    <div className={styles.wrap}>
      <CultoList
        cultos={doMes}
        ano={mesAtual.ano}
        mes={mesAtual.mes}
        selecionadoId={cultoSelId}
        onMudarMes={(ano, mes) => { setMesAtual({ ano, mes }); setCultoSelId(null); }}
        onSelecionar={setCultoSelId}
        onNovo={() => setModalAberto(true)}
        onGerarDomingos={handleGerarDomingos}
      />

      {cultoSel ? (
        <CultoEditor culto={cultoSel} />
      ) : (
        <div className={styles.emptyWrap}>
          <EmptyState
            icon="event_note"
            title="Selecione um culto"
            description="Clique em um domingo na lista ao lado para editar a escala, ou crie um novo culto."
          />
        </div>
      )}

      {modalAberto && (
        <NovoCultoModal
          onClose={() => setModalAberto(false)}
          onCriado={(id) => {
            setModalAberto(false);
            setCultoSelId(id);
          }}
        />
      )}
    </div>
  );
}
