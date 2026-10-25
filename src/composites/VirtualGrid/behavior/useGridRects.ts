/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { bodyOrigin } from './body-origin';
import { gridRects } from './grid-rects';
import type { MarqueeItem } from '../../marquee';
import type { GridRectsInput } from './useGridRects.type';

const useGridRects = <T,>(input: GridRectsInput<T>): (() => readonly MarqueeItem[]) => {
  const { rootRef, bodyRef, tileWidth, layout, heights, flat, getKey } = input;
  return useCallback(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return [];
    const keyOf = (index: number) => {
      const item = flat[index];
      return item === undefined ? '' : getKey(item, index);
    };
    return gridRects({ layout, heights, tileWidth: tileWidth.current || heights.tile, origin: bodyOrigin(root, body), keyOf });
  }, [rootRef, bodyRef, tileWidth, layout, heights, flat, getKey]);
};

export { useGridRects };
