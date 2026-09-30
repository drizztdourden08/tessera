/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';

const useShownPopover = (active: boolean, popupRef: RefObject<HTMLElement | null>): void => {
  useLayoutEffect(() => {
    const popup = popupRef.current;
    if (!active || !popup || popup.matches(':popover-open')) return;
    popup.showPopover();
  }, [active, popupRef]);
};

export { useShownPopover };
