/* @layer renderer-components @kind types */
import type { ButtonFill, ButtonLook, ButtonSize, ButtonVariant } from '../Button.type';

interface ButtonClassInput {
  variant: ButtonVariant;
  size: ButtonSize;
  look: ButtonLook | undefined;
  fill: ButtonFill | undefined;
  fullWidth: boolean;
  active: boolean;
  loading: boolean;
  oneLine: boolean;
  link: boolean;
  className: string | undefined;
}

export type { ButtonClassInput };
