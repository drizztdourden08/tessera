/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';

type MixedInputProps = InputHTMLAttributes<HTMLInputElement> & { 'data-mixed'?: true };

export type { MixedInputProps };
