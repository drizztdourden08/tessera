/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const useWheelListener = (nodeRef: RefObject<HTMLElement | null>, onWheel: ((event: WheelEvent) => void) | undefined): void => {
  const latest = useRef(onWheel);
  useEffect(() => {
    latest.current = onWheel;
  });
  const listening = onWheel !== undefined;
  useEffect(() => {
    const node = nodeRef.current;
    if (!listening || !node) return undefined;
    const handle = (event: WheelEvent) => latest.current?.(event);
    node.addEventListener('wheel', handle, { passive: false });
    return () => node.removeEventListener('wheel', handle);
  }, [listening, nodeRef]);
};

export { useWheelListener };
