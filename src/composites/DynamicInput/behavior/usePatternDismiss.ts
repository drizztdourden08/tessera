/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { useDismissListeners } from '../../../primitives/Portal';
import type { PatternDismissParams } from './pattern-field.type';

const usePatternDismiss = (params: PatternDismissParams): (() => void) => {
  const { focusState, segments, rootRef, popoverRef } = params;
  const { focus, setOpen } = focusState;
  const { moveTo } = segments;

  const dismiss = useCallback(() => {
    const popover = popoverRef.current;
    const active = popover?.ownerDocument.activeElement ?? null;
    if (focus.index !== null && active !== null && popover?.contains(active) === true) moveTo(focus.index, 'all');
    setOpen(false);
  }, [focus.index, moveTo, popoverRef, setOpen]);

  useDismissListeners({ open: focus.open, onClose: dismiss, contentRef: popoverRef, triggerRef: rootRef });
  return dismiss;
};

export { usePatternDismiss };
