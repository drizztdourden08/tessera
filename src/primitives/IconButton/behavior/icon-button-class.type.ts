/* @layer renderer-components @kind types */
import type { IconButtonTone, IconButtonVariant } from '../IconButton.type';

interface IconButtonClassInput {
  variant: IconButtonVariant;
  tone?: IconButtonTone;
  size: 'sm' | 'md';
  active: boolean;
  loading: boolean;
  className?: string;
}

export type { IconButtonClassInput };
