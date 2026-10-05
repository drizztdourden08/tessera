/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { readStored } from '../../../primitives/dom/read-stored';
import { writeStored } from '../../../primitives/dom/write-stored';
import { storedOpen } from './stored-open';
import type { OpenUpdate, UseOpenStateParams } from './useOpenState.type';

const useOpenState = (params: UseOpenStateParams): [boolean, (next: OpenUpdate) => void] => {
  const { open, defaultOpen, onOpenChange, storageKey } = params;
  const [own, setOwn] = useState(() => readStored(storageKey, storedOpen) ?? defaultOpen);
  const shown = open ?? own;
  const shownRef = useRef(shown);
  useLayoutEffect(() => {
    shownRef.current = shown;
  }, [shown]);

  const change = useCallback((next: OpenUpdate) => {
    const value = typeof next === 'function' ? next(shownRef.current) : next;
    if (value === shownRef.current) return;
    setOwn(value);
    writeStored(storageKey, value);
    onOpenChange?.(value);
  }, [storageKey, onOpenChange]);

  return [shown, change];
};

export { useOpenState };
