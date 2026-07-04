import type { ReactNode } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  right?: ReactNode;
}

export function Header({ right }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>Ministério de Louvor</div>
        <div className={styles.sub}>Igreja Batista Memorial</div>
      </div>
      <div className={styles.right}>{right}</div>
    </header>
  );
}
