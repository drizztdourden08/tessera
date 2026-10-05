/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { anchoredFallback } from '../../../primitives/Anchored/behavior/anchored-fallback';
import { useAnchorTracking } from '../../../primitives/Portal';
import type { MenuAnchor, UseMenuAnchorParams } from './useMenuAnchor.type';

const useMenuAnchor = (params: UseMenuAnchorParams): MenuAnchor => {
  const { anchorRef, side = 'below', align = 'start', inline, onOutOfView } = params;
  const detached = useRef<HTMLElement>(null);
  const anchor = anchorRef ?? detached;
  const placement = `${side === 'below' ? 'bottom' : 'top'}-${align}` as const;
  const { position } = useAnchorTracking({
    active: anchorRef !== undefined && !inline,
    anchorRef: anchor,
    compute: (rect, view) => anchoredFallback(anchor.current, rect, view, placement),
    onOutOfView,
  });
  return { anchor, placement, fallback: position };
};

export { useMenuAnchor };
