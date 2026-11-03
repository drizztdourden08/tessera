/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { ClipboardEvent, DragEvent, RefObject } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { applyQuietly } from './apply-quietly';
import { applyToTextarea } from './apply-to-textarea';
import { imageFilesOf } from './image-files';
import { placeholderEdit } from './image-edits';
import { settleEdit } from './settle-edit';
import type { ImageInsert, ImageInsertOptions } from './useImageInsert.type';

const settle = (area: HTMLTextAreaElement | null, placeholder: string, markdown: string): void => {
  if (!area) return;
  const edit = settleEdit(area.value, placeholder, markdown, area.selectionStart);
  if (edit) applyQuietly(area, edit);
};

const useImageInsert = (area: RefObject<HTMLTextAreaElement | null>, options: ImageInsertOptions): ImageInsert => {
  const { onImageFiles, disabled } = options;
  const { markdownEditor } = useTesseraStrings();
  const uploads = useRef(0);

  const insertFiles = (files: File[]): void => {
    const images = imageFilesOf(files);
    const el = area.current;
    if (!onImageFiles || !el || disabled || images.length === 0) return;
    uploads.current += 1;
    const placeholder = markdownEditor.uploadingImage(uploads.current);
    applyToTextarea(el, placeholderEdit(el.selectionStart, el.selectionEnd, placeholder));
    onImageFiles(images).then(
      (markdown) => settle(area.current, placeholder, markdown),
      () => settle(area.current, placeholder, ''),
    );
  };

  const onPaste = (event: ClipboardEvent<HTMLTextAreaElement>): void => {
    const images = imageFilesOf(event.clipboardData.files);
    if (images.length === 0) return;
    event.preventDefault();
    insertFiles(images);
  };

  const onDragOver = (event: DragEvent<HTMLTextAreaElement>): void => {
    if (Array.from(event.dataTransfer.types).includes('Files')) event.preventDefault();
  };

  const onDrop = (event: DragEvent<HTMLTextAreaElement>): void => {
    if (event.dataTransfer.files.length === 0) return;
    event.preventDefault();
    insertFiles(imageFilesOf(event.dataTransfer.files));
  };

  return onImageFiles ? { insertFiles, textareaProps: { onPaste, onDragOver, onDrop } } : { insertFiles: undefined, textareaProps: {} };
};

export { useImageInsert };
