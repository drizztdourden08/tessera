/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useDismissListeners } from '../../../primitives/Portal';
import { nextMenuIndex } from './next-menu-index';

const useRateMenu = (onRate: (rate: number) => void) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    const menu = menuRef.current;
    if (menu?.contains(ownerDocumentOf(menu).activeElement)) rootRef.current?.querySelector('button')?.focus();
    setOpen(false);
  }, []);

  useDismissListeners({ open, onClose: close, contentRef: menuRef, triggerRef: rootRef });

  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
  }, [open]);

  const toggle = useCallback(() => setOpen((value) => !value), []);

  const choose = useCallback((rate: number) => {
    onRate(rate);
    close();
  }, [onRate, close]);

  const handleMenuKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitemradio"]'));
    const next = nextMenuIndex(event.key, items.findIndex((item) => item === event.target), items.length);
    if (next === null) return;
    event.preventDefault();
    items[next]?.focus();
  }, []);

  return { open, rootRef, menuRef, toggle, choose, handleMenuKeyDown };
};

export { useRateMenu };
