/* @layer renderer-components @kind logic */
import type { ToolbarPlace } from '../ToolbarDock.type';
import { mirrorToolbarLane } from './mirror-toolbar-lane';
import { moveToolbarEnd } from './move-toolbar-end';
import type { ToolbarEnd } from './toolbar-resize.type';

const moveLaneGrip = (places: readonly ToolbarPlace[], at: { index: number; end: ToolbarEnd }, share: number, minShare: number): ToolbarPlace[] =>
  at.end === 'end'
    ? moveToolbarEnd(places, at.index, share, minShare)
    : mirrorToolbarLane(moveToolbarEnd(mirrorToolbarLane(places), places.length - 1 - at.index, 1 - share, minShare));

export { moveLaneGrip };
