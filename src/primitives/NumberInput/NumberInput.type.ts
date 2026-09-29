/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (value: number) => void;
  sizeToContent?: boolean;
  invalid?: boolean;
}

export type { NumberInputProps };
