/* @layer renderer-components @kind logic */
import { inRect } from '../../dock-zones/in-rect';
import type { Point } from '../../rect-drag/rect-drag.type';
import { MAX_LANES } from '../ToolbarDock.constants';
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarDropTarget, ToolbarFrame, ToolbarZone } from './toolbar-drag.type';
import { toolbarBasket } from './toolbar-basket';
import { toolbarDepth } from './toolbar-depth';
import { toolbarLaneTarget } from './toolbar-lane-target';
import { toolbarSpotAt } from './toolbar-spot-at';
import { toolbarZones } from './toolbar-zones';

const holds = (zone: ToolbarZone, p: Point): boolean => inRect(p, zone.band) || inRect(p, zone.held);

const toolbarDropAt = (frame: ToolbarFrame, layout: ToolbarLayout, dragId: string, point: Point): ToolbarDropTarget => {
  if (inRect(point, toolbarBasket(frame))) return { kind: 'basket' };
  if (!inRect(point, frame.rect)) return { kind: 'none' };
  const depthOf = (zone: ToolbarZone): number => toolbarDepth(frame.rect, zone.side, point);
  const zone = toolbarZones(frame, layout, dragId)
    .filter((candidate) => holds(candidate, point))
    .sort((a, b) => depthOf(a) - depthOf(b))[0];
  if (!zone) return { kind: 'none' };
  const { side, others } = zone;
  const thickness = frame.thickness[side];
  const depth = depthOf(zone);
  const aim = (lane: number | 'new', index: number): ToolbarDropTarget =>
    toolbarLaneTarget(frame, layout, dragId, toolbarSpotAt(frame, { layout, id: dragId, spot: { side, lane, index, at: 0 } }, point));
  if (others === 0) return aim('new', 0);
  if (depth >= others * thickness && others < MAX_LANES) return aim('new', others);
  const lane = Math.max(0, Math.min(Math.floor(depth / thickness), others - 1));
  const joined = aim(lane, lane);
  if (joined.kind === 'lane' || others >= MAX_LANES) return joined;
  return aim('new', depth - lane * thickness < thickness / 2 ? lane : lane + 1);
};

export { toolbarDropAt };
