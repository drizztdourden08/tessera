/* @layer renderer-components @kind types */
import type { ControlSize } from './field-control.type';
import type { InputAdornment } from './input-adornment.type';

interface InputAdornmentSlotProps {
  adornment: InputAdornment | undefined;
  size: ControlSize;
  disabled: boolean;
  className: string;
}

export type { InputAdornmentSlotProps };
