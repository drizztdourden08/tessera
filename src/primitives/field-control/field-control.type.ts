/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ControlSize = 'sm' | 'md';

interface FieldControl {
  id?: string;
  describedBy?: string;
  invalid?: boolean;
  labelId?: string;
  size?: ControlSize;
}

interface FieldControlBoundaryProps {
  children: ReactNode;
}

export type { ControlSize, FieldControl, FieldControlBoundaryProps };
