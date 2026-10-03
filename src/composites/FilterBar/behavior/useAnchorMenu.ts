/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';

const useAnchorMenu = <T extends HTMLElement>(portalSelector: string, initialOpen = false) => {
  const anchorRef = useRef<T>(null);
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (anchorRef.current?.contains(target)) return;
      if ((target as Partial<Element>).closest?.(portalSelector)) return;
      setOpen(false);
    };
    const doc = ownerDocumentOf(anchorRef.current);
    doc.addEventListener('mousedown', handlePointerDown);
    return () => doc.removeEventListener('mousedown', handlePointerDown);
  }, [open, portalSelector]);

  return {
    anchorRef,
    open,
    toggle: () => setOpen((wasOpen) => !wasOpen),
    close: () => setOpen(false),
  };
};

export { useAnchorMenu };
