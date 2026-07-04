import { MaterialIcon } from '../icons/MaterialIcon';
import { labelMes } from '../../utils/date';
import styles from './MonthNav.module.css';

interface MonthNavProps {
  ano: number;
  mes: number;
  onChange: (ano: number, mes: number) => void;
}

export function MonthNav({ ano, mes, onChange }: MonthNavProps) {
  function mudar(dir: number) {
    let novoMes = mes + dir;
    let novoAno = ano;
    if (novoMes < 0) { novoMes = 11; novoAno -= 1; }
    if (novoMes > 11) { novoMes = 0; novoAno += 1; }
    onChange(novoAno, novoMes);
  }

  return (
    <div className={styles.nav}>
      <button className={styles.arrow} onClick={() => mudar(-1)} aria-label="Mês anterior">
        <MaterialIcon name="chevron_left" />
      </button>
      <h2 className={styles.label}>{labelMes(ano, mes)}</h2>
      <button className={styles.arrow} onClick={() => mudar(1)} aria-label="Próximo mês">
        <MaterialIcon name="chevron_right" />
      </button>
    </div>
  );
}
