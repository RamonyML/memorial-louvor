import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { ExportTemplate } from '../components/export/ExportTemplate';
import { ExportTemplatePortrait } from '../components/export/ExportTemplatePortrait';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { MaterialIcon } from '../components/icons/MaterialIcon';
import { useSchedule } from '../context/ScheduleContext';
import { useToast } from '../context/ToastContext';
import { cultosDoMes, diaSemana, fmtDia, fmtMes, labelMes } from '../utils/date';
import styles from './AdminExportPage.module.css';

type Formato = 'paisagem' | 'retrato';

const DIMENSOES: Record<Formato, { width: number; height: number }> = {
  paisagem: { width: 1280, height: 720 },
  retrato: { width: 1080, height: 1920 },
};

export function AdminExportPage() {
  const { cultos } = useSchedule();
  const { showToast } = useToast();
  const hoje = new Date();
  const [mesAtual] = useState({ ano: hoje.getFullYear(), mes: hoje.getMonth() });
  const doMes = cultosDoMes(cultos, mesAtual.ano, mesAtual.mes);
  const [selId, setSelId] = useState<number | null>(doMes[0]?.id ?? null);
  const [formato, setFormato] = useState<Formato>('paisagem');
  const [gerando, setGerando] = useState(false);
  const paisagemRef = useRef<HTMLDivElement>(null);
  const retratoRef = useRef<HTMLDivElement>(null);

  const heroSel = doMes.find((c) => c.id === selId) ?? doMes[0];

  async function handleExportar() {
    const alvo = formato === 'retrato' ? retratoRef.current : paisagemRef.current;
    if (!heroSel || !alvo) return;
    setGerando(true);
    showToast('Gerando imagem...');
    try {
      const { width, height } = DIMENSOES[formato];
      const canvas = await html2canvas(alvo, {
        width,
        height,
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a0a07',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `escala-${heroSel.data}-${formato}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('✓ Imagem baixada!');
    } catch {
      showToast('Erro ao gerar imagem. Tente novamente.');
    } finally {
      setGerando(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <h2>Exportar Escala</h2>

      {doMes.length === 0 ? (
        <EmptyState icon="image_not_supported" title="Nenhum culto neste mês" description="Cadastre um culto na aba Escala para poder exportar." />
      ) : (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Selecione o domingo em destaque</div>
          <div className={styles.list}>
            {doMes.map((c) => (
              <div
                key={c.id}
                className={`${styles.item} ${selId === c.id ? styles.selected : ''}`}
                onClick={() => setSelId(c.id)}
              >
                <div className={`${styles.dia} num-display`}>{fmtDia(c.data)}</div>
                <div>
                  <div className={styles.titulo}>{c.titulo}</div>
                  <div className={styles.sub}>{diaSemana(c.data)} · {fmtMes(c.data)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sectionTitle} style={{ marginTop: 20 }}>Formato da imagem</div>
          <div className={styles.formatos}>
            <button
              className={`${styles.formatoBtn} ${formato === 'paisagem' ? styles.formatoSelected : ''}`}
              onClick={() => setFormato('paisagem')}
            >
              <MaterialIcon name="crop_landscape" size={22} />
              Paisagem
              <span className={styles.formatoHint}>1280 × 720 · desktop</span>
            </button>
            <button
              className={`${styles.formatoBtn} ${formato === 'retrato' ? styles.formatoSelected : ''}`}
              onClick={() => setFormato('retrato')}
            >
              <MaterialIcon name="crop_portrait" size={22} />
              Retrato
              <span className={styles.formatoHint}>1080 × 1920 · status/story</span>
            </button>
          </div>

          <Button variant="gold" icon="download" onClick={handleExportar} disabled={gerando} style={{ width: '100%', justifyContent: 'center', marginTop: 18 }}>
            {gerando ? 'Gerando...' : 'Exportar como Imagem (PNG)'}
          </Button>

          <p className={styles.nota}>
            A imagem exportada tem o layout visual da escala com o domingo selecionado em destaque e os demais como "Próximas Semanas". O formato paisagem é ideal para grupos do WhatsApp; o retrato, para status/stories.
          </p>
        </div>
      )}

      {heroSel && (
        <>
          <ExportTemplate
            ref={paisagemRef}
            hero={heroSel}
            proximas={doMes.filter((c) => c.id !== heroSel.id)}
            mesLabel={labelMes(mesAtual.ano, mesAtual.mes)}
          />
          <ExportTemplatePortrait
            ref={retratoRef}
            hero={heroSel}
            proximas={doMes.filter((c) => c.id !== heroSel.id)}
            mesLabel={labelMes(mesAtual.ano, mesAtual.mes)}
          />
        </>
      )}
    </div>
  );
}
