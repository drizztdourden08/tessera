/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  inline?: boolean;
  className?: string;
  children: ReactNode;
}

export type { FieldProps };
