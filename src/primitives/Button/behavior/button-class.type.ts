/* @layer renderer-components @kind types */
import type { ButtonLook, ButtonSize, ButtonVariant } from '../Button.type';

interface ButtonClassInput {
  variant: ButtonVariant;
  size: ButtonSize;
  look: ButtonLook | undefined;
  fullWidth: boolean;
  active: boolean;
  loading: boolean;
  oneLine: boolean;
  className: string;
}

export type { ButtonClassInput };
