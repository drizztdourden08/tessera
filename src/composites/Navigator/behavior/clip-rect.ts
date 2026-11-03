/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { NavigatorSurface, NavigatorViewport } from '../Navigator.type';

const clipRect = (rect: NavigatorViewport, surface: NavigatorSurface): NavigatorViewport => {
  const x = clampNumber(rect.x, 0, surface.width);
  const y = clampNumber(rect.y, 0, surface.height);
  return {
    x,
    y,
    width: clampNumber(rect.x + rect.width, 0, surface.width) - x,
    height: clampNumber(rect.y + rect.height, 0, surface.height) - y,
  };
};

export { clipRect };
