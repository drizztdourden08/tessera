/* @layer renderer-components @kind types */
import type { SplitDividerProps } from '../../SplitPane/sub-components/SplitDivider.type';

interface ListWidthState {
  width: number;
  dragging: boolean;
  handlers: SplitDividerProps['handlers'];
}

interface DragStart {
  pointer: number;
  width: number;
  sign: number;
}

export type { DragStart, ListWidthState };
