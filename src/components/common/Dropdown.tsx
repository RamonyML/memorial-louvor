import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MaterialIcon } from '../icons/MaterialIcon';
import styles from './Dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  /** ghost: sem borda/fundo, pra usar dentro de cards (ex: instrumentistas) */
  variant?: 'default' | 'ghost';
}

export function Dropdown({ value, onChange, options, placeholder = '— selecionar —', variant = 'default' }: DropdownProps) {
  const [aberto, setAberto] = useState(false);
  const [posicao, setPosicao] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;

    function atualizarPosicao() {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setPosicao({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    atualizarPosicao();

    function aoClicarFora(e: MouseEvent) {
      const alvo = e.target as Node;
      if (triggerRef.current?.contains(alvo) || listaRef.current?.contains(alvo)) return;
      setAberto(false);
    }
    function aoRolar() {
      setAberto(false);
    }

    document.addEventListener('mousedown', aoClicarFora);
    window.addEventListener('scroll', aoRolar, true);
    window.addEventListener('resize', atualizarPosicao);
    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      window.removeEventListener('scroll', aoRolar, true);
      window.removeEventListener('resize', atualizarPosicao);
    };
  }, [aberto]);

  const selecionado = options.find((o) => o.value === value);

  function escolher(v: string) {
    onChange(v);
    setAberto(false);
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        ref={triggerRef}
        className={`${styles.trigger} ${variant === 'ghost' ? styles.ghost : ''}`}
        onClick={() => setAberto((a) => !a)}
      >
        <span className={selecionado ? styles.valor : styles.placeholder}>
          {selecionado ? selecionado.label : placeholder}
        </span>
        <MaterialIcon name={aberto ? 'expand_less' : 'expand_more'} size={18} />
      </button>

      {aberto && createPortal(
        <div
          ref={listaRef}
          className={styles.lista}
          role="listbox"
          style={{ top: posicao.top, left: posicao.left, width: posicao.width }}
        >
          <div className={`${styles.item} ${!value ? styles.itemAtivo : ''}`} onClick={() => escolher('')}>
            {placeholder}
          </div>
          {options.map((o) => (
            <div
              key={o.value}
              className={`${styles.item} ${o.value === value ? styles.itemAtivo : ''}`}
              onClick={() => escolher(o.value)}
            >
              {o.label}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
