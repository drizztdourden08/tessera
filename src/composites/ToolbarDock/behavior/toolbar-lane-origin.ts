/* @layer renderer-components @kind logic */
import type { Rect } from '../../rect-drag/rect-drag.type';
import { toolbarDropLaneValue } from './toolbar-drop-lane-value';
import type { ToolbarDropAim } from './toolbar-drop.type';
import type { ToolbarFrame } from './toolbar-drag.type';
import { toolbarOrientation } from './toolbar-orientation';

const toolbarLaneOrigin = (frame: ToolbarFrame, aim: ToolbarDropAim, slot: Rect): number => {
  const { layout, id, spot } = aim;
  const given = toolbarDropLaneValue(layout, id, spot, frame.starts?.[spot.side] ?? []);
  if (given !== undefined && Number.isFinite(given)) return given;
  return toolbarOrientation(spot.side) === 'horizontal' ? slot.x : slot.y;
};

export { toolbarLaneOrigin };
