/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { KeyMove, NavigatorSurface, NavigatorViewport } from '../Navigator.type';
import { moveRange } from './move-range';

const within = (value: number, size: number, room: number, unclamped: boolean): number => {
  const [low, high] = moveRange(size, room, unclamped);
  return clampNumber(value, low, high);
};

const moveViewport = (viewport: NavigatorViewport, surface: NavigatorSurface, move: KeyMove, unclamped = false): NavigatorViewport => ({
  ...viewport,
  x: within(viewport.x + move.dx, viewport.width, surface.width, unclamped),
  y: within(viewport.y + move.dy, viewport.height, surface.height, unclamped),
});

export { moveViewport };
