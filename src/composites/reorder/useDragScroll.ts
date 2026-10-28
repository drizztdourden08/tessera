/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { ownerWindowOf } from '../../primitives/dom/owner-window';
import { scrollByEdge } from '../marquee/scroll-by-edge';
import type { RefObject } from 'react';
import type { ReorderPoint } from './reorder.type';

const useDragScroll = (
  active: boolean,
  scrollRef: RefObject<HTMLElement | null> | undefined,
  pointer: RefObject<ReorderPoint | null>,
  onScrolled: () => void,
): void => {
  const latest = useRef(onScrolled);
  useEffect(() => {
    latest.current = onScrolled;
  });
  useEffect(() => {
    const root = scrollRef?.current;
    if (!active || !root) return undefined;
    const view = ownerWindowOf(root);
    let frame = 0;
    const tick = () => {
      const at = pointer.current;
      if (at && scrollByEdge(root, at)) latest.current();
      frame = view.requestAnimationFrame(tick);
    };
    frame = view.requestAnimationFrame(tick);
    return () => view.cancelAnimationFrame(frame);
  }, [active, scrollRef, pointer]);
};

export { useDragScroll };
