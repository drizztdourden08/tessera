/* @layer renderer-components @kind logic */
import { TOOLBAR_AXIS, TOOLBAR_CORNER_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { END_CORNER, START_CORNER } from './toolbar-grid-placement.constants';
import type { ToolbarCornerCandidate, ToolbarCornerScene } from './toolbar-corner.type';
import type { ToolbarEnd, ToolbarMetrics } from './toolbar-resize.type';

const toolbarCornerCandidates = (layout: ToolbarLayout, metrics: ToolbarMetrics, at: { side: ToolbarSide; lane: number; end: ToolbarEnd }): ToolbarCornerScene | null => {
  const { side, lane, end } = at;
  const corner = (end === 'start' ? START_CORNER : END_CORNER)[side];
  const axis = TOOLBAR_AXIS[side];
  const other = TOOLBAR_CORNER_SIDES[corner][axis === 'h' ? 'v' : 'h'];
  const thickness = metrics.laneThickness?.[other];
  if (!thickness) return null;
  const found: ToolbarCornerCandidate[] = [];
  let own = 0;
  let across = 0;
  for (const claim of layout.corners[corner]) {
    if (claim === axis) {
      if (own === lane) break;
      own += 1;
    } else {
      found.push({ lane: across, thickness: thickness[across] ?? 0 });
      across += 1;
    }
  }
  const candidates = found.reverse().filter((candidate) => candidate.thickness > 0);
  return { layout, corner, axis, side, lane, end, candidates };
};

export { toolbarCornerCandidates };
