/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { useAnchorTracking } from '../../../primitives/Portal';
import { menuPlacement } from './menu-placement';
import type { MenuAnchor, UseMenuAnchorParams } from './useMenuAnchor.type';

const useMenuAnchor = (params: UseMenuAnchorParams): MenuAnchor => {
  const { anchorRef, side = 'below', align = 'start', inline } = params;
  const detached = useRef<HTMLElement>(null);
  const anchor = anchorRef ?? detached;
  const { position } = useAnchorTracking({
    active: anchorRef !== undefined && !inline,
    anchorRef: anchor,
    compute: (rect, view) => menuPlacement(rect, view, side, align),
  });
  const placement = `${side === 'below' ? 'bottom' : 'top'}-${align}` as const;
  return { anchor, placement, fallback: position };
};

export { useMenuAnchor };
