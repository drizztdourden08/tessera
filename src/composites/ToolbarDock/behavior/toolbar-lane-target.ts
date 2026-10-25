/* @layer renderer-components @kind logic */
import type { Rect } from '../../rect-drag/rect-drag.type';
import { MAX_LANES } from '../ToolbarDock.constants';
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarDropTarget, ToolbarFrame } from './toolbar-drag.type';
import type { ToolbarDropSpot, ToolbarPlacement } from './toolbar-drop.type';
import { toolbarFrameMetrics } from './toolbar-frame-metrics';
import { toolbarLaneOrigin } from './toolbar-lane-origin';
import { toolbarLanesWithout } from './toolbar-lanes-without';
import { toolbarOrientation } from './toolbar-orientation';
import { toolbarPlaceAt } from './toolbar-place-at';
import { toolbarSideDepths } from './toolbar-side-depths';
import { toolbarSlotRect } from './toolbar-slot-rect';

const narrowed = (slot: Rect, horizontal: boolean, origin: number, placed: ToolbarPlacement): Rect => {
  const from = origin + placed.start * placed.span;
  const length = placed.size * placed.span;
  return horizontal ? { ...slot, x: from, width: length } : { ...slot, y: from, height: length };
};

const toolbarLaneTarget = (frame: ToolbarFrame, layout: ToolbarLayout, id: string, spot: ToolbarDropSpot): ToolbarDropTarget => {
  const { side } = spot;
  const depths = toolbarSideDepths(frame, layout, id);
  const count = toolbarLanesWithout(layout, side, id).length;
  const placed = toolbarPlaceAt(layout, toolbarFrameMetrics(frame), id, spot);
  if (!placed) return { kind: 'refused', side, rect: toolbarSlotRect(frame, depths, { side, lane: 0, count: Math.min(Math.max(count, 1), MAX_LANES) }) };
  const slot = toolbarSlotRect(frame, depths, { side, lane: placed.lane, count: 1 });
  const origin = toolbarLaneOrigin(frame, { layout, id, spot }, slot);
  const rect = narrowed(slot, toolbarOrientation(side) === 'horizontal', origin, placed);
  return { kind: 'lane', side, lane: spot.lane, index: placed.lane, at: spot.at, start: placed.start, size: placed.size, rect, next: placed.layout };
};

export { toolbarLaneTarget };
