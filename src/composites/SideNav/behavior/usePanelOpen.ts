/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { useDismissListeners } from '../../../primitives/Portal';
import { useOpenState } from './useOpenState';
import type { UsePanelOpenParams } from './usePanelOpen.type';

const usePanelOpen = (params: UsePanelOpenParams) => {
  const { rail, collapsed, defaultOpen, overlay, onSelect, open, onOpenChange, storageKey } = params;
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const floating = overlay && !rail;
  const [panelOpen, setPanelOpen] = useOpenState({ open, defaultOpen, onOpenChange, storageKey: floating ? undefined : storageKey });

  const close = useCallback(() => {
    setPanelOpen(false);
    const nav = navRef.current;
    if (nav?.contains(nav.ownerDocument.activeElement)) toggleRef.current?.focus();
  }, [setPanelOpen]);
  const toggle = useCallback(() => setPanelOpen((was) => !was), [setPanelOpen]);
  const openPanel = useCallback(() => setPanelOpen(true), [setPanelOpen]);
  const select = useCallback((id: string) => {
    onSelect(id);
    if (floating) close();
  }, [onSelect, floating, close]);

  useDismissListeners({ open: floating && panelOpen, onClose: close, contentRef: navRef, triggerRef: navRef });

  return { navRef, toggleRef, open: rail ? !collapsed : panelOpen, floating, toggle, openPanel, select };
};

export { usePanelOpen };
