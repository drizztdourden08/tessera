/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../dom/owner-window';

const useAnchorResize = (active: boolean, anchorRef: RefObject<HTMLElement | null>, onResize: () => void): void => {
  const resizeRef = useRef(onResize);
  resizeRef.current = onResize;

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!active || !anchor) return undefined;
    const view = ownerWindowOf(anchor) as Window & typeof globalThis;
    const observer = new view.ResizeObserver(() => resizeRef.current());
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [active, anchorRef]);
};

export { useAnchorResize };
