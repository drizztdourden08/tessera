/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../dom/observe-resize';

const useAnchorResize = (active: boolean, anchorRef: RefObject<HTMLElement | null>, onResize: () => void): void => {
  const resizeRef = useRef(onResize);
  resizeRef.current = onResize;

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!active || !anchor) return undefined;
    return observeResize([anchor], () => resizeRef.current());
  }, [active, anchorRef]);
};

export { useAnchorResize };
