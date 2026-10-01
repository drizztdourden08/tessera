/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  onChange?: (value: number) => void;
  sizeToContent?: boolean;
  invalid?: boolean;
  size?: ControlSize;
}

export type { NumberInputProps };
