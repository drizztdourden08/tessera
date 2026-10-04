/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { readStoredOpen } from './read-stored-open';
import { writeStoredOpen } from './write-stored-open';
import type { OpenUpdate, UseOpenStateParams } from './useOpenState.type';

const useOpenState = (params: UseOpenStateParams): [boolean, (next: OpenUpdate) => void] => {
  const { open, defaultOpen, onOpenChange, storageKey } = params;
  const [own, setOwn] = useState(() => readStoredOpen(storageKey) ?? defaultOpen);
  const shown = open ?? own;
  const shownRef = useRef(shown);
  useLayoutEffect(() => {
    shownRef.current = shown;
  }, [shown]);

  const change = useCallback((next: OpenUpdate) => {
    const value = typeof next === 'function' ? next(shownRef.current) : next;
    if (value === shownRef.current) return;
    setOwn(value);
    writeStoredOpen(storageKey, value);
    onOpenChange?.(value);
  }, [storageKey, onOpenChange]);

  return [shown, change];
};

export { useOpenState };
