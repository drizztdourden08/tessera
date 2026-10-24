/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { anchoredFallback } from '../../../primitives/Anchored/behavior/anchored-fallback';
import { useAnchorTracking } from '../../../primitives/Portal';
import { menuPlacement } from './menu-placement';
import { resolveSide } from './resolve-side';
import type { MenuAnchor, UseMenuAnchorParams } from './useMenuAnchor.type';

const useMenuAnchor = (params: UseMenuAnchorParams): MenuAnchor => {
  const { anchorRef, side = 'below', align = 'start', inline, onOutOfView } = params;
  const detached = useRef<HTMLElement>(null);
  const anchor = anchorRef ?? detached;
  const placement = menuPlacement(side, align);
  const { position } = useAnchorTracking({
    active: anchorRef !== undefined && !inline,
    anchorRef: anchor,
    compute: (rect, view) => anchoredFallback(anchor.current, rect, view, menuPlacement(resolveSide(side, rect, view.innerWidth), align)),
    onOutOfView,
  });
  return { anchor, placement, fallback: position };
};

export { useMenuAnchor };
