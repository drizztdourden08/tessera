/* @layer renderer-components @kind types */
import type { ChangeEvent, KeyboardEvent, RefCallback, RefObject } from 'react';
import type { FileDragHandlers } from './useFileDrag.type';
import type { PasteFiles } from './usePasteFiles.type';

interface DropZoneBehavior {
  active: boolean;
  dragHandlers: FileDragHandlers;
  pasteHandlers: PasteFiles;
  zoneRef: RefCallback<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement | null>;
  handleClick: () => void;
  handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export type { DropZoneBehavior };
