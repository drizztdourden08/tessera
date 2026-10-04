/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';

const useClamped = (textRef: RefObject<HTMLElement | null>, active: boolean): boolean => {
  const [clamped, setClamped] = useState(false);

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!text || !active) return undefined;
    const update = () => setClamped(text.scrollHeight > text.clientHeight + 1);
    update();
    const view = ownerWindowOf(text) as Window & typeof globalThis;
    if (typeof view.ResizeObserver === 'undefined') return undefined;
    const observer = new view.ResizeObserver(update);
    observer.observe(text);
    return () => observer.disconnect();
  }, [textRef, active]);

  return clamped;
};

export { useClamped };
