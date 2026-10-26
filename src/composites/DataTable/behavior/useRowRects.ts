/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { bodyOrigin } from '../../virtual/body-origin';
import { domFlatRects } from './dom-flat-rects';
import { flatRects } from './flat-rects';
import { flattenRows } from './flatten-rows';
import { rowsOfRects } from './rows-of-rects';
import type { FlatRects, RowRects, UseRowRectsInput } from './useRowRects.type';

const useRowRects = <T,>(input: UseRowRectsInput<T>): RowRects<T> => {
  const { rootRef, virtual, nodes, isExpanded, getRowId } = input;

  const getFlat = useCallback((): FlatRects<T> => {
    const items = virtual ? virtual.items : flattenRows({ nodes, isExpanded, getRowId });
    const root = rootRef.current;
    const body = virtual?.bodyRef.current;
    if (!root) return { items, rects: [] };
    if (!virtual) {
      const rects = domFlatRects(root);
      return { items, rects: rects.length === items.length ? rects : [] };
    }
    if (!body) return { items, rects: [] };
    const origin = bodyOrigin(root, body);
    const width = Math.max(0, root.scrollWidth - origin.x);
    return { items, rects: flatRects({ items, rowHeight: virtual.metrics.rowHeight, origin, width }) };
  }, [rootRef, virtual, nodes, isExpanded, getRowId]);

  const getRects = useCallback(() => {
    const { items, rects } = getFlat();
    return rowsOfRects(items, rects, getRowId);
  }, [getFlat, getRowId]);

  return { getRects, getFlat };
};

export { useRowRects };
