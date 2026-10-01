/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import { useDismissListeners } from '../../../primitives/Portal';
import type { UsePanelOpenParams } from './usePanelOpen.type';

const usePanelOpen = (params: UsePanelOpenParams) => {
  const { rail, collapsed, defaultOpen, overlay, onSelect } = params;
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [panelOpen, setPanelOpen] = useState(defaultOpen);
  const floating = overlay && !rail;

  const close = useCallback(() => {
    setPanelOpen(false);
    const nav = navRef.current;
    if (nav?.contains(nav.ownerDocument.activeElement)) toggleRef.current?.focus();
  }, []);
  const toggle = useCallback(() => setPanelOpen((o) => !o), []);
  const openPanel = useCallback(() => setPanelOpen(true), []);
  const select = useCallback((id: string) => {
    onSelect(id);
    if (floating) close();
  }, [onSelect, floating, close]);

  useDismissListeners({ open: floating && panelOpen, onClose: close, contentRef: navRef, triggerRef: navRef });

  return { navRef, toggleRef, open: rail ? !collapsed : panelOpen, floating, toggle, openPanel, select };
};

export { usePanelOpen };
