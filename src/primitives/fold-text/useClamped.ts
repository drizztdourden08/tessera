/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../dom/observe-resize';

const useClamped = (textRef: RefObject<HTMLElement | null>, active: boolean): boolean => {
  const [clamped, setClamped] = useState(false);

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!text || !active) return undefined;
    const update = () => setClamped(text.scrollHeight > text.clientHeight + 1);
    update();
    return observeResize([text], update);
  }, [textRef, active]);

  return clamped;
};

export { useClamped };
