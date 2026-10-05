/* @layer renderer-components @kind types */
import type { TextInputProps } from '../../primitives/TextInput/TextInput.type';

type PasswordMode = 'current' | 'new';

type PasswordScore = 0 | 1 | 2 | 3 | 4;

type PasswordStrength = false | 'rules' | PasswordScore | ((value: string) => PasswordScore);

type PasswordStrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

interface PasswordRule {
  id: string;
  label: string;
  test: (value: string) => boolean;
}

interface PasswordInputProps extends Omit<TextInputProps, 'type' | 'value' | 'defaultValue' | 'onChange' | 'end'> {
  value: string;
  onChange: (value: string) => void;
  mode?: PasswordMode;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  hideOnBlur?: boolean;
  maskChar?: string;
  monospace?: boolean;
  capsLockWarning?: boolean;
  rules?: readonly PasswordRule[];
  strength?: PasswordStrength;
}

export type { PasswordInputProps, PasswordMode, PasswordRule, PasswordScore, PasswordStrength, PasswordStrengthLevel };
