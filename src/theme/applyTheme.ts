import type { Theme, ThemeTokens } from './themes';

const VAR_NAMES: Record<keyof ThemeTokens, string> = {
  primary: '--primary',
  primaryHover: '--primary-hover',
  primaryLight: '--primary-light',
  primaryText: '--primary-text',
  primaryDeep: '--primary-deep',
  onPrimary: '--on-primary',
  onPrimaryRgb: '--on-primary-rgb',
  accent: '--accent',
  accentHover: '--accent-hover',
  accentLight: '--accent-light',
  accentRgb: '--accent-rgb',
  onAccent: '--on-accent',
  bg: '--bg',
  bgRgb: '--bg-rgb',
  surface: '--surface',
  surfaceAlt: '--surface-alt',
  border: '--border',
  borderStrong: '--border-strong',
  text: '--text',
  textRgb: '--text-rgb',
  textMuted: '--text-muted',
  textFaint: '--text-faint',
  success: '--success',
  successBg: '--success-bg',
  successBorder: '--success-border',
  danger: '--danger',
  dangerBg: '--danger-bg',
  dangerBorder: '--danger-border',
  dangerHover: '--danger-hover',
  sage: '--sage',
  sageB: '--sage-b',
};

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  for (const key in theme.tokens) {
    const varName = VAR_NAMES[key as keyof ThemeTokens];
    root.style.setProperty(varName, theme.tokens[key as keyof ThemeTokens]);
  }
  root.setAttribute('data-mode', theme.modo);
  root.setAttribute('data-theme', theme.id);
}
