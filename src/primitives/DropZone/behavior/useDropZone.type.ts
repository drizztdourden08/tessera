/* @layer renderer-components @kind types */
import type { ChangeEvent, DragEvent, KeyboardEvent, RefObject } from 'react';

interface DropZoneBehavior {
  active: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  handleDragEnter: (e: DragEvent) => void;
  handleDragLeave: (e: DragEvent) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  handleClick: () => void;
  handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export type { DropZoneBehavior };
