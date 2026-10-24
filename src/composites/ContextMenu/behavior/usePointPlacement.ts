/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { OPEN_PLACEMENT } from '../ContextMenu.constants';
import type { ContextMenuPlacement, ContextMenuPoint } from '../ContextMenu.type';
import { pointPlacement } from './point-placement';

const usePointPlacement = (point: ContextMenuPoint): ContextMenuPlacement => {
  const [placement, setPlacement] = useState<ContextMenuPlacement>(OPEN_PLACEMENT);
  const { x, y } = point;
  useLayoutEffect(() => {
    setPlacement(pointPlacement({ x, y }, { width: window.innerWidth, height: window.innerHeight }));
  }, [x, y]);
  return placement;
};

export { usePointPlacement };
