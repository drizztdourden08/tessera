/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { PERCENT } from '../Navigator.constants';
import type { NavigatorSurface, NavigatorViewport, PercentSpans } from '../Navigator.type';

const percentOf = (value: number, room: number): number => clampNumber(Math.round((value / room) * PERCENT), 0, PERCENT);

const share = (from: number, size: number, room: number): [number, number] =>
  (room <= 0 ? [0, PERCENT] : [percentOf(from, room), percentOf(from + size, room)]);

const viewportPercent = (viewport: NavigatorViewport, surface: NavigatorSurface): PercentSpans => ({
  across: share(viewport.x, viewport.width, surface.width),
  down: share(viewport.y, viewport.height, surface.height),
});

export { viewportPercent };
