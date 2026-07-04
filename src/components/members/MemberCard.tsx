import type { Funcao, Membro } from '../../data/types';
import { MaterialIcon } from '../icons/MaterialIcon';
import styles from './MemberCard.module.css';

const CORES: Partial<Record<Funcao, string>> = {
  Bateria: styles.tagIndigo,
  Violão: styles.tagIndigo,
  Trompete: styles.tagIndigo,
  Baixo: styles.tagTeal,
  Guitarra: styles.tagTeal,
  Teclado: styles.tagAmber,
  Voz: styles.tagAmber,
};

interface MemberCardProps {
  membro: Membro;
  onToggleDisponivel: (id: string) => void;
}

export function MemberCard({ membro, onToggleDisponivel }: MemberCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.nome}>{membro.nome}</div>
      <div className={styles.funcoes}>
        {membro.funcoes.map((f) => (
          <span key={f} className={`${styles.tag} ${CORES[f] ?? styles.tagIndigo}`}>{f}</span>
        ))}
      </div>
      <button
        className={`${styles.toggle} ${membro.disponivel ? styles.on : styles.off}`}
        onClick={() => onToggleDisponivel(membro.id)}
      >
        <MaterialIcon name={membro.disponivel ? 'check_circle' : 'cancel'} size={16} />
        {membro.disponivel ? 'Disponível' : 'Indisponível'}
      </button>
    </div>
  );
}
