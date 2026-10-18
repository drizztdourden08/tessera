/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { PEEK_ZONE_PX } from '../WindowTitleBar.constants';
import { cancelHide } from './cancel-hide';
import type { PeekZoneOptions } from './peek-zone-options.type';
import { scheduleHide } from './schedule-hide';

const usePeekZone = (options: PeekZoneOptions): void => {
  const { tucked, follow, menuOpen, barRef, timer, setPeeking } = options;
  useEffect(() => {
    if (!tucked || !follow) {
      cancelHide(timer);
      setPeeking(false);
      return undefined;
    }
    const view = barRef.current?.ownerDocument.defaultView ?? window;
    const onMove = (event: MouseEvent) => {
      const bar = barRef.current;
      if (menuOpen || bar?.contains(event.target as Node)) {
        cancelHide(timer);
        return;
      }
      const top = bar?.parentElement?.getBoundingClientRect().top ?? 0;
      const depth = event.clientY - top;
      if (depth >= 0 && depth <= PEEK_ZONE_PX) {
        cancelHide(timer);
        setPeeking(true);
      } else scheduleHide(timer, setPeeking);
    };
    view.addEventListener('mousemove', onMove);
    return () => view.removeEventListener('mousemove', onMove);
  }, [tucked, follow, menuOpen, barRef, timer, setPeeking]);
};

export { usePeekZone };
