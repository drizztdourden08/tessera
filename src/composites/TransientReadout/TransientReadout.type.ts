/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ReadoutCorner = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';

interface TransientReadoutProps {
  value?: ReactNode;
  corner?: ReadoutCorner;
  showMs?: number;
  onActivate?: () => void;
  title?: string;
  className?: string;
}

export type { ReadoutCorner, TransientReadoutProps };
