/* @layer stories @kind data */
interface TypeEntry {
  token: string;
  use: string;
}

const SPECIMEN = 'Wren sent the Hookshot to Tavi';
const PANGRAM = 'Sphinx of black quartz, judge my vow. 0123456789';

const FONTS: readonly TypeEntry[] = [
  { token: '--font-sans', use: 'Inter, a variable face: every weight from 100 to 900, optical size and a true italic. All text by default.' },
  { token: '--font-title', use: 'Chakra Petch, the stylized face for titles and headings.' },
  { token: '--font-mono', use: 'Code, token names, ids and numbers that line up in columns.' },
  { token: '--font-emoji', use: 'Emoji glyphs, so they draw in colour on every system.' },
  { token: '--font-game', use: 'Text the game will show, in the dialogue face with its added symbols.' },
];

const WEIGHTS: readonly TypeEntry[] = [
  { token: '--weight-thin', use: 'Oversized display numbers only.' },
  { token: '--weight-extralight', use: 'Large, quiet display text.' },
  { token: '--weight-light', use: 'Large lead text.' },
  { token: '--weight-normal', use: 'Body text.' },
  { token: '--weight-medium', use: 'Labels and controls.' },
  { token: '--weight-semi', use: 'Sub-headings, table heads, the active item.' },
  { token: '--weight-bold', use: 'Headings and names.' },
  { token: '--weight-extrabold', use: 'Strong emphasis, the peak of an Emphasis swell.' },
  { token: '--weight-black', use: 'Display type only.' },
];

const SIZES: readonly TypeEntry[] = [
  { token: '--text-xs', use: 'Captions, badges, counts.' },
  { token: '--text-sm', use: 'Secondary text, table cells, dense controls.' },
  { token: '--text-base', use: 'The default size of body text and controls.' },
  { token: '--text-lg', use: 'Lead text and card titles.' },
  { token: '--text-xl', use: 'Section headings.' },
  { token: '--text-2xl', use: 'Page titles.' },
  { token: '--text-display', use: 'A hero line, one per screen at most.' },
];

const LEADING: readonly TypeEntry[] = [
  { token: '--leading-tight', use: 'Headings and single-line controls.' },
  { token: '--leading-normal', use: 'Running text.' },
];

const TRACKING: readonly TypeEntry[] = [
  { token: '--tracking-tight', use: 'Large display type.' },
  { token: '--tracking-normal', use: 'Everything else.' },
  { token: '--tracking-wide', use: 'Small text that needs air.' },
  { token: '--tracking-caps', use: 'Uppercase labels and headings.' },
];

interface CaseEntry {
  label: string;
  style: { textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'; fontStyle?: 'italic' | 'normal'; letterSpacing?: string };
  use: string;
}

const CASES: readonly CaseEntry[] = [
  { label: 'none', style: { textTransform: 'none' }, use: 'Text as written.' },
  { label: 'uppercase', style: { textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)' }, use: 'Eyebrows, section labels, table heads; always with caps tracking.' },
  { label: 'capitalize', style: { textTransform: 'capitalize' }, use: 'Titles built from data.' },
  { label: 'italic', style: { fontStyle: 'italic' }, use: 'A term or a quoted name inside a sentence.' },
];

export { CASES, FONTS, LEADING, PANGRAM, SIZES, SPECIMEN, TRACKING, WEIGHTS };
export type { TypeEntry };
