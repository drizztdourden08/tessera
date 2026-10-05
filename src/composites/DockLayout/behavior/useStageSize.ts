/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { Size } from '../DockLayout.type';

const useStageSize = (ref: RefObject<HTMLElement | null>): Size | null => {
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const read = (): void => {
      const { width, height } = el.getBoundingClientRect();
      setSize((prev) => (prev?.width === width && prev.height === height ? prev : { width, height }));
    };
    read();
    return observeResize([el], read);
  }, [ref]);

  return size;
};

export { useStageSize };
