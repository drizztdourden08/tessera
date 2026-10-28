/* @layer renderer-components @kind logic */
import type { MarqueeCellRect, MarqueeItem } from './marquee.type';

const cellRectOf = (hits: readonly MarqueeItem[]): MarqueeCellRect | null => {
  let found: MarqueeCellRect | null = null;
  for (const { cell } of hits) {
    if (!cell) continue;
    found = found === null
      ? { firstRow: cell.row, lastRow: cell.row, firstColumn: cell.column, lastColumn: cell.column }
      : {
        firstRow: Math.min(found.firstRow, cell.row),
        lastRow: Math.max(found.lastRow, cell.row),
        firstColumn: Math.min(found.firstColumn, cell.column),
        lastColumn: Math.max(found.lastColumn, cell.column),
      };
  }
  return found;
};

export { cellRectOf };
