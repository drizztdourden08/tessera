/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FieldLabelProps {
  id?: string;
  htmlFor: string;
  required?: boolean;
  help?: ReactNode;
  children: ReactNode;
}

export type { FieldLabelProps };
