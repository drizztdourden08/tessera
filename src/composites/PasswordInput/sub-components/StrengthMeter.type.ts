/* @layer renderer-components @kind types */
import type { PasswordScore, PasswordStrengthLevel } from '../PasswordInput.type';

interface StrengthMeterProps {
  score: PasswordScore;
  level: PasswordStrengthLevel | null;
}

export type { StrengthMeterProps };
