/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FieldControl {
  id?: string;
  describedBy?: string;
  invalid?: boolean;
  labelId?: string;
}

interface FieldControlBoundaryProps {
  children: ReactNode;
}

export type { FieldControl, FieldControlBoundaryProps };
