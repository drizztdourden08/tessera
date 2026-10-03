/* @layer stories @kind data */
import type { PasswordRule, PasswordScore } from '../../../src/primitives';

type MaskCase = 'native' | 'bullet' | 'asterisk' | 'circle' | 'star' | 'emoji';

const MASK_CASES: readonly MaskCase[] = ['native', 'bullet', 'asterisk', 'circle', 'star', 'emoji'];

const MASK_CHARS: Readonly<Record<MaskCase, string | undefined>> = {
  native: undefined,
  bullet: '•',
  asterisk: '*',
  circle: '●',
  star: '✱',
  emoji: '🔒',
};

const SIGN_UP_RULES: readonly PasswordRule[] = [
  { id: 'length', label: 'At least 12 characters', test: (value) => value.length >= 12 },
  { id: 'cases', label: 'Upper and lower case letters', test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { id: 'number', label: 'At least one number', test: (value) => /\d/.test(value) },
  { id: 'symbol', label: 'At least one symbol', test: (value) => /[^A-Za-z0-9\s]/.test(value) },
];

const lengthScore = (value: string): PasswordScore => {
  if (value.length >= 20) return 4;
  if (value.length >= 14) return 3;
  if (value.length >= 10) return 2;
  return value.length >= 6 ? 1 : 0;
};

export { lengthScore, MASK_CASES, MASK_CHARS, SIGN_UP_RULES };
export type { MaskCase };
