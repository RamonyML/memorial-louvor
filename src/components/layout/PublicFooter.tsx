import { IconGitHub } from '../icons/IconGitHub';
import styles from './PublicFooter.module.css';

export function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.texto}>
          <p><strong>Igreja Batista Memorial</strong> - R. Jorge Cauhi, 455 - Planalto, Uberlândia - MG</p>
          <p>
            <strong>© 2026 Ramony Lima – Todos os direitos reservados.</strong>
            <br />
            Esta aplicação está protegida pela Lei nº 9.609/1998 (Lei de Software – Brasil), que
            assegura os direitos autorais do desenvolvedor.
          </p>
        </div>
        <a
          href="https://github.com/RamonyML"
          target="_blank"
          rel="noreferrer"
          className={styles.github}
          aria-label="Perfil do desenvolvedor no GitHub"
        >
          <IconGitHub size={18} />
        </a>
      </div>
    </footer>
  );
}
