/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { splitFiles } from './split-files';
import { useFileDrag } from './useFileDrag';
import { usePasteFiles } from './usePasteFiles';
import type { DropZoneBehavior, DropZoneOptions } from './useDropZone.type';

const useDropZone = (options: DropZoneOptions): DropZoneBehavior => {
  const { accept, enabled, onDrop, onReject } = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const [zone, setZone] = useState<HTMLElement | null>(null);

  const deliver = useCallback((files: File[]) => {
    const { accepted, rejected } = splitFiles(files, accept);
    if (accepted.length > 0) onDrop(accepted);
    if (rejected.length > 0) onReject?.(rejected);
  }, [accept, onDrop, onReject]);

  const drag = useFileDrag({ enabled, onDrop: (data) => deliver(Array.from(data.files)) });
  const pasteHandlers = usePasteFiles(zone, enabled, deliver);

  const handleClick = () => {
    if (enabled) inputRef.current?.click();
  };

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
