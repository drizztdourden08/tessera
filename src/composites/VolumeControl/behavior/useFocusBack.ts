/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { FocusWatch } from '../VolumeControl.type';

const useFocusBack = (open: boolean, buttonRef: RefObject<HTMLButtonElement | null>): FocusWatch => {
  const inside = useRef(false);

  useEffect(() => {
    if (open || !inside.current) return;
    inside.current = false;
    const button = buttonRef.current;
    const active = button?.ownerDocument.activeElement;
    if (button && (active === null || active === button.ownerDocument.body)) button.focus();
  }, [open, buttonRef]);

  return {
    onFocus: () => { inside.current = true; },
    onBlur: () => { inside.current = false; },
  };
};

export { useFocusBack };
