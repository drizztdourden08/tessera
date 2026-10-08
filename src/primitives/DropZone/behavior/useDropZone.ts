/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { filterFiles } from './filter-files';
import { useFileDrag } from './useFileDrag';
import { usePasteFiles } from './usePasteFiles';
import type { DropZoneBehavior } from './useDropZone.type';

const useDropZone = (accept: readonly string[] | undefined, enabled: boolean, onDrop: (files: File[]) => void): DropZoneBehavior => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [zone, setZone] = useState<HTMLElement | null>(null);

  const deliver = useCallback((files: File[]) => {
    const accepted = filterFiles(files, accept);
    if (accepted.length > 0) onDrop(accepted);
  }, [accept, onDrop]);

  const drag = useFileDrag({ enabled, onDrop: (data) => deliver(Array.from(data.files)) });
  const pasteHandlers = usePasteFiles(zone, enabled, deliver);

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

  return { active: drag.active, dragHandlers: drag.handlers, pasteHandlers, zoneRef: setZone, inputRef, handleClick, handleFileInput, handleKeyDown };
};

export { useDropZone };
