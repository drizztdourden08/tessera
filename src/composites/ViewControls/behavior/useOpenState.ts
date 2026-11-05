/* @layer renderer-components @kind hook */
import { useState } from 'react';

const useOpenState = (open: boolean | undefined, defaultOpen: boolean, onOpenChange?: (next: boolean) => void) => {
  const [inner, setInner] = useState(defaultOpen);
  const current = open ?? inner;
  const setOpen = (next: boolean): void => {
    setInner(next);
    onOpenChange?.(next);
  };
  return { open: current, setOpen };
};

export { useOpenState };
