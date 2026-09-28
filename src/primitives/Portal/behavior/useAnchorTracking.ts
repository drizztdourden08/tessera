/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { clippingAncestorsOf } from './anchor-position';
import { overlaps } from './overlaps';
import { visibleBoundsOf } from './visible-bounds-of';
import { observeAnchorMovement } from './observe-anchor-movement';
import type { UseAnchorTrackingParams, UseAnchorTrackingResult } from './useAnchorTracking.type';

const useAnchorTracking = <T>(params: UseAnchorTrackingParams<T>): UseAnchorTrackingResult<T> => {
  const { active, anchorRef, compute, onOutOfView } = params;

  const [position, setPosition] = useState<T | null>(null);
  const computeRef = useRef(compute);
  const outOfViewRef = useRef(onOutOfView);
  const clipsRef = useRef<readonly Element[]>([]);

  computeRef.current = compute;
  outOfViewRef.current = onOutOfView;

  const measure = useCallback((dismissWhenHidden: boolean) => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    if (dismissWhenHidden && !overlaps(rect, visibleBoundsOf(clipsRef.current))) {
      outOfViewRef.current?.();
      return;
    }
    setPosition(computeRef.current(rect));
  }, [anchorRef]);

  const reposition = useCallback(() => measure(false), [measure]);

  useLayoutEffect(() => {
    if (!active) {
      clipsRef.current = [];
      setPosition(null);
      return;
    }
    clipsRef.current = anchorRef.current ? clippingAncestorsOf(anchorRef.current) : [];
    measure(false);
  }, [active, anchorRef, measure]);

  useEffect(() => {
    if (!active) return undefined;
    return observeAnchorMovement(window, {
      onScroll: () => measure(true),
      onResize: () => measure(false),
    });
  }, [active, measure]);

  return { position, reposition };
};

export { useAnchorTracking };
