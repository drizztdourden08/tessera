/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { carriesFiles } from './carries-files';
import { leftZone } from './left-zone';
import type { FileDrag, FileDragOptions } from './useFileDrag.type';

const useFileDrag = (options: FileDragOptions): FileDrag => {
  const { enabled, onEnter, onDrop } = options;
  const [active, setActive] = useState(false);
  const depth = useRef(0);
  const shown = useRef(false);
  const take = (event: DragEvent<HTMLElement>): boolean => {
    if (!enabled || !carriesFiles(event.dataTransfer)) return false;
    event.preventDefault();
    event.stopPropagation();
    return true;
  };
  const show = () => {
    if (shown.current) return;
    shown.current = true;
    setActive(true);
    onEnter?.();
  };
  const reset = () => {
    depth.current = 0;
    shown.current = false;
    setActive(false);
  };
  const onDragEnter = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current += 1;
    show();
  };
  const onDragOver = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    event.dataTransfer.dropEffect = 'copy';
    depth.current = Math.max(depth.current, 1);
    show();
  };
  const onDragLeave = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    depth.current = Math.max(depth.current - 1, 0);
    if (depth.current === 0 || leftZone(event)) reset();
  };
  const onDropEvent = (event: DragEvent<HTMLElement>) => {
    if (!take(event)) return;
    reset();
    onDrop(event.dataTransfer);
  };
  return { active, handlers: { onDragEnter, onDragOver, onDragLeave, onDrop: onDropEvent } };
};

export { useFileDrag };
