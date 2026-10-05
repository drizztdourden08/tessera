/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { activeBoxOf } from './active-box-of';
import type { ActiveMarker } from './active-box.type';
import { observeResize } from './observe-resize';
import { sameActiveBox } from './same-active-box';
import { HIDDEN_MARKER } from './active-marker.constants';

const useActiveMarker = (trackRef: RefObject<HTMLElement | null>, activeSelector: string, changeKey: unknown): ActiveMarker => {
  const [marker, setMarker] = useState<ActiveMarker>(HIDDEN_MARKER);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const next = activeBoxOf(track, track.querySelector<HTMLElement>(activeSelector));
    setMarker((last) => {
      if (next === null) return last.shown ? { box: last.box, shown: false } : last;
      return last.shown && sameActiveBox(last.box, next) ? last : { box: next, shown: true };
    });
  }, [trackRef, activeSelector]);

  useLayoutEffect(measure, [measure, changeKey]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    return track ? observeResize([track, ...track.children], measure) : undefined;
  }, [trackRef, measure, changeKey]);

  return marker;
};

export { useActiveMarker };
