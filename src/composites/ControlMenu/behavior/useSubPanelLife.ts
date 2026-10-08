/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useDismissListeners } from '../../../primitives/Portal';
import { focusFirst } from './focus-first';

const useSubPanelLife = (panelRef: RefObject<HTMLElement | null>, anchorRef: RefObject<HTMLElement | null>, focus: boolean, onBack: () => void): void => {
  useDismissListeners({ open: true, onClose: onBack, contentRef: panelRef, triggerRef: anchorRef, level: 'menu' });
  useEffect(() => {
    if (!focus) return undefined;
    const frame = requestAnimationFrame(() => focusFirst(panelRef.current));
    return () => cancelAnimationFrame(frame);
  }, [focus, panelRef]);
};

export { useSubPanelLife };
