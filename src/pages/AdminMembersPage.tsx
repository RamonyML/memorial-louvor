import { useState } from 'react';
import { MemberCard } from '../components/members/MemberCard';
import { NovoMembroModal } from '../components/members/NovoMembroModal';
import { Button } from '../components/common/Button';
import { useSchedule } from '../context/ScheduleContext';
import styles from './AdminMembersPage.module.css';

export function AdminMembersPage() {
  const { membros, toggleDisponivel } = useSchedule();
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div>
      <div className={styles.header}>
        <h2>Equipe do Ministério</h2>
        <Button icon="person_add" onClick={() => setModalAberto(true)}>Novo Membro</Button>
      </div>

      <div className={styles.grid}>
        {membros.map((m) => (
          <MemberCard key={m.id} membro={m} onToggleDisponivel={toggleDisponivel} />
        ))}
      </div>

      {modalAberto && <NovoMembroModal onClose={() => setModalAberto(false)} />}
    </div>
  );
}
