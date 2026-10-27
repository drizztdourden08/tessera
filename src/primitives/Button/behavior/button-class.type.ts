/* @layer renderer-components @kind types */
import type { ButtonFill, ButtonLook, ButtonSize, ButtonVariant, ButtonWidth } from '../Button.type';

interface ButtonClassInput {
  variant: ButtonVariant;
  size: ButtonSize;
  look: ButtonLook | undefined;
  fill: ButtonFill | undefined;
  width: ButtonWidth | undefined;
  fullWidth: boolean;
  active: boolean;
  loading: boolean;
  oneLine: boolean;
  link: boolean;
  className: string | undefined;
}

export type { ButtonClassInput };
