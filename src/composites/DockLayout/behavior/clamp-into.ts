/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';

const clampInto = (r: Rect, area: Rect): Rect => {
  const width = Math.min(r.width, area.width);
  const height = Math.min(r.height, area.height);
  return {
    x: Math.max(area.x, Math.min(r.x, area.x + area.width - width)),
    y: Math.max(area.y, Math.min(r.y, area.y + area.height - height)),
    width,
    height,
  };
};

export { clampInto };
