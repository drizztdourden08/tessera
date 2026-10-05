/* @layer renderer-components @kind util */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { MAX_SCORE } from '../PasswordInput.constants';
import type { PasswordScore } from '../PasswordInput.type';

const clampScore = (raw: number): PasswordScore => {
  const score = Number.isFinite(raw) ? Math.round(clampNumber(raw, 0, MAX_SCORE)) : 0;
  return score as PasswordScore;
};

export { clampScore };
