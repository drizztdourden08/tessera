/* @layer renderer-components @kind logic */
import type { Point } from '../../rect-drag/rect-drag.type';
import { toolbarDropLaneValue } from './toolbar-drop-lane-value';
import type { ToolbarFrame } from './toolbar-drag.type';
import type { ToolbarDropAim, ToolbarDropSpot } from './toolbar-drop.type';
import { toolbarFrameMetrics } from './toolbar-frame-metrics';
import { toolbarLaneOrigin } from './toolbar-lane-origin';
import { toolbarLanesWithout } from './toolbar-lanes-without';
import { toolbarOrientation } from './toolbar-orientation';
import { toolbarSideDepths } from './toolbar-side-depths';
import { toolbarSlotRect } from './toolbar-slot-rect';
import { toolbarSnapAt } from './toolbar-snap-at';

const toolbarSpotAt = (frame: ToolbarFrame, aim: ToolbarDropAim, point: Point): ToolbarDropSpot => {
  const { layout, id, spot } = aim;
  const { side, lane, index } = spot;
  const horizontal = toolbarOrientation(side) === 'horizontal';
  const span = toolbarDropLaneValue(layout, id, spot, toolbarFrameMetrics(frame).spans[side]) ?? 0;
  const slot = toolbarSlotRect(frame, toolbarSideDepths(frame, layout, id), { side, lane: index, count: 1 });
  const origin = toolbarLaneOrigin(frame, aim, slot);
  const raw = span > 0 ? ((horizontal ? point.x : point.y) - origin) / span : 0;
  const places = typeof lane === 'number' ? toolbarLanesWithout(layout, side, id)[lane] ?? [] : [];
  return { ...spot, at: toolbarSnapAt(places, span, raw) };
};

export { toolbarSpotAt };
