/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { ownerWindowOf } from '../../dom/owner-window';
import type { PasteFiles } from './usePasteFiles.type';

const usePasteFiles = (zone: HTMLElement | null, enabled: boolean, onFiles: (files: File[]) => void): PasteFiles => {
  const [over, setOver] = useState(false);
  const [focused, setFocused] = useState(false);
  const target = enabled && (over || focused) ? zone : null;

  useEffect(() => {
    if (!target) return undefined;
    const view = ownerWindowOf(target);
    const paste = (event: ClipboardEvent) => {
      const files = Array.from(event.clipboardData?.files ?? []);
      if (files.length === 0) return;
      event.preventDefault();
      onFiles(files);
    };
    view.addEventListener('paste', paste);
    return () => view.removeEventListener('paste', paste);
  }, [target, onFiles]);

  return {
    onPointerEnter: useCallback(() => setOver(true), []),
    onPointerLeave: useCallback(() => setOver(false), []),
    onFocus: useCallback(() => setFocused(true), []),
    onBlur: useCallback(() => setFocused(false), []),
  };
};

export { usePasteFiles };
