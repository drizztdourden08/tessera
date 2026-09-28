/* @layer renderer-components @kind types */
import type { DragEvent } from 'react';
import type { ColumnResizeBinding } from '../DataTable.type';

interface ColumnResizeHandleProps {
  label: string;
  index: number;
  resize: ColumnResizeBinding;
  onDragOver?: (index: number, event: DragEvent<HTMLElement>) => void;
  onDrop?: (index: number, event: DragEvent<HTMLElement>) => void;
}

export type { ColumnResizeHandleProps };
