/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { bodyOrigin } from '../../virtual/body-origin';
import { gridRects } from './grid-rects';
import type { MarqueeItem } from '../../marquee';
import type { GridRectsInput } from './useGridRects.type';

const useGridRects = <T,>(input: GridRectsInput<T>): (() => readonly MarqueeItem[]) => {
  const { rootRef, bodyRef, tileWidth, layout, heights, flat, getKey, skip } = input;
  return useCallback(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return [];
    const keyOf = (index: number) => {
      const item = flat[index];
      return item === undefined ? '' : getKey(item, index);
    };
    const rects = gridRects({ layout, heights, tileWidth: tileWidth.current || heights.tile, origin: bodyOrigin(root, body), keyOf });
    return skip && skip.size > 0 ? rects.filter((rect) => !skip.has(rect.key)) : rects;
  }, [rootRef, bodyRef, tileWidth, layout, heights, flat, getKey, skip]);
};

export { useGridRects };
