import { useState } from 'react';
import { Modal, Field } from '../common/Modal';
import { Button } from '../common/Button';
import { useSchedule } from '../../context/ScheduleContext';
import { useToast } from '../../context/ToastContext';

interface NovoCultoModalProps {
  onClose: () => void;
  onCriado: (id: number) => void;
}

export function NovoCultoModal({ onClose, onCriado }: NovoCultoModalProps) {
  const { createCulto } = useSchedule();
  const { showToast } = useToast();
  const [titulo, setTitulo] = useState('Culto Domingo Noite');
  const [data, setData] = useState('');
  const [culto, setCulto] = useState('18h00');
  const [ensaio, setEnsaio] = useState('17h15');

  async function handleSalvar() {
    if (!titulo.trim() || !data) {
      alert('Preencha título e data.');
      return;
    }
    const novo = await createCulto({ titulo: titulo.trim(), data, culto, ensaio });
    showToast('Culto criado!');
    onCriado(novo.id);
  }

  return (
    <Modal
      title="Novo Culto"
      onClose={onClose}
      footer={
        <>
          <Button style={{ flex: 1, justifyContent: 'center' }} onClick={handleSalvar}>Salvar</Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </>
      }
    >
      <Field label="Título">
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Field label="Data">
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </Field>
        <Field label="Horário Culto">
          <input value={culto} onChange={(e) => setCulto(e.target.value)} />
        </Field>
      </div>
      <Field label="Horário Ensaio">
        <input value={ensaio} onChange={(e) => setEnsaio(e.target.value)} />
      </Field>
    </Modal>
  );
}
