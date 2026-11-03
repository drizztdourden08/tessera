/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ValueTagProps {
  value: boolean | string | number;
  label?: ReactNode;
  compact?: boolean;
  className?: string;
}

export type { ValueTagProps };
