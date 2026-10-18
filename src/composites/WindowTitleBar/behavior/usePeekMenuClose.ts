/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { cancelHide } from './cancel-hide';
import type { PeekMenuCloseOptions } from './peek-menu-close-options.type';
import { scheduleHide } from './schedule-hide';

const usePeekMenuClose = (options: PeekMenuCloseOptions): void => {
  const { tucked, menuOpen, inside, timer, setPeeking } = options;
  const wasOpen = useRef(false);
  useEffect(() => {
    const closed = wasOpen.current && !menuOpen;
    wasOpen.current = menuOpen;
    if (menuOpen) cancelHide(timer);
    else if (closed && tucked && !inside.current) scheduleHide(timer, setPeeking);
  }, [tucked, menuOpen, inside, timer, setPeeking]);
};

export { usePeekMenuClose };
