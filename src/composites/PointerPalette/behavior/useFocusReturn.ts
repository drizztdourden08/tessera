/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { restoreFocus } from '../../../primitives/dom/restore-focus';

const useFocusReturn = (open: boolean, origin: RefObject<HTMLElement | null>): void => {
  const wasOpen = useRef(false);

  useLayoutEffect(() => {
    if (wasOpen.current && !open) {
      restoreFocus(origin.current);
      origin.current = null;
    }
    wasOpen.current = open;
  }, [open, origin]);
};

export { useFocusReturn };
