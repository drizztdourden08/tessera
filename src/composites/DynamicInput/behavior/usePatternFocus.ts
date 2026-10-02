/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import { asNode } from './as-node';
import { CLOSED_FOCUS } from './pattern-focus.constants';
import { slotIndexOf } from './slot-index-of';
import type { RefObject } from 'react';
import type { FocusState, PatternFocus } from './pattern-field.type';

const usePatternFocus = (rootRef: RefObject<HTMLElement | null>, popoverRef: RefObject<HTMLElement | null>): FocusState => {
  const [focus, setFocus] = useState<PatternFocus>(CLOSED_FOCUS);

  const setOpen = useCallback((open: boolean) => {
    setFocus((now) => (now.index === null || now.open === open ? now : { ...now, open }));
  }, []);

  const closeNow = useCallback(() => flushSync(() => setOpen(false)), [setOpen]);

  const handleFocus = useCallback((target: EventTarget) => {
    const node = asNode(target);
    if (node === null || popoverRef.current?.contains(node) === true) return;
    const index = slotIndexOf(node);
    setFocus(index === null ? CLOSED_FOCUS : { index, open: true });
  }, [popoverRef]);

  const handleBlur = useCallback((next: EventTarget | null) => {
    const node = asNode(next);
    const inside = node !== null && (rootRef.current?.contains(node) === true || popoverRef.current?.contains(node) === true);
    if (!inside) setFocus(CLOSED_FOCUS);
  }, [rootRef, popoverRef]);

  return { focus, setOpen, closeNow, handleFocus, handleBlur };
};

export { usePatternFocus };
