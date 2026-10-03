/* @layer renderer-components @kind util */
import { MAX_SCORE } from '../PasswordInput.constants';
import type { PasswordScore, PasswordStrength } from '../PasswordInput.type';
import type { RuleCheck } from './checks.type';
import { clampScore } from './clamp-score';

const scoreOf = (strength: PasswordStrength, value: string, checks: readonly RuleCheck[]): PasswordScore | null => {
  if (strength === false) return null;
  if (typeof strength === 'function') return clampScore(strength(value));
  if (strength !== 'rules') return clampScore(strength);
  if (checks.length === 0) return 0;
  return clampScore((checks.filter((check) => check.met).length / checks.length) * MAX_SCORE);
};

export { scoreOf };
