/* @layer renderer-components @kind logic */
import { TOOLBAR_CORNER_SIDES, TOOLBAR_CORNERS } from '../ToolbarDock.constants';
import type { ToolbarCorner, ToolbarCornerClaim, ToolbarSide } from '../ToolbarDock.type';
import { isRecord } from './is-record';
import { toolbarCornerWithout } from './toolbar-corner-without';

const readToolbarCorners = (raw: unknown, dropped: Record<ToolbarSide, ReadonlySet<number>>): Record<ToolbarCorner, ToolbarCornerClaim[]> => {
  const corners: Record<ToolbarCorner, ToolbarCornerClaim[]> = { 'top-left': [], 'top-right': [], 'bottom-left': [], 'bottom-right': [] };
  if (!isRecord(raw)) return corners;
  for (const corner of TOOLBAR_CORNERS) {
    const list = raw[corner];
    const claims = Array.isArray(list) ? list.filter((claim): claim is ToolbarCornerClaim => claim === 'h' || claim === 'v') : [];
    const sides = TOOLBAR_CORNER_SIDES[corner];
    corners[corner] = toolbarCornerWithout(claims, dropped[sides.h], dropped[sides.v]);
  }
  return corners;
};

export { readToolbarCorners };
