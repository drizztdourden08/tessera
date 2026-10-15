/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Density } from '../field-control/field-control.type';

interface DensityScopeProps {
  density: Density;
  children: ReactNode;
}

export type { DensityScopeProps };
