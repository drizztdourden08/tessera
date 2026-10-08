/* @layer renderer-components @kind types */
import type { SplitHandle } from '../behavior/split-handle.type';
import type { SplitOrientation } from '../SplitPane.type';

interface SplitPaneHandleProps {
  split: SplitHandle;
  orientation: SplitOrientation;
  startLabel: string;
  endLabel: string;
  controls: string;
}

export type { SplitPaneHandleProps };
