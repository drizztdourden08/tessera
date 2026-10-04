/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';
import type { InputAdornment } from '../field-control/input-adornment.type';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  invalid?: boolean;
  size?: ControlSize;
  start?: InputAdornment;
  end?: InputAdornment;
  onEnter?: (value: string) => void;
}

export type {
  TextInputProps,
};
