/* @layer renderer-components @kind types */
import type { PasswordRule, PasswordScore, PasswordStrength, PasswordStrengthLevel } from '../PasswordInput.type';

interface RuleCheck {
  id: string;
  label: string;
  met: boolean;
}

interface CheckSnapshot {
  met: readonly string[];
  level: PasswordStrengthLevel | null;
}

interface PasswordChecksParams {
  value: string;
  rules: readonly PasswordRule[];
  strength: PasswordStrength;
}

interface PasswordChecks {
  checks: readonly RuleCheck[];
  score: PasswordScore | null;
  level: PasswordStrengthLevel | null;
  announcement: string;
}

export type { CheckSnapshot, PasswordChecks, PasswordChecksParams, RuleCheck };
