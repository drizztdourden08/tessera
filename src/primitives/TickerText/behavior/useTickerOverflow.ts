/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../dom/observe-resize';

const DISTANCE_PROPERTY = '--ticker-distance';

const useTickerOverflow = (rootRef: RefObject<HTMLElement | null>, trackRef: RefObject<HTMLElement | null>): boolean => {
  const [overflowing, setOverflowing] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return undefined;
    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - root.clientWidth);
      root.style.setProperty(DISTANCE_PROPERTY, `${distance}px`);
      setOverflowing(distance > 0);
    };
    measure();
    return observeResize([root, track], measure);
  }, [rootRef, trackRef]);

  return overflowing;
};

export { useTickerOverflow };
