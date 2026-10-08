/* @layer renderer-components @kind types */
import type { DragEvent, RefObject } from 'react';
import type { ColumnActions } from '../DataTable.type';

interface ColumnResizeHandleProps {
  label: string;
  path: string;
  index: number;
  width: number | undefined;
  cellRef: RefObject<HTMLElement | null>;
  headerId: string;
  actions: Pick<ColumnActions, 'onResize' | 'onPreviewResize'>;
  onResizingChange: (resizing: boolean) => void;
  onDragOver?: (index: number, event: DragEvent<HTMLElement>) => void;
  onDrop?: (index: number, event: DragEvent<HTMLElement>) => void;
}

export type { ColumnResizeHandleProps };
