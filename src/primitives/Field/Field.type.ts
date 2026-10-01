/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  inline?: boolean;
  size?: ControlSize;
  className?: string;
  children: ReactNode;
}

export type { FieldProps };
