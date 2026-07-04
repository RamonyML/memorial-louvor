import { useEffect, useRef, useState } from 'react';
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
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function aoClicarFora(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setAberto(false);
    }
    document.addEventListener('mousedown', aoClicarFora);
    return () => document.removeEventListener('mousedown', aoClicarFora);
  }, []);

  const selecionado = options.find((o) => o.value === value);

  function escolher(v: string) {
    onChange(v);
    setAberto(false);
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.trigger} ${variant === 'ghost' ? styles.ghost : ''}`}
        onClick={() => setAberto((a) => !a)}
      >
        <span className={selecionado ? styles.valor : styles.placeholder}>
          {selecionado ? selecionado.label : placeholder}
        </span>
        <MaterialIcon name={aberto ? 'expand_less' : 'expand_more'} size={18} />
      </button>

      {aberto && (
        <div className={styles.lista} role="listbox">
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
        </div>
      )}
    </div>
  );
}
