/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { isElement } from '../../../primitives/dom/is-element';
import { flattenRows } from './flatten-rows';
import { readVirtualMetrics } from './read-virtual-metrics';
import { renderedIndices } from './rendered-indices';
import { visibleRange } from './visible-range';
import { INDEX_ATTRIBUTE, INDEX_SELECTOR, INITIAL_METRICS, NO_ITEMS, OVERSCAN } from './useVirtualRows.constants';
import type { FocusEvent } from 'react';
import type { FlatItem } from './flatten-rows.type';
import type { UseVirtualRowsInput, VirtualMetrics, VirtualRows } from './useVirtualRows.type';

const sameMetrics = (a: VirtualMetrics, b: VirtualMetrics): boolean =>
  a.top === b.top && a.viewport === b.viewport && a.rowHeight === b.rowHeight;

const indexOfTarget = (target: EventTarget): number => {
  const holder = isElement(target) ? target.closest(INDEX_SELECTOR) : null;
  return holder === null ? -1 : Number(holder.getAttribute(INDEX_ATTRIBUTE));
};

const useVirtualRows = <T,>(input: UseVirtualRowsInput<T>): VirtualRows<T> => {
  const { enabled, nodes, isExpanded, getRowId, rootRef } = input;
  const bodyRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState<VirtualMetrics>(INITIAL_METRICS);
  const [focusKey, setFocusKey] = useState<string | null>(null);

  const items = useMemo<readonly FlatItem<T>[]>(
    () => (enabled ? flattenRows({ nodes, isExpanded, getRowId }) : NO_ITEMS),
    [enabled, nodes, isExpanded, getRowId],
  );

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
  }, [enabled, items.length, measure, rootRef]);

  const indices = useMemo(() => {
    const range = visibleRange({
      scrollTop: metrics.top, viewport: metrics.viewport, rowHeight: metrics.rowHeight, count: items.length, overscan: OVERSCAN,
    });
    const pinned = focusKey === null ? -1 : items.findIndex((item) => item.key === focusKey);
    return renderedIndices(range, pinned);
  }, [metrics, items, focusKey]);

  const onFocus = useCallback((event: FocusEvent<HTMLElement>) => {
    const at = indexOfTarget(event.target);
    setFocusKey(items[at]?.key ?? null);
  }, [items]);

  const onBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (isElement(next) && event.currentTarget.contains(next)) return;
    setFocusKey(null);
  }, []);

  return { items, indices, bodyRef, onScroll: measure, onFocus, onBlur };
};

export { useVirtualRows };
