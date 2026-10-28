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
  collapsible?: boolean;
  defaultCollapsed?: CollapsedSide;
  startLabel?: string;
  endLabel?: string;
  summary?: ReactNode;
  header?: ReactNode;
  className?: string;
}

export type { CollapsedSide, SplitOrientation, SplitPaneProps };
