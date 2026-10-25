/* @layer renderer-components @kind logic */
import { TOOLBAR_CORNER_SIDES, TOOLBAR_CORNERS } from '../ToolbarDock.constants';
import type { ToolbarCornerClaim, ToolbarLayout } from '../ToolbarDock.type';

const fitted = (claims: readonly ToolbarCornerClaim[], h: number, v: number): ToolbarCornerClaim[] => {
  const out: ToolbarCornerClaim[] = [];
  let hs = 0;
  let vs = 0;
  for (const claim of claims) {
    if (claim === 'h' && hs < h) {
      out.push(claim);
      hs += 1;
    } else if (claim === 'v' && vs < v) {
      out.push(claim);
      vs += 1;
    }
  }
  for (; hs < h; hs += 1) out.push('h');
  for (; vs < v; vs += 1) out.push('v');
  return out;
};

const same = (a: readonly ToolbarCornerClaim[], b: readonly ToolbarCornerClaim[]): boolean => a.length === b.length && a.every((claim, i) => claim === b[i]);

const normalizeCorners = (layout: ToolbarLayout): ToolbarLayout => {
  const corners = { ...layout.corners };
  let changed = false;
  for (const corner of TOOLBAR_CORNERS) {
    const { h, v } = TOOLBAR_CORNER_SIDES[corner];
    const next = fitted(layout.corners[corner], layout.sides[h].length, layout.sides[v].length);
    if (same(next, layout.corners[corner])) continue;
    corners[corner] = next;
    changed = true;
  }
  return changed ? { ...layout, corners } : layout;
};

export { normalizeCorners };
