/** Pequenos utilitários de cor usados para derivar os temas a partir de 5 tons crus. */

type RGB = [number, number, number];

function clamp(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

export function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function rgbToHex([r, g, b]: RGB): string {
  return `#${[r, g, b].map((n) => clamp(n).toString(16).padStart(2, '0')).join('')}`;
}

export function rgbString([r, g, b]: RGB): string {
  return `${clamp(r)}, ${clamp(g)}, ${clamp(b)}`;
}

export function hexToRgbString(hex: string): string {
  return rgbString(hexToRgb(hex));
}

/** t=0 → a, t=1 → b */
export function mix(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const out: RGB = [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
  return rgbToHex(out);
}

export function lighten(hex: string, amount: number): string {
  return mix(hex, '#ffffff', amount);
}

export function darken(hex: string, amount: number): string {
  return mix(hex, '#000000', amount);
}

/** Brilho percebido, 0 (preto) a 255 (branco). */
export function brightness(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return r * 0.299 + g * 0.587 + b * 0.114;
}

/** Escurece até ficar seguro o bastante para texto branco em cima. */
export function ensureDarkEnough(hex: string, max = 130): string {
  let out = hex;
  let guard = 0;
  while (brightness(out) > max && guard < 20) {
    out = darken(out, 0.08);
    guard += 1;
  }
  return out;
}

/** Clareia até ficar seguro o bastante para texto escuro em cima. */
export function ensureLightEnough(hex: string, min = 175): string {
  let out = hex;
  let guard = 0;
  while (brightness(out) < min && guard < 20) {
    out = lighten(out, 0.08);
    guard += 1;
  }
  return out;
}
