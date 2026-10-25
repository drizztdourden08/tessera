/* @layer renderer-components @kind logic */
import { TOOLBAR_AXIS, TOOLBAR_CORNER_SIDES, TOOLBAR_CORNERS } from '../ToolbarDock.constants';
import type { ToolbarCornerClaim, ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarCornerNote } from './toolbar-corner-note.type';
import { toolbarPlaceOf } from './toolbar-place-of';

const claimAt = (claims: readonly ToolbarCornerClaim[], axis: ToolbarCornerClaim, nth: number): number => {
  let seen = 0;
  for (const [at, claim] of claims.entries()) {
    if (claim !== axis) continue;
    if (seen === nth) return at;
    seen += 1;
  }
  return claims.length;
};

const toolbarCornerNote = (before: ToolbarLayout, after: ToolbarLayout, id: string): ToolbarCornerNote | null => {
  const found = toolbarPlaceOf(after, id);
  if (!found) return null;
  const axis = TOOLBAR_AXIS[found.side];
  for (const corner of TOOLBAR_CORNERS) {
    if (TOOLBAR_CORNER_SIDES[corner][axis] !== found.side) continue;
    if (before.corners[corner].join() === after.corners[corner].join()) continue;
    return { corner, taken: claimAt(after.corners[corner], axis, found.lane) < claimAt(before.corners[corner], axis, found.lane) };
  }
  return null;
};

export { toolbarCornerNote };
