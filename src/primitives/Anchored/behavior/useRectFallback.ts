/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../dom/owner-window';
import type { FloatingPlacement } from '../../Floating/Floating.type';
import { observeAnchorMovement } from '../../Portal/behavior/observe-anchor-movement';
import type { AnchoredPlacement, AnchoredRectSource } from '../Anchored.type';
import { anchoredFallback } from './anchored-fallback';
import { boxOf } from './box-of';
import { rectOf } from './rect-of';
import { sourceKey } from './source-key';

const unchanged = (before: FloatingPlacement | null, after: FloatingPlacement | null): boolean =>
  JSON.stringify(before) === JSON.stringify(after);

const useRectFallback = (
  source: AnchoredRectSource | undefined,
  placement: AnchoredPlacement,
  popupRef: RefObject<HTMLElement | null>,
): FloatingPlacement | null => {
  const [position, setPosition] = useState<FloatingPlacement | null>(null);
  const sourceRef = useRef(source);
  sourceRef.current = source;
  const active = source !== undefined;
  const key = sourceKey(source);

  const measure = useCallback(() => {
    const rect = rectOf(sourceRef.current);
    const next = rect === null ? null : anchoredFallback(null, boxOf(rect), ownerWindowOf(popupRef.current), placement);
    setPosition((before) => (unchanged(before, next) ? before : next));
  }, [placement, popupRef]);

  useLayoutEffect(() => {
    if (active) measure();
  }, [active, measure, key]);

  useEffect(() => {
    if (!active) return undefined;
    return observeAnchorMovement(ownerWindowOf(popupRef.current), { onScroll: measure, onResize: measure });
  }, [active, measure, popupRef]);

  return active ? position : null;
};

export { useRectFallback };
