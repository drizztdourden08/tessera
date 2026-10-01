/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

interface RangeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: ControlSize;
}

export type { RangeInputProps };
