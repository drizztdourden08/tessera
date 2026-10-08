/* @layer renderer-components @kind types */
import type { DragEvent, ReactNode } from 'react';
import type { SplitOrientation } from '../SplitPane/SplitPane.type';

type ResizeHandleLook = 'grip' | 'line' | 'ghost';

type ResizeHandleEdge = 'start' | 'end';

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
  onCollapse?: () => void;
  measure?: () => number;
  pixelsPerUnit?: (handle: HTMLElement) => number;
  orientation?: SplitOrientation;
  edge?: ResizeHandleEdge;
  look?: ResizeHandleLook;
  step?: number;
  largeStep?: number;
  controls?: string;
  title?: string;
  className?: string;
  onClick?: () => void;
  onDragOver?: (event: DragEvent<HTMLElement>) => void;
  onDrop?: (event: DragEvent<HTMLElement>) => void;
  children?: ReactNode;
}

export type { ResizeChange, ResizeHandleEdge, ResizeHandleLook, ResizeHandleProps };
