/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { TourBox } from './tour-internal.type';

const useNodeBox = (node: HTMLElement | null): TourBox | null => {
  const [box, setBox] = useState<TourBox | null>(null);

  useLayoutEffect(() => {
    if (!node) {
      setBox(null);
      return;
    }
    const rect = node.getBoundingClientRect();
    setBox({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  }, [node]);

  return box;
};

export { useNodeBox };
