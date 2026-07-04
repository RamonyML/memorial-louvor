import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PublicFooter } from '../components/layout/PublicFooter';
import { MonthNav } from '../components/schedule/MonthNav';
import { HeroCulto } from '../components/schedule/HeroCulto';
import { ProximaSemanaCard } from '../components/schedule/ProximaSemanaCard';
import { EmptyState } from '../components/common/EmptyState';
import { MaterialIcon } from '../components/icons/MaterialIcon';
import { useSchedule } from '../context/ScheduleContext';
import { cultosDoMes, hojeISO } from '../utils/date';
import styles from './PublicSchedulePage.module.css';

export function PublicSchedulePage() {
  const { cultos, loading } = useSchedule();
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState({ ano: hoje.getFullYear(), mes: hoje.getMonth() });
  const [inicializado, setInicializado] = useState(false);

  useEffect(() => {
    if (loading || inicializado || cultos.length === 0) return;
    const hj = hojeISO();
    const ordenados = [...cultos].sort((a, b) => a.data.localeCompare(b.data));
    const proximo = ordenados.find((c) => c.data >= hj) ?? ordenados[ordenados.length - 1];
    const [ano, mes] = proximo.data.split('-').map(Number);
    setMesAtual({ ano, mes: mes - 1 });
    setInicializado(true);
  }, [loading, inicializado, cultos]);

  const doMes = cultosDoMes(cultos, mesAtual.ano, mesAtual.mes);
  const hj = hojeISO();
  const proximoNoMes = doMes.find((c) => c.data >= hj);
  const [hero, ...resto] = proximoNoMes
    ? [proximoNoMes, ...doMes.filter((c) => c.id !== proximoNoMes.id)]
    : doMes;

  return (
    <div className={styles.page}>
      <Header
        right={
          <Link to="/admin" className={styles.adminLink}>
            <MaterialIcon name="lock" size={16} />
            Área administrativa
          </Link>
        }
      />

      <main className={styles.main}>
        <div className={styles.topBar}>
          <MonthNav
            ano={mesAtual.ano}
            mes={mesAtual.mes}
            onChange={(ano, mes) => setMesAtual({ ano, mes })}
          />
        </div>

        {!loading && doMes.length === 0 && (
          <EmptyState
            icon="event_busy"
            title="Nenhum culto neste mês"
            description="Navegue para outro mês usando as setas acima."
          />
        )}

        {hero && (
          <div className={styles.grid}>
            <HeroCulto culto={hero} />
            <aside className={styles.sidebar}>
              <div className={styles.sidebarTitle}>Próximas Semanas</div>
              <div className={styles.sidebarList}>
                {resto.length > 0
                  ? resto.map((c) => <ProximaSemanaCard culto={c} key={c.id} />)
                  : <p className={styles.semProximas}>Nenhuma outra semana cadastrada neste mês.</p>}
              </div>
            </aside>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
