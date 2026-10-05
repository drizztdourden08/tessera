/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { measureHole } from './measure-hole';
import { sameBox } from './same-box';
import type { HoleRect } from './tour-internal.type';

const useHoleRect = (target: HTMLElement | null, ringRef: RefObject<HTMLElement | null>): HoleRect | null => {
  const [hole, setHole] = useState<HoleRect | null>(null);

  useLayoutEffect(() => {
    if (!target) {
      setHole(null);
      return undefined;
    }
    const view = ownerWindowOf(target) as Window & typeof globalThis;
    let frame = 0;
    const measure = (): void => {
      frame = 0;
      if (!target.isConnected) return;
      const next = measureHole(target, ringRef.current);
      setHole((last) => (sameBox(last, next) ? last : next));
    };
    const soon = (): void => {
      if (frame === 0) frame = view.requestAnimationFrame(measure);
    };
    measure();
    const observer = new view.ResizeObserver(soon);
    observer.observe(target);
    observer.observe(view.document.body);
    view.addEventListener('resize', soon);
    view.document.addEventListener('scroll', soon, true);
    return () => {
      view.cancelAnimationFrame(frame);
      observer.disconnect();
      view.removeEventListener('resize', soon);
      view.document.removeEventListener('scroll', soon, true);
    };
  }, [target, ringRef]);

  return hole;
};

export { useHoleRect };
