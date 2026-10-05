/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { FileDrag, FileDragOptions } from './useFileDrag.type';

const hasFiles = (event: DragEvent<HTMLElement>): boolean => Array.from(event.dataTransfer.types).includes('Files');

const useFileDrag = (options: FileDragOptions): FileDrag => {
  const { enabled, onEnter, onDrop } = options;
  const [active, setActive] = useState(false);
  const depth = useRef(0);
  const take = (event: DragEvent<HTMLElement>): boolean => {
    if (!enabled || !hasFiles(event)) return false;
    event.preventDefault();
    event.stopPropagation();
    return true;
  };
  const onDragEnter = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current += 1;
    setActive(true);
    onEnter?.();
  };
  const onDragOver = (event: DragEvent<HTMLElement>) => {
    if (take(event)) event.dataTransfer.dropEffect = 'copy';
  };
  const onDragLeave = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current = Math.max(depth.current - 1, 0);
    if (depth.current === 0) setActive(false);
  };
  const onDropEvent = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current = 0;
    setActive(false);
    onDrop(event.dataTransfer);
  };
  return { active, handlers: { onDragEnter, onDragOver, onDragLeave, onDrop: onDropEvent } };
};

export { useFileDrag };
