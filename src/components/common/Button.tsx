import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { MaterialIcon } from '../icons/MaterialIcon';
import styles from './Button.module.css';

type Variant = 'primary' | 'gold' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: string;
  children?: ReactNode;
}

export function Button({ variant = 'primary', icon, children, className, ...rest }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[variant]}${className ? ` ${className}` : ''}`} {...rest}>
      {icon && <MaterialIcon name={icon} size={18} />}
      {children}
    </button>
  );
}
