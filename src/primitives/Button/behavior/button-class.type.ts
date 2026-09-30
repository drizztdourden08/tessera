/* @layer renderer-components @kind types */
import type { ButtonSize, ButtonVariant } from '../Button.type';

interface ButtonClassInput {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  active: boolean;
  loading: boolean;
  className: string;
}

export type { ButtonClassInput };
