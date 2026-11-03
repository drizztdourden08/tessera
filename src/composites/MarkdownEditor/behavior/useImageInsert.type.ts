/* @layer renderer-components @kind types */
import type { ClipboardEventHandler, DragEventHandler } from 'react';

interface ImageInsertOptions {
  onImageFiles: ((files: File[]) => Promise<string>) | undefined;
  disabled: boolean;
}

interface ImageInsertHandlers {
  onPaste?: ClipboardEventHandler<HTMLTextAreaElement>;
  onDragOver?: DragEventHandler<HTMLTextAreaElement>;
  onDrop?: DragEventHandler<HTMLTextAreaElement>;
}

interface ImageInsert {
  insertFiles: ((files: File[]) => void) | undefined;
  textareaProps: ImageInsertHandlers;
}

export type { ImageInsert, ImageInsertOptions };
