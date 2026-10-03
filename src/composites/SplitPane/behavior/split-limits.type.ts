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

type SplitCommand = 'home' | 'end' | 'reset';

export type { SplitCommand, SplitLimits, SplitState };
