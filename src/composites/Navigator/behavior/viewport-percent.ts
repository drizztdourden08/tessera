/* @layer renderer-components @kind logic */
import { PERCENT } from '../Navigator.constants';
import type { NavigatorSurface, NavigatorViewport, PercentSpans } from '../Navigator.type';

const share = (from: number, size: number, room: number): [number, number] =>
  (room <= 0 ? [0, PERCENT] : [Math.round((from / room) * PERCENT), Math.round(((from + size) / room) * PERCENT)]);

const viewportPercent = (viewport: NavigatorViewport, surface: NavigatorSurface): PercentSpans => ({
  across: share(viewport.x, viewport.width, surface.width),
  down: share(viewport.y, viewport.height, surface.height),
});

export { viewportPercent };
