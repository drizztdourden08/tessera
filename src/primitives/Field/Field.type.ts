/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

type FieldWidth = 'sm' | 'md' | 'full';

interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  inline?: boolean;
  size?: ControlSize;
  width?: FieldWidth;
  className?: string;
  children: ReactNode;
}

export type { FieldProps, FieldWidth };
