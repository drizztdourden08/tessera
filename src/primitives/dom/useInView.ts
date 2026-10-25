/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { InViewOptions } from './in-view.type';
import { ownerWindowOf } from './owner-window';

const useInView = (ref: RefObject<Element | null>, options: InViewOptions = {}): boolean => {
  const { dwell = 0, once = false, threshold = 0, rootMargin } = options;
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const view = ownerWindowOf(node) as Window & typeof globalThis;
    let timer: number | undefined;
    const settle = (seen: boolean) => {
      if (timer !== undefined) view.clearTimeout(timer);
      timer = undefined;
      if (!seen) { if (!once) setInView(false); return; }
      if (dwell <= 0) { setInView(true); return; }
      timer = view.setTimeout(() => setInView(true), dwell);
    };
    const observer = new view.IntersectionObserver((entries) => settle(entries.some((entry) => entry.isIntersecting)), { threshold, rootMargin });
    observer.observe(node);
    return () => { observer.disconnect(); if (timer !== undefined) view.clearTimeout(timer); };
  }, [ref, dwell, once, threshold, rootMargin]);
  return inView;
};

export { useInView };
