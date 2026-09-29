/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export type {
  TextInputProps,
};
