/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { TourSize } from './tour-internal.type';

const useNodeSize = (node: HTMLElement | null): TourSize | null => {
  const [size, setSize] = useState<TourSize | null>(null);

  useLayoutEffect(() => {
    if (!node) {
      setSize(null);
      return undefined;
    }
    const read = (): void => {
      const { width, height } = node.getBoundingClientRect();
      setSize((last) => (last?.width === width && last.height === height ? last : { width, height }));
    };
    read();
    return observeResize([node], read);
  }, [node]);

  return size;
};

export { useNodeSize };
