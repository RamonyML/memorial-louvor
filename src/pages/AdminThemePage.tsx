import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { MaterialIcon } from '../components/icons/MaterialIcon';
import styles from './AdminThemePage.module.css';

export function AdminThemePage() {
  const { tema, temas, setTema } = useTheme();
  const { showToast } = useToast();

  function escolher(id: string, nome: string) {
    if (id === tema.id) return;
    setTema(id);
    showToast(`Tema "${nome}" aplicado para todo mundo!`);
  }

  return (
    <div className={styles.wrap}>
      <h2>Tema do App</h2>
      <p className={styles.nota}>
        Escolha a paleta de cores do sistema. A mudança vale para a escala pública e a área
        administrativa, para todo mundo que acessar — não é só uma preferência sua.
      </p>

      <div className={styles.grid}>
        {temas.map((t) => {
          const ativo = t.id === tema.id;
          return (
            <button
              key={t.id}
              className={`${styles.card} ${ativo ? styles.ativo : ''}`}
              onClick={() => escolher(t.id, t.nome)}
            >
              <div className={styles.swatches}>
                {t.amostra.map((cor, i) => (
                  <span key={i} className={styles.swatch} style={{ background: cor }} />
                ))}
              </div>
              <div className={styles.rodape}>
                <span className={styles.nome}>{t.nome}</span>
                <span className={styles.modo}>{t.modo === 'dark' ? 'escuro' : 'claro'}</span>
              </div>
              {ativo && (
                <div className={styles.badgeAtivo}>
                  <MaterialIcon name="check" size={14} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
