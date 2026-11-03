/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../dom/observe-resize';
import { DEFAULT_BOX } from '../PixelThumbnail.constants';
import type { PixelThumbnailBox } from '../PixelThumbnail.type';

const useBoxSize = (box: PixelThumbnailBox, frameRef: RefObject<HTMLElement | null>): number => {
  const [measured, setMeasured] = useState(0);
  const fluid = box === 'fluid';
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!fluid || !frame) return undefined;
    setMeasured(Math.floor(frame.clientWidth));
    return observeResize([frame], (entries) => setMeasured(Math.floor(entries[0]?.contentRect.width ?? 0)));
  }, [fluid, frameRef]);
  if (box !== 'fluid') return box;
  return measured > 0 ? measured : DEFAULT_BOX;
};

export { useBoxSize };
