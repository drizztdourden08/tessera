/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { cssZoomOf } from '../../dom/css-zoom-of';
import { ownerWindowOf } from '../../dom/owner-window';
import { fitInBox } from './fit-in-box';
import { MARGIN, SHIFT_X, SHIFT_Y } from './useViewFit.constants';
import type { UseViewFitParams } from './useViewFit.type';

const px = (value: number): string => `${String(value)}px`;

const useViewFit = (params: UseViewFitParams): void => {
  const { active, nodeRef, anchorBox, boundaryRef } = params;
  useLayoutEffect(() => {
    const node = nodeRef.current;
    const anchor = anchorBox();
    if (!active || !node || !anchor) return;
    const view = ownerWindowOf(node);
    const zoom = cssZoomOf(node);
    node.style.setProperty(SHIFT_X, px(0));
    node.style.setProperty(SHIFT_Y, px(0));
    const margin = (Number.parseFloat(view.getComputedStyle(node).getPropertyValue(MARGIN)) || 0) * zoom;
    const bounds = boundaryRef?.current?.getBoundingClientRect() ?? { left: 0, top: 0, right: view.innerWidth, bottom: view.innerHeight };
    const shift = fitInBox(node.getBoundingClientRect(), anchor, bounds, margin);
    node.style.setProperty(SHIFT_X, px(shift.x / zoom));
    node.style.setProperty(SHIFT_Y, px(shift.y / zoom));
  });
};

export { useViewFit };
