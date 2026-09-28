/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, KeyboardEvent } from 'react';
import { filterFiles } from './filterFiles';
import type { DropZoneBehavior } from './useDropZone.type';

const stop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const useDropZone = (accept: readonly string[] | undefined, onDrop: (files: File[]) => void): DropZoneBehavior => {
  const [active, setActive] = useState(false);
  const dragCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: DragEvent) => {
    stop(e);
    dragCounter.current++;
    setActive(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    stop(e);
    dragCounter.current--;
    if (dragCounter.current === 0) setActive(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => { stop(e); }, []);

  const deliver = useCallback((files: File[]) => {
    const accepted = filterFiles(files, accept);
    if (accepted.length > 0) onDrop(accepted);
  }, [accept, onDrop]);

  const handleDrop = useCallback((e: DragEvent) => {
    stop(e);
    dragCounter.current = 0;
    setActive(false);
    deliver(Array.from(e.dataTransfer.files));
  }, [deliver]);

  const handleClick = () => inputRef.current?.click();

  const handleFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    deliver(Array.from(e.target.files ?? []));
    e.target.value = '';
  }, [deliver]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    handleClick();
  };

  return {
    active, inputRef, handleDragEnter, handleDragLeave, handleDragOver, handleDrop,
    handleClick, handleFileInput, handleKeyDown,
  };
};

export { useDropZone };
