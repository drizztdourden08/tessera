/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { useOpenState } from '../../SideNav/behavior/useOpenState';
import type { PaneFoldOptions } from './layout-options.type';
import type { PaneFold } from './usePaneFold.type';

const usePaneFold = (options: PaneFoldOptions): PaneFold => {
  const { collapsible, collapsed, defaultCollapsed, onCollapsedChange, storageKey } = options;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [shown, change] = useOpenState({ open: collapsed, defaultOpen: defaultCollapsed, onOpenChange: onCollapsedChange, storageKey });
  const collapse = useCallback(() => {
    change(true);
    toggleRef.current?.focus();
  }, [change]);
  const toggle = useCallback(() => change((was) => !was), [change]);
  return { collapsed: collapsible && shown, toggleRef, toggle, collapse: collapsible ? collapse : undefined };
};

export { usePaneFold };
