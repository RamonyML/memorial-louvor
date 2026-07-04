import type { ReactNode, SVGProps } from 'react';
import type { InstrumentoKey } from '../../data/types';

interface IconProps {
  size?: number;
  className?: string;
}

function IconBase({
  size = 22,
  className,
  children,
  ...rest
}: IconProps & SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconBateria(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="8.5" rx="6.5" ry="2.4" />
      <line x1="5.5" y1="8.5" x2="5.5" y2="14.5" />
      <line x1="18.5" y1="8.5" x2="18.5" y2="14.5" />
      <path d="M5.5 14.5a6.5 2.4 0 0 0 13 0" />
      <path d="M3 3l6.2 4.9" />
      <path d="M21 3l-6.2 4.9" />
    </IconBase>
  );
}

export function IconViolao(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="10" y="1.2" width="4" height="2.6" rx="0.8" />
      <line x1="12" y1="3.8" x2="12" y2="11" />
      <circle cx="12" cy="14" r="3" />
      <circle cx="12" cy="14" r="1" />
      <circle cx="12" cy="18.4" r="4.3" />
    </IconBase>
  );
}

export function IconGuitarra(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="10" y="1.2" width="4" height="2.6" rx="0.8" />
      <line x1="12" y1="3.8" x2="12" y2="12" />
      <rect x="6" y="12" width="12" height="9.2" rx="4" />
      <line x1="8" y1="15.2" x2="16" y2="15.2" />
      <line x1="8" y1="18.2" x2="16" y2="18.2" />
    </IconBase>
  );
}

export function IconBaixo(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="10" y="1.2" width="4" height="2.6" rx="0.8" />
      <line x1="12" y1="3.8" x2="12" y2="14" />
      <rect x="7" y="14" width="10" height="8" rx="3.5" />
      <line x1="9" y1="18.6" x2="15" y2="18.6" />
    </IconBase>
  );
}

export function IconTeclado(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="2" y="8" width="20" height="10.5" rx="2" />
      <line x1="6.4" y1="8" x2="6.4" y2="18.5" />
      <line x1="9.6" y1="8" x2="9.6" y2="18.5" />
      <line x1="12.8" y1="8" x2="12.8" y2="18.5" />
      <line x1="16" y1="8" x2="16" y2="18.5" />
      <line x1="19.2" y1="8" x2="19.2" y2="18.5" />
      <path d="M4.8 8v5.2M8 8v5.2M14.4 8v5.2M17.6 8v5.2" />
    </IconBase>
  );
}

export function IconTrompete(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="2.8" cy="13" r="1.4" />
      <line x1="4.2" y1="13" x2="9" y2="13" />
      <rect x="9" y="10.3" width="1.8" height="5.2" rx="0.6" />
      <rect x="11.5" y="10.3" width="1.8" height="5.2" rx="0.6" />
      <rect x="14" y="10.3" width="1.8" height="5.2" rx="0.6" />
      <path d="M16 13h1.6l4.6-3.6" />
      <path d="M16 13h1.6l4.6 3.6" />
    </IconBase>
  );
}

export function IconVoz(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="9.3" y="2" width="5.4" height="9.4" rx="2.7" />
      <line x1="9.3" y1="5.4" x2="14.7" y2="5.4" />
      <line x1="9.3" y1="7.6" x2="14.7" y2="7.6" />
      <path d="M6.3 11.2a5.7 5.7 0 0 0 11.4 0" />
      <line x1="12" y1="16.9" x2="12" y2="20" />
      <line x1="8.6" y1="20" x2="15.4" y2="20" />
    </IconBase>
  );
}

export const INSTRUMENT_ICONS: Record<InstrumentoKey, (props: IconProps) => ReactNode> = {
  bat: IconBateria,
  bai: IconBaixo,
  vio: IconViolao,
  gui: IconGuitarra,
  tec: IconTeclado,
  trom: IconTrompete,
};
