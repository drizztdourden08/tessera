/* @layer renderer-components @kind logic */
import { rowPlace } from './row-place';
import type { LayoutRow } from './grid-layout.type';
import type { GridPointInput, GridTarget } from './grid-point-at.type';

const gridPointAt = (input: GridPointInput): GridTarget => {
  const { layout, heights, tileWidth, origin, point, sectionKeys, sectioned, canInto } = input;
  const x = point.x - origin.x;
  const y = point.y - origin.y;
  const sectionOf = (row: LayoutRow) => (sectioned ? sectionKeys[row.section] : undefined);
  let last: LayoutRow | undefined;
  for (const row of layout.rows) {
    const { top, height } = rowPlace(row, heights);
    if (row.kind === 'tiles') last = row;
    if (y >= top + height) continue;
    const section = sectionKeys[row.section];
    if (row.kind === 'header') {
      return section !== undefined && canInto(row.section) ? { kind: 'into', section } : { kind: 'gap', index: row.first, section: sectionOf(row) };
    }
    const column = Math.min(row.size, Math.max(0, Math.round(x / Math.max(1, tileWidth))));
    return { kind: 'gap', index: row.first + column, section: sectionOf(row) };
  }
  return last ? { kind: 'gap', index: last.first + last.size, section: sectionOf(last) } : { kind: 'gap', index: 0 };
};

export { gridPointAt };
