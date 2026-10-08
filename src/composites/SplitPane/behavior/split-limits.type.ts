/* @layer renderer-components @kind types */
import type { CollapsedSide } from '../SplitPane.type';

interface SplitLimits {
  min: number;
  max: number;
  snapAt: number;
}

interface SplitState {
  collapsed: CollapsedSide;
  ratio: number;
}

export type { SplitLimits, SplitState };
