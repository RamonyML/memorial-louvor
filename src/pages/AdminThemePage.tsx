import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { MaterialIcon } from '../components/icons/MaterialIcon';
import { Button } from '../components/common/Button';
import { applyTheme } from '../theme/applyTheme';
import { getTheme } from '../theme/themes';
import styles from './AdminThemePage.module.css';

export function AdminThemePage() {
  const { tema, temas, setTema } = useTheme();
  const { showToast } = useToast();
  const [previaId, setPreviaId] = useState(tema.id);
  const temaRef = useRef(tema);

  useEffect(() => { temaRef.current = tema; }, [tema]);

  // pré-visualiza na hora (só nesta aba); se sair sem aplicar, volta pro tema real
  useEffect(() => {
    applyTheme(getTheme(previaId));
  }, [previaId]);

  useEffect(() => {
    return () => applyTheme(temaRef.current);
  }, []);

  function aplicar() {
    setTema(previaId);
    showToast(`Tema "${getTheme(previaId).nome}" aplicado para todo mundo!`);
  }

  const alterado = previaId !== tema.id;

  return (
    <div className={styles.wrap}>
      <h2>Tema do App</h2>
      <p className={styles.nota}>
        Escolha a paleta de cores do sistema — a prévia aparece na hora só pra você. Clique em
        "Aplicar" para valer na escala pública e na área administrativa para todo mundo.
      </p>

      <div className={styles.grid}>
        {temas.map((t) => {
          const selecionado = t.id === previaId;
          const ehAtual = t.id === tema.id;
          return (
            <button
              key={t.id}
              className={`${styles.card} ${selecionado ? styles.ativo : ''}`}
              onClick={() => setPreviaId(t.id)}
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
              {alterado && ehAtual && <div className={styles.tagAtual}>atual</div>}
              {selecionado && (
                <div className={styles.badgeAtivo}>
                  <MaterialIcon name="check" size={14} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Button
        icon="check_circle"
        disabled={!alterado}
        onClick={aplicar}
        style={{ marginTop: 20 }}
      >
        {alterado ? 'Aplicar tema para todo mundo' : 'Este já é o tema atual'}
      </Button>
    </div>
  );
}
