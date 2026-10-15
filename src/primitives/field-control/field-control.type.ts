/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ControlSize = 'sm' | 'md';

type Density = 'comfortable' | 'compact';

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

export type { ControlSize, Density, FieldControl, FieldControlBoundaryProps };
