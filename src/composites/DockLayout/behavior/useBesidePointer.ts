/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { GHOST_OFFSET } from '../DockLayout.constants';
import { besidePointer } from './beside-pointer';
import type { BesideFrame, BesidePlace } from './beside-pointer.type';
import type { Point } from './drag.type';

const useBesidePointer = (ref: RefObject<HTMLElement | null>, pointer: Point, frameOf: (box: HTMLElement) => BesideFrame): BesidePlace => {
  const [place, setPlace] = useState<BesidePlace | null>(null);
  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    const { area, origin } = frameOf(box);
    const at = { x: pointer.x - origin.x, y: pointer.y - origin.y };
    const next = besidePointer(at, { width: box.offsetWidth, height: box.offsetHeight }, area, GHOST_OFFSET);
    setPlace((prev) => (prev?.left === next.left && prev.top === next.top ? prev : next));
  });
  return place ?? { left: pointer.x + GHOST_OFFSET, top: pointer.y + GHOST_OFFSET };
};

export { useBesidePointer };
