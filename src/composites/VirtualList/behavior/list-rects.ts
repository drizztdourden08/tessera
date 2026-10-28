/* @layer renderer-components @kind logic */
import type { MarqueeItem } from '../../marquee';
import type { ListRectsInput } from './list-rects.type';

const listRects = (input: ListRectsInput): readonly MarqueeItem[] => {
  const { count, size, cross, axis, origin, keyOf } = input;
  return Array.from({ length: count }, (_, at) => ({
    key: keyOf(at),
    rect: axis === 'horizontal'
      ? { x: origin.x + at * size, y: origin.y, width: size, height: cross }
      : { x: origin.x, y: origin.y + at * size, width: cross, height: size },
  }));
};

export { listRects };
