/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from './observe-resize';
import type { ChoiceRoomOf } from './choice-room.type';

const useChoiceFit = (probeRef: RefObject<HTMLElement | null>, roomOf: ChoiceRoomOf, contentKey: string): boolean => {
  const [fits, setFits] = useState(true);
  const latest = useRef(roomOf);
  latest.current = roomOf;

  useLayoutEffect(() => {
    const probe = probeRef.current;
    const room = probe ? latest.current(probe) : null;
    if (!probe || !room) return undefined;
    const update = () => {
      const now = latest.current(probe);
      if (now) setFits(probe.getBoundingClientRect().width <= now.width);
    };
    update();
    return observeResize([room.box, probe], update);
  }, [probeRef, contentKey]);

  return fits;
};

export { useChoiceFit };
