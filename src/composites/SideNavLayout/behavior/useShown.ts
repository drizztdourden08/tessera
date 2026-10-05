/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';

const useShown = (ref: RefObject<HTMLElement | null>): boolean => {
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null) return undefined;
    const check = () => setShown(element.getClientRects().length > 0);
    check();
    return observeResize([element], check);
  }, [ref]);

  return shown;
};

export { useShown };
