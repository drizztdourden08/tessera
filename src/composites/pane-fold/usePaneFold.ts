/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef } from 'react';
import { useOpenState } from '../SideNav/behavior/useOpenState';
import type { PaneFold, PaneFoldOptions } from './pane-fold.type';

const usePaneFold = (options: PaneFoldOptions): PaneFold => {
  const { collapsible, collapsed, defaultCollapsed, onCollapsedChange, storageKey } = options;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const refocus = useRef(false);
  const [shown, change] = useOpenState({ open: collapsed, defaultOpen: defaultCollapsed, onOpenChange: onCollapsedChange, storageKey });
  useLayoutEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    const button = toggleRef.current;
    const focused = button?.ownerDocument.activeElement;
    if (button && (!focused || focused === button.ownerDocument.body)) button.focus();
  }, [shown]);
  const collapse = useCallback(() => {
    refocus.current = true;
    change(true);
    toggleRef.current?.focus();
  }, [change]);
  const toggle = useCallback(() => {
    const button = toggleRef.current;
    refocus.current = button !== null && button === button.ownerDocument.activeElement;
    change((was) => !was);
  }, [change]);
  return { collapsed: collapsible && shown, toggleRef, toggle, collapse: collapsible ? collapse : undefined };
};

export { usePaneFold };
