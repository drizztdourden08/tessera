/* @layer renderer-components @kind types */
import type { DragEvent, KeyboardEvent } from 'react';

interface DropSlotBind {
  over: boolean;
  onDragEnter: (event: DragEvent<HTMLElement>) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { DropSlotBind };
