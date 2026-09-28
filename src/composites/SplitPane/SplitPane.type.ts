/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type CollapsedSide = 'none' | 'start' | 'end';

interface SplitPaneProps {
  start: ReactNode;
  end: ReactNode;
  defaultRatio?: number;
  snapAt?: number;
  defaultCollapsed?: CollapsedSide;
  startLabel?: string;
  endLabel?: string;
  className?: string;
}

export type { CollapsedSide, SplitPaneProps };
