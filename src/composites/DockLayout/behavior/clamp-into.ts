/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { Rect } from '../DockLayout.type';

const clampInto = (r: Rect, area: Rect): Rect => {
  const width = Math.min(r.width, area.width);
  const height = Math.min(r.height, area.height);
  return {
    x: clampNumber(r.x, area.x, area.x + area.width - width),
    y: clampNumber(r.y, area.y, area.y + area.height - height),
    width,
    height,
  };
};

export { clampInto };
