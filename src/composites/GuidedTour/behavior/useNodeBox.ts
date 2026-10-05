/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { sameBox } from './same-box';
import type { TourBox } from './tour-internal.type';

const useNodeBox = (node: HTMLElement | null, moved: unknown): TourBox | null => {
  const [box, setBox] = useState<TourBox | null>(null);

  useLayoutEffect(() => {
    if (!node) {
      setBox(null);
      return;
    }
    const rect = node.getBoundingClientRect();
    const next = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    setBox((last) => (sameBox(last, next) ? last : next));
  }, [node, moved]);

  return box;
};

export { useNodeBox };
