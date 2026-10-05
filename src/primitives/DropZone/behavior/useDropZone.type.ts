/* @layer renderer-components @kind types */
import type { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import type { FileDragHandlers } from './useFileDrag.type';

interface DropZoneBehavior {
  active: boolean;
  dragHandlers: FileDragHandlers;
  inputRef: RefObject<HTMLInputElement | null>;
  handleClick: () => void;
  handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export type { DropZoneBehavior };
