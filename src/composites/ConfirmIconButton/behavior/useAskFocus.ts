/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef } from 'react';
import type { AskFocus } from './useAskFocus.type';

const lost = (doc: Document): boolean => doc.activeElement === null || doc.activeElement === doc.body;

const useAskFocus = (asking: unknown): AskFocus => {
  const holdRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const back = useRef(false);

  useLayoutEffect(() => {
    if (asking !== null || !back.current) return;
    back.current = false;
    const trigger = triggerRef.current;
    if (trigger && lost(trigger.ownerDocument)) trigger.focus();
  }, [asking]);

  const leave = (): boolean => {
    const hold = holdRef.current;
    const held = hold?.contains(hold.ownerDocument.activeElement) === true;
    back.current = held;
    return held;
  };

  return { holdRef, triggerRef, leave };
};

export { useAskFocus };
