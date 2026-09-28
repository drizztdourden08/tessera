/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';

const useAnchorMenu = <T extends HTMLElement>(portalSelector: string) => {
  const anchorRef = useRef<T>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (anchorRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest(portalSelector)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open, portalSelector]);

  return {
    anchorRef,
    open,
    toggle: () => setOpen((wasOpen) => !wasOpen),
    close: () => setOpen(false),
  };
};

export { useAnchorMenu };
