/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { MENU_SELECTOR } from './useMenuOpen.constants';
import type { MenuOpenBinding } from './useMenuOpen.type';

const useMenuOpen = <T extends HTMLElement>(): MenuOpenBinding<T> => {
  const anchorRef = useRef<T>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const handleMouseDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (anchorRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest(MENU_SELECTOR)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  return {
    anchorRef,
    open,
    toggle: () => setOpen((wasOpen) => !wasOpen),
    close: () => setOpen(false),
  };
};

export { useMenuOpen };
