/* @layer renderer-components @kind types */
import type { DragEvent } from 'react';
import type { SplitOrientation } from '../SplitPane/SplitPane.type';

type ResizeHandleEdge = 'start' | 'end';

type FoldSide = 'low' | 'high';

interface HandleFold {
  sides: readonly FoldSide[];
  folded: FoldSide | null;
  onFold: (side: FoldSide) => void;
  onUnfold: (side: FoldSide, to: number) => void;
}

interface ResizeChange {
  from: number;
  by: 'drag' | 'key';
}

interface ResizeHandleProps {
  label: string;
  value?: number;
  min: number;
  max: number;
  onResize: (next: number, change: ResizeChange) => void;
  onResizeEnd?: (value: number) => void;
  onDragChange?: (dragging: boolean) => void;
  onReset?: () => void;
  fold?: HandleFold;
  measure?: () => number;
  pixelsPerUnit?: (handle: HTMLElement) => number;
  orientation?: SplitOrientation;
  edge?: ResizeHandleEdge;
  step?: number;
  largeStep?: number;
  controls?: string;
  title?: string;
  className?: string;
  onDragOver?: (event: DragEvent<HTMLElement>) => void;
  onDrop?: (event: DragEvent<HTMLElement>) => void;
}

export type { FoldSide, HandleFold, ResizeChange, ResizeHandleEdge, ResizeHandleProps };
