/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { observeResize } from '../../primitives/dom/observe-resize';
import { isElement } from '../../primitives/dom/is-element';
import { INITIAL_METRICS, OVERSCAN } from './virtual.constants';
import { indexOfTarget } from './index-of-target';
import { readVirtualMetrics } from './read-virtual-metrics';
import { renderedIndices } from './rendered-indices';
import { sameMetrics } from './same-metrics';
import { visibleRange } from './visible-range';
import type { FocusEvent } from 'react';
import type { VirtualMetrics, VirtualWindow, VirtualWindowInput } from './virtual.type';

const useVirtualWindow = (input: VirtualWindowInput): VirtualWindow => {
  const { enabled, count, keyAt, rootRef, indexAttribute, overscan = OVERSCAN } = input;
  const bodyRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState<VirtualMetrics>(INITIAL_METRICS);
  const [focusKey, setFocusKey] = useState<string | null>(null);

  const measure = useCallback(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return;
    setMetrics((before) => {
      const next = readVirtualMetrics(root, body, before.rowHeight);
      return sameMetrics(before, next) ? before : next;
    });
  }, [rootRef]);

  useEffect(() => {
    if (!enabled) return undefined;
    measure();
    return observeResize([rootRef.current], measure);
  }, [enabled, count, measure, rootRef]);

  const indices = useMemo(() => {
    const range = visibleRange({
      scrollTop: metrics.top, viewport: metrics.viewport, rowHeight: metrics.rowHeight, count, overscan,
    });
    let pinned = -1;
    if (focusKey !== null) {
      for (let at = 0; at < count && pinned < 0; at += 1) if (keyAt(at) === focusKey) pinned = at;
    }
    return renderedIndices(range, pinned);
  }, [metrics, count, keyAt, focusKey, overscan]);

  const onFocus = useCallback((event: FocusEvent<HTMLElement>) => {
    setFocusKey(keyAt(indexOfTarget(event.target, indexAttribute)) ?? null);
  }, [keyAt, indexAttribute]);

  const onBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (isElement(next) && event.currentTarget.contains(next)) return;
    setFocusKey(null);
  }, []);

  return { indices, metrics, bodyRef, onScroll: measure, onFocus, onBlur };
};

export { useVirtualWindow };
