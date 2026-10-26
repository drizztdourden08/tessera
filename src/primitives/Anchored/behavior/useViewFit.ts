/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { cssZoomOf } from '../../dom/css-zoom-of';
import { ownerWindowOf } from '../../dom/owner-window';
import { fitInView } from './fit-in-view';
import { MARGIN, SHIFT_X, SHIFT_Y } from './useViewFit.constants';

const px = (value: number): string => `${String(value)}px`;

const useViewFit = (active: boolean, nodeRef: RefObject<HTMLElement | null>, anchorRef: RefObject<HTMLElement | null> | undefined): void => {
  useLayoutEffect(() => {
    const node = nodeRef.current;
    const anchor = anchorRef?.current;
    if (!active || !node || !anchor) return;
    const view = ownerWindowOf(node);
    const zoom = cssZoomOf(node);
    node.style.setProperty(SHIFT_X, px(0));
    node.style.setProperty(SHIFT_Y, px(0));
    const margin = (Number.parseFloat(view.getComputedStyle(node).getPropertyValue(MARGIN)) || 0) * zoom;
    const shift = fitInView(node.getBoundingClientRect(), anchor.getBoundingClientRect(), { width: view.innerWidth, height: view.innerHeight }, margin);
    node.style.setProperty(SHIFT_X, px(shift.x / zoom));
    node.style.setProperty(SHIFT_Y, px(shift.y / zoom));
  });
};

export { useViewFit };
