/* @layer renderer-components @kind logic */
import { inRect } from '../../dock-zones/in-rect';
import type { Point } from '../../rect-drag/rect-drag.type';
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarDropTarget, ToolbarFrame, ToolbarZone } from './toolbar-drag.type';
import { toolbarBasket } from './toolbar-basket';
import { toolbarDepth } from './toolbar-depth';
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
  if (zone.free.length === 0) return { kind: 'refused', side: zone.side, rect: zone.held };
  const inner = zone.others > 0 && depthOf(zone) >= frame.thickness[zone.side] / 2;
  const index = inner ? zone.free[zone.free.length - 1] ?? 0 : 0;
  return { kind: 'lane', side: zone.side, index, rect: zone.slots[index] ?? zone.held };
};

export { toolbarDropAt };
