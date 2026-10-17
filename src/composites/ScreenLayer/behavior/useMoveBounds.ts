/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { Rect } from '../../rect-drag/rect-drag.type';
import { moveBounds } from './move-bounds';

const useMoveBounds = (frame: HTMLElement | null): Rect | null => {
  const [bounds, setBounds] = useState<Rect | null>(null);
  useLayoutEffect(() => {
    if (!frame) return undefined;
    setBounds(moveBounds(frame));
    return observeResize([frame.parentElement], () => setBounds(moveBounds(frame)));
  }, [frame]);
  return frame ? bounds : null;
};

export { useMoveBounds };
