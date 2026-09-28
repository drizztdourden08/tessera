/* @layer renderer-components @kind types */
import type { DragEvent, ReactNode } from 'react';

interface DataCellProps {
  path: string;
  index: number;
  dragging: boolean;
  onDragOver?: (index: number, event: DragEvent<HTMLElement>) => void;
  onDrop?: (index: number, event: DragEvent<HTMLElement>) => void;
  children: ReactNode;
}

export type { DataCellProps };
