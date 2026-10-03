/* @layer renderer-components @kind types */
import type { CollapsedSide, SplitOrientation } from '../SplitPane.type';

interface SplitPaneOptions {
  orientation: SplitOrientation;
  defaultRatio: number;
  defaultCollapsed: CollapsedSide;
  minRatio: number;
  maxRatio: number;
  snapAt: number;
}

export type { SplitPaneOptions };
