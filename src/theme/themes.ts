import {
  darken, ensureDarkEnough, ensureLightEnough, hexToRgbString, lighten, mix,
} from './colorMath';

export type Modo = 'dark' | 'light';

/** As cores "cruas" que definem a identidade de um tema — o resto é derivado. */
interface ThemeRoles {
  /** cor de marca principal (botões, links, destaques) */
  primary: string;
  /** cor de destaque (badges, "hoje", export) */
  accent: string;
  /** cor de apoio secundária (seção de vozes) */
  sage: string;
  /** base da qual bg/surface/texto são derivados */
  base: string;
  modo: Modo;
}

export interface ThemeTokens {
  primary: string; primaryHover: string; primaryLight: string; primaryText: string; primaryDeep: string;
  onPrimary: string; onPrimaryRgb: string;
  accent: string; accentHover: string; accentLight: string; accentRgb: string; onAccent: string;
  bg: string; bgRgb: string; surface: string; surfaceAlt: string; border: string; borderStrong: string;
  text: string; textRgb: string; textMuted: string; textFaint: string;
  success: string; successBg: string; successBorder: string;
  danger: string; dangerBg: string; dangerBorder: string; dangerHover: string;
  sage: string; sageB: string;
}

const SUCESSO_ESTADOS: Record<Modo, Pick<ThemeTokens, 'success' | 'successBg' | 'successBorder' | 'danger' | 'dangerBg' | 'dangerBorder' | 'dangerHover'>> = {
  dark: {
    success: '#4ade80', successBg: '#1a3a25', successBorder: '#2a5a35',
    danger: '#f87171', dangerBg: '#3a1a1a', dangerBorder: '#5a2a2a', dangerHover: '#b91c1c',
  },
  light: {
    success: '#16a34a', successBg: '#eafbf1', successBorder: '#bfead0',
    danger: '#dc2626', dangerBg: '#fdeceb', dangerBorder: '#f5cfcb', dangerHover: '#b91c1c',
  },
};

function derive(roles: ThemeRoles): ThemeTokens {
  const { primary: primaryBase, accent: accentBase, sage: sageBase, base, modo } = roles;
  const escuro = modo === 'dark';

  // primary sempre precisa ser escuro/saturado o bastante pra texto branco em cima
  const primary = ensureDarkEnough(primaryBase, 140);
  const primaryHover = escuro ? lighten(primary, 0.12) : darken(primary, 0.12);
  const primaryDeep = darken(primary, 0.22);
  const primaryLight = escuro ? mix(primary, '#000000', 0.78) : mix(primary, '#ffffff', 0.86);
  const primaryText = escuro ? ensureLightEnough(lighten(primary, 0.3), 170) : ensureDarkEnough(darken(primary, 0.1), 140);

  // accent sempre precisa ser claro/vívido o bastante pra texto escuro em cima
  const accent = ensureLightEnough(accentBase, 170);
  const accentHover = escuro ? lighten(accent, 0.08) : darken(accent, 0.08);
  const accentLight = escuro ? mix(accent, '#000000', 0.82) : mix(accent, '#ffffff', 0.85);

  const bg = escuro ? mix(base, '#000000', 0.74) : mix(base, '#ffffff', 0.86);
  const surface = escuro ? mix(base, '#000000', 0.58) : mix(base, '#ffffff', 0.96);
  const surfaceAlt = escuro ? mix(base, '#000000', 0.7) : mix(base, '#ffffff', 0.9);
  const border = escuro ? mix(primaryBase, '#000000', 0.55) : mix(primaryBase, '#ffffff', 0.72);
  const borderStrong = escuro ? mix(primaryBase, '#000000', 0.4) : mix(primaryBase, '#ffffff', 0.55);

  const text = escuro ? mix(base, '#ffffff', 0.92) : mix(base, '#000000', 0.85);
  const textMuted = escuro ? mix(base, '#ffffff', 0.56) : mix(base, '#000000', 0.5);
  const textFaint = escuro ? mix(base, '#ffffff', 0.4) : mix(base, '#000000', 0.32);

  // sage: mesma lógica do primary (precisa hospedar a cor "text" por cima)
  const sageB = escuro ? ensureDarkEnough(sageBase, 150) : ensureLightEnough(sageBase, 180);
  const sageBg = escuro ? mix(sageBase, '#000000', 0.68) : mix(sageBase, '#ffffff', 0.82);

  const estados = SUCESSO_ESTADOS[modo];

  return {
    primary, primaryHover, primaryLight, primaryText, primaryDeep,
    onPrimary: '#ffffff', onPrimaryRgb: '255, 255, 255',
    accent, accentHover, accentLight, accentRgb: hexToRgbString(accent), onAccent: '#1c1a17',
    bg, bgRgb: hexToRgbString(bg), surface, surfaceAlt, border, borderStrong,
    text, textRgb: hexToRgbString(text), textMuted, textFaint,
    ...estados,
    sage: sageBg, sageB,
  };
}

export interface Theme {
  id: string;
  nome: string;
  modo: Modo;
  tokens: ThemeTokens;
  /** cores usadas só pra desenhar a amostra (swatch) no seletor */
  amostra: [string, string, string];
}

function tema(id: string, nome: string, roles: ThemeRoles, amostra: [string, string, string]): Theme {
  return { id, nome, modo: roles.modo, tokens: derive(roles), amostra };
}

export const THEMES: Theme[] = [
  tema('terracota', 'Terracota', {
    primary: '#a0453a', accent: '#d4a853', sage: '#3a6858', base: '#1a0a07', modo: 'dark',
  }, ['#a0453a', '#d4a853', '#1a0a07']),

  tema('aurora', 'Aurora', {
    primary: '#c59fe9', accent: '#f8efc3', sage: '#f49dc3', base: '#f8efeb', modo: 'light',
  }, ['#c59fe9', '#f49dc3', '#f8efc3']),

  tema('abissal', 'Abissal', {
    primary: '#006276', accent: '#00bfaa', sage: '#008b91', base: '#00334e', modo: 'dark',
  }, ['#00334e', '#008b91', '#00bfaa']),

  tema('brasa', 'Brasa', {
    primary: '#a04d22', accent: '#ffc246', sage: '#d8802c', base: '#451411', modo: 'dark',
  }, ['#451411', '#a04d22', '#ffc246']),

  tema('crepusculo', 'Crepúsculo', {
    primary: '#824358', accent: '#fd8e7e', sage: '#bb5e67', base: '#5d354c', modo: 'dark',
  }, ['#5d354c', '#824358', '#fd8e7e']),

  tema('oliva', 'Oliva', {
    primary: '#7c7451', accent: '#c2c79d', sage: '#7c7772', base: '#f8f8f8', modo: 'light',
  }, ['#a6a068', '#c2c79d', '#7c7772']),

  tema('recife', 'Recife', {
    primary: '#00b3d9', accent: '#b7ec80', sage: '#00c992', base: '#fffff2', modo: 'light',
  }, ['#00b3d9', '#00c992', '#b7ec80']),

  tema('deserto', 'Deserto', {
    primary: '#a24c4a', accent: '#c5b698', sage: '#b6906d', base: '#f2ede4', modo: 'light',
  }, ['#a24c4a', '#b6906d', '#c5b698']),

  tema('neve', 'Neve', {
    primary: '#4a4a4a', accent: '#d8d8d8', sage: '#8a8a8a', base: '#f7f7f7', modo: 'light',
  }, ['#3a3a3a', '#8a8a8a', '#d8d8d8']),
];

export const TEMA_PADRAO_ID = 'terracota';

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
