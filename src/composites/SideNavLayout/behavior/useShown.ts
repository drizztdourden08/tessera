/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

const useShown = (ref: RefObject<HTMLElement | null>): boolean => {
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null) return undefined;
    const check = () => setShown(element.getClientRects().length > 0);
    check();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return shown;
};

export { useShown };
