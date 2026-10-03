/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from './owner-window';

const useInView = (ref: RefObject<Element | null>): boolean => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const Observer = (ownerWindowOf(node) as Window & typeof globalThis).IntersectionObserver;
    const observer = new Observer((entries) => setInView(entries.some((entry) => entry.isIntersecting)));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

export { useInView };
