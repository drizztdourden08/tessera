/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface UseColumnResizeInput {
  path: string;
  cellRef: RefObject<HTMLElement | null>;
  onPreview: (path: string, width: number) => void;
  onResize: (path: string, width: number) => void;
}

interface DragState {
  startX: number;
  startWidth: number;
  width: number;
}

export type { DragState, UseColumnResizeInput };
