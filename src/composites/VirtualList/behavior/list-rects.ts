/* @layer renderer-components @kind logic */
import type { MarqueeItem } from '../../marquee';
import type { ListRectsInput } from './list-rects.type';

const listRects = (input: ListRectsInput): readonly MarqueeItem[] => {
  const { layout, cross, axis, origin, keyOf } = input;
  return Array.from({ length: layout.count }, (_, at) => {
    const start = layout.startOf(at);
    const size = layout.sizeOf(at);
    return {
      key: keyOf(at),
      rect: axis === 'horizontal'
        ? { x: origin.x + start, y: origin.y, width: size, height: cross }
        : { x: origin.x, y: origin.y + start, width: cross, height: size },
    };
  });
};

export { listRects };
