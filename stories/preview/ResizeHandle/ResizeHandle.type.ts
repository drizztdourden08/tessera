/* @layer stories @kind types */
import type { SplitDividerProps } from '../../../src/composites/SplitPane/sub-components/SplitDivider.type';

type ResizeHandleLook = 'grip' | 'line';

type ResizeHandleEdge = 'start' | 'end';

interface ResizeHandleProps {
  startLabel: string;
  endLabel: string;
  size: number;
  min: number;
  max: number;
  handlers: SplitDividerProps['handlers'];
  look?: ResizeHandleLook;
  edge?: ResizeHandleEdge;
}

export type { ResizeHandleLook, ResizeHandleProps };
