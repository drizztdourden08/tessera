/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import { altTap } from './alt-tap';

const useAltReveal = (tucked: boolean, barRef: RefObject<HTMLElement | null>, returnRef: RefObject<Element | null>): void => {
  useEffect(() => {
    const bar = barRef.current;
    if (!tucked || !bar) return undefined;
    const view = bar.ownerDocument.defaultView ?? window;
    let armed = false;
    const onKey = (event: KeyboardEvent) => {
      const tap = altTap(armed, event);
      armed = tap.armed;
      if (!tap.fire || bar.contains(bar.ownerDocument.activeElement)) return;
      event.preventDefault();
      returnRef.current = bar.ownerDocument.activeElement;
      tabbablesIn(bar)[0]?.focus();
    };
    view.addEventListener('keydown', onKey, true);
    view.addEventListener('keyup', onKey, true);
    return () => {
      view.removeEventListener('keydown', onKey, true);
      view.removeEventListener('keyup', onKey, true);
    };
  }, [tucked, barRef, returnRef]);
};

export { useAltReveal };
