/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type FoldOverflow = 'more' | 'hint';

interface FoldTextProps {
  lines?: number;
  overflow?: FoldOverflow;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

export type { FoldOverflow, FoldTextProps };
