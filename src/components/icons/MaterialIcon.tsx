interface MaterialIconProps {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}

/** Ícone da fonte Material Symbols Outlined (Google). */
export function MaterialIcon({ name, size = 20, filled = false, className }: MaterialIconProps) {
  return (
    <span
      className={`msym${className ? ` ${className}` : ''}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
