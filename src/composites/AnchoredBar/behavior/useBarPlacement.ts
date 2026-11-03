/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { observeAnchorMovement } from '../../../primitives/Portal/behavior/observe-anchor-movement';
import { BAR_GAP_PROPERTY, BAR_MARGIN_PROPERTY } from '../AnchoredBar.constants';
import { barBounds } from './bar-bounds';
import { barOrigin } from './bar-origin';
import { barPosition } from './bar-position';
import type { BarSpot } from './bar-position.type';
import type { BarPlacementSetup } from './useBarPlacement.type';

const sameSpot = (a: BarSpot | null, b: BarSpot): boolean =>
  a !== null && a.left === b.left && a.top === b.top && a.docked === b.docked && a.parked === b.parked;

const useBarPlacement = (setup: BarPlacementSetup): BarSpot | null => {
  const { nodeRef, follow, subscribe } = setup;
  const [spot, setSpot] = useState<BarSpot | null>(null);
  const latest = useRef(setup);
  latest.current = setup;

  const measure = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const { anchorRect, boundary, inline, placement, dock } = latest.current;
    const view = ownerWindowOf(node);
    const style = view.getComputedStyle(node);
    const box = node.getBoundingClientRect();
    const placed = barPosition({
      anchor: anchorRect(),
      bounds: barBounds(boundary, node, view),
      size: { width: box.width, height: box.height },
      margin: Number.parseFloat(style.getPropertyValue(BAR_MARGIN_PROPERTY)) || 0,
      gap: Number.parseFloat(style.getPropertyValue(BAR_GAP_PROPERTY)) || 0,
      placement,
      dock,
    });
    const origin = barOrigin(node, inline);
    const next = { ...placed, left: placed.left - origin.x, top: placed.top - origin.y };
    setSpot((before) => (sameSpot(before, next) ? before : next));
  }, [nodeRef]);

  useLayoutEffect(() => {
    if (follow || spot === null) measure();
  });

  useEffect(() => {
    if (!follow) return undefined;
    const stop = observeAnchorMovement(ownerWindowOf(nodeRef.current), { onScroll: measure, onResize: measure });
    const unsubscribe = subscribe?.(measure);
    return () => {
      stop();
      unsubscribe?.();
    };
  }, [follow, subscribe, measure, nodeRef]);

  return spot;
};

export { useBarPlacement };
