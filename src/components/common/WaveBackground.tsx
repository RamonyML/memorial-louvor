import styles from './WaveBackground.module.css';

/** Fundo animado fixo, atrás de todo o conteúdo do app. Puramente decorativo. */
export function WaveBackground() {
  return (
    <div className={styles.wave} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
