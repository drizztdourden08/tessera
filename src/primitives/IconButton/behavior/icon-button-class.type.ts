/* @layer renderer-components @kind types */
import type { IconButtonSize, IconButtonTone, IconButtonVariant } from '../IconButton.type';

interface IconButtonClassInput {
  variant: IconButtonVariant;
  tone?: IconButtonTone;
  size: IconButtonSize;
  active: boolean;
  loading: boolean;
  className?: string;
}

export type { IconButtonClassInput };
