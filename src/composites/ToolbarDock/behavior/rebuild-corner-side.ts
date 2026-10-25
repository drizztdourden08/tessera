/* @layer renderer-components @kind logic */
import { MIN_BAR_PX, SHARE_EPSILON, TOOLBAR_AXIS, TOOLBAR_CORNER_SIDES } from '../ToolbarDock.constants';
import type { ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';
import { moveLaneGrip } from './move-lane-grip';
import { toolbarCornerBefore } from './toolbar-corner-before';
import { toolbarCornerFit } from './toolbar-corner-fit';
import type { ToolbarCornerRebuild } from './toolbar-corner.type';
import { START_CORNER } from './toolbar-grid-placement.constants';

const gripped = (places: ToolbarPlace[], room: number, delta: number, rebuild: ToolbarCornerRebuild): ToolbarPlace[] => {
  const { scene, px } = rebuild;
  const start = scene.end === 'start';
  const share = (start ? Math.max(px + delta, 0) : px) / room;
  return moveLaneGrip(places, { index: start ? 0 : places.length - 1, end: scene.end }, share, Math.min(MIN_BAR_PX / room, 1));
};

const shiftOf = (side: ToolbarSide, lane: number, rebuild: ToolbarCornerRebuild): number => {
  const { scene, metrics, from, to } = rebuild;
  const axis = TOOLBAR_AXIS[side];
  const across = metrics.laneThickness?.[TOOLBAR_CORNER_SIDES[scene.corner][axis === 'h' ? 'v' : 'h']] ?? [];
  return toolbarCornerBefore(from, axis, lane, across) - toolbarCornerBefore(to, axis, lane, across);
};

const rebuildCornerSide = (side: ToolbarSide, rebuild: ToolbarCornerRebuild): ToolbarPlace[][] | null => {
  const { scene, metrics } = rebuild;
  const atStart = START_CORNER[side] === scene.corner;
  const lanes: ToolbarPlace[][] = [];
  for (const [lane, places] of scene.layout.sides[side].entries()) {
    const delta = shiftOf(side, lane, rebuild);
    const span = metrics.spans[side][lane] ?? 0;
    if (Math.abs(delta) < SHARE_EPSILON) {
      lanes.push(places);
      continue;
    }
    const fitted = span > 0 ? toolbarCornerFit(places, span, delta, atStart) : null;
    if (!fitted) return null;
    lanes.push(side === scene.side && lane === scene.lane ? gripped(fitted, span + delta, delta, rebuild) : fitted);
  }
  return lanes;
};

export { rebuildCornerSide };
