import { IconGitHub } from '../icons/IconGitHub';
import styles from './DevCredit.module.css';

export function DevCredit() {
  return (
    <a
      href="https://github.com/RamonyML"
      target="_blank"
      rel="noreferrer"
      className={styles.credito}
    >
      Desenvolvido por Ramony Lima
      <IconGitHub size={14} />
    </a>
  );
}
