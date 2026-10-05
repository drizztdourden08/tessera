/* @layer renderer-components @kind util */
import { MAX_SCORE } from '../PasswordInput.constants';
import type { PasswordScore } from '../PasswordInput.type';

const clampScore = (raw: number): PasswordScore => {
  const score = Number.isFinite(raw) ? Math.round(Math.min(MAX_SCORE, Math.max(0, raw))) : 0;
  return score as PasswordScore;
};

export { clampScore };
