/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../dom/owner-window';

const useFocusOnOpen = (open: boolean, targetRef: RefObject<HTMLElement | null>): void => {
  const openedOnMount = useRef(open);

  useEffect(() => {
    if (!open) {
      openedOnMount.current = false;
      return undefined;
    }
    if (openedOnMount.current) return undefined;
    const view = ownerWindowOf(targetRef.current);
    const frame = view.requestAnimationFrame(() => targetRef.current?.focus());
    return () => view.cancelAnimationFrame(frame);
  }, [open, targetRef]);
};

export { useFocusOnOpen };
