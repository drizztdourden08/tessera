/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type CollapsedSide = 'none' | 'start' | 'end';

type SplitOrientation = 'horizontal' | 'vertical';

interface SplitPaneProps {
  start: ReactNode;
  end: ReactNode;
  orientation?: SplitOrientation;
  defaultRatio?: number;
  minRatio?: number;
  maxRatio?: number;
  snapAt?: number;
  defaultCollapsed?: CollapsedSide;
  startLabel?: string;
  endLabel?: string;
  className?: string;
}

export type { CollapsedSide, SplitOrientation, SplitPaneProps };
