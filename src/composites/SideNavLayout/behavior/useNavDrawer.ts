/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDismissListeners } from '../../../primitives/Portal';
import { CURRENT_ITEM, FIRST_ITEM } from './useNavDrawer.constants';
import type { NavDrawer } from './useNavDrawer.type';
import { useShown } from './useShown';

const useNavDrawer = (onSelect: (id: string) => void): NavDrawer => {
  const barRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const compact = useShown(barRef);
  const [wanted, setWanted] = useState(false);
  const open = compact && wanted;

  const close = useCallback(() => {
    setWanted(false);
    const drawer = drawerRef.current;
    if (drawer?.contains(drawer.ownerDocument.activeElement)) buttonRef.current?.focus();
  }, []);
  const toggle = useCallback(() => setWanted((was) => !was), []);
  const select = useCallback((id: string) => {
    onSelect(id);
    close();
  }, [onSelect, close]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (open) (drawer?.querySelector<HTMLElement>(CURRENT_ITEM) ?? drawer?.querySelector<HTMLElement>(FIRST_ITEM))?.focus();
  }, [open]);
  useDismissListeners({ open, onClose: close, contentRef: drawerRef, triggerRef: buttonRef, level: 'dialog' });

  return { barRef, drawerRef, buttonRef, compact, open, toggle, select };
};

export { useNavDrawer };
