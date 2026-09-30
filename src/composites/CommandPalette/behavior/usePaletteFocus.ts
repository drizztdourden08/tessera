/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';

const usePaletteFocus = (open: boolean, inputRef: RefObject<HTMLInputElement | null>): void => {
  useEffect(() => {
    const input = inputRef.current;
    if (!open || !input) return undefined;
    const previous = input.ownerDocument.activeElement;
    input.focus({ preventScroll: true });
    return () => {
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, [open, inputRef]);
};

export { usePaletteFocus };
