/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { MENU_SELECTOR } from './use-menu-open.constants';
import type { MenuOpenBinding } from './use-menu-open.type';

const useMenuOpen = <T extends HTMLElement>(): MenuOpenBinding<T> => {
  const anchorRef = useRef<T>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const handleMouseDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (anchorRef.current?.contains(target)) return;
      if ((target as Partial<Element>).closest?.(MENU_SELECTOR)) return;
      setOpen(false);
    };
    const doc = ownerDocumentOf(anchorRef.current);
    doc.addEventListener('mousedown', handleMouseDown);
    return () => doc.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  return {
    anchorRef,
    open,
    toggle: () => setOpen((wasOpen) => !wasOpen),
    close: () => setOpen(false),
  };
};

export { useMenuOpen };
