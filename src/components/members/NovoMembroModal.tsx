import { useState } from 'react';
import { FUNCOES, type Funcao } from '../../data/types';
import { Modal, Field } from '../common/Modal';
import { Button } from '../common/Button';
import { useSchedule } from '../../context/ScheduleContext';
import { useToast } from '../../context/ToastContext';
import styles from './NovoMembroModal.module.css';

interface NovoMembroModalProps {
  onClose: () => void;
}

export function NovoMembroModal({ onClose }: NovoMembroModalProps) {
  const { createMembro } = useSchedule();
  const { showToast } = useToast();
  const [nome, setNome] = useState('');
  const [funcoesSel, setFuncoesSel] = useState<Funcao[]>([]);

  function toggleFuncao(f: Funcao) {
    setFuncoesSel((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  async function handleSalvar() {
    if (!nome.trim() || funcoesSel.length === 0) {
      alert('Preencha o nome e selecione ao menos uma função.');
      return;
    }
    await createMembro({ nome: nome.trim(), funcoes: funcoesSel, disponivel: true });
    showToast(`${nome.trim()} adicionado(a)!`);
    onClose();
  }

  return (
    <Modal
      title="Novo Membro"
      onClose={onClose}
      footer={
        <>
          <Button style={{ flex: 1, justifyContent: 'center' }} onClick={handleSalvar}>Salvar</Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </>
      }
    >
      <Field label="Nome">
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo..." autoFocus />
      </Field>
      <Field label="Funções (selecione uma ou mais)">
        <div className={styles.chips}>
          {FUNCOES.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.chip} ${funcoesSel.includes(f) ? styles.selected : ''}`}
              onClick={() => toggleFuncao(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </Field>
    </Modal>
  );
}
