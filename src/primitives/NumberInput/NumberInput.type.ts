/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';
import type { InputAdornment } from '../field-control/input-adornment.type';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  onChange?: (value: number) => void;
  sizeToContent?: boolean;
  invalid?: boolean;
  size?: ControlSize;
  start?: InputAdornment;
  end?: InputAdornment;
}

export type { NumberInputProps };
