/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type FoldOverflow = 'more' | 'hint' | 'clip';

type FoldTruncate = 'middle';

interface FoldTextProps {
  lines?: number;
  overflow?: FoldOverflow;
  truncate?: FoldTruncate;
  fill?: boolean;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

type FoldLinesProps = Pick<FoldTextProps, 'lines' | 'overflow' | 'hint' | 'children'>;

interface FoldMiddleProps {
  text: string;
  hint?: ReactNode;
}

export type { FoldLinesProps, FoldMiddleProps, FoldOverflow, FoldTextProps, FoldTruncate };
