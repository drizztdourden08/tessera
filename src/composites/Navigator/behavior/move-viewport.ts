/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { NavigatorSurface, NavigatorViewport } from '../Navigator.type';

const within = (value: number, size: number, room: number): number => clampNumber(value, 0, Math.max(0, room - size));

const moveViewport = (viewport: NavigatorViewport, surface: NavigatorSurface, dx: number, dy: number): NavigatorViewport => ({
  ...viewport,
  x: within(viewport.x + dx, viewport.width, surface.width),
  y: within(viewport.y + dy, viewport.height, surface.height),
});

export { moveViewport };
