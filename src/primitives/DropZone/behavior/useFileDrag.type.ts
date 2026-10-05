/* @layer renderer-components @kind types */
import type { DragEvent } from 'react';

interface FileDragHandlers {
  onDragEnter: (event: DragEvent<HTMLElement>) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
}

interface FileDragOptions {
  enabled: boolean;
  onEnter?: () => void;
  onDrop: (data: DataTransfer) => void;
}

interface FileDrag {
  active: boolean;
  handlers: FileDragHandlers;
}

export type { FileDrag, FileDragHandlers, FileDragOptions };
