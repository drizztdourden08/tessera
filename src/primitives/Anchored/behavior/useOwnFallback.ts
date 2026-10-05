/* @layer renderer-components @kind hook */
import type { RefObject } from 'react';
import type { FloatingPlacement } from '../../Floating/Floating.type';
import { useAnchorTracking } from '../../Portal/behavior/useAnchorTracking';
import type { AnchoredPlacement } from '../Anchored.type';
import { anchoredFallback } from './anchored-fallback';

const useOwnFallback = (active: boolean, anchorRef: RefObject<HTMLElement | null>, placement: AnchoredPlacement): FloatingPlacement | null => {
  const { position } = useAnchorTracking({
    active,
    anchorRef,
    compute: (rect, view) => anchoredFallback(anchorRef.current, rect, view, placement),
  });
  return position;
};

export { useOwnFallback };
