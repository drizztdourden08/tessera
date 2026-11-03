/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { PixelSize } from '../../../primitives/pixel-image/pixel-image.type';

const useStageSize = (ref: RefObject<Element | null>): PixelSize => {
  const [size, setSize] = useState<PixelSize>({ width: 0, height: 0 });
  useEffect(
    () => observeResize([ref.current], (entries) => {
      const box = entries[0]?.contentRect;
      if (box) setSize({ width: box.width, height: box.height });
    }),
    [ref],
  );
  return size;
};

export { useStageSize };
