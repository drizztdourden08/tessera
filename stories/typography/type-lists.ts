/* @layer stories @kind data */
interface TypeEntry {
  token: string;
}

const SPECIMEN = 'Wren sent the Hookshot to Tavi';
const PANGRAM = 'Sphinx of black quartz, judge my vow. 0123456789';

const FONTS: readonly TypeEntry[] = [
  { token: '--font-sans' },
  { token: '--font-title' },
  { token: '--font-mono' },
  { token: '--font-emoji' },
  { token: '--font-game' },
];

const WEIGHTS: readonly TypeEntry[] = [
  { token: '--weight-thin' },
  { token: '--weight-extralight' },
  { token: '--weight-light' },
  { token: '--weight-normal' },
  { token: '--weight-medium' },
  { token: '--weight-semi' },
  { token: '--weight-bold' },
  { token: '--weight-extrabold' },
  { token: '--weight-black' },
];

const SIZES: readonly TypeEntry[] = [
  { token: '--text-xs' },
  { token: '--text-sm' },
  { token: '--text-base' },
  { token: '--text-lg' },
  { token: '--text-xl' },
  { token: '--text-2xl' },
  { token: '--text-display' },
];

const LEADING: readonly TypeEntry[] = [
  { token: '--leading-tight' },
  { token: '--leading-normal' },
];

const TRACKING: readonly TypeEntry[] = [
  { token: '--tracking-tight' },
  { token: '--tracking-normal' },
  { token: '--tracking-wide' },
  { token: '--tracking-caps' },
];

interface CaseEntry {
  label: string;
  style: { textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'; fontStyle?: 'italic' | 'normal'; letterSpacing?: string };
}

const CASES: readonly CaseEntry[] = [
  { label: 'none', style: { textTransform: 'none' } },
  { label: 'uppercase', style: { textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)' } },
  { label: 'capitalize', style: { textTransform: 'capitalize' } },
  { label: 'italic', style: { fontStyle: 'italic' } },
];

export { CASES, FONTS, LEADING, PANGRAM, SIZES, SPECIMEN, TRACKING, WEIGHTS };
export type { TypeEntry };
