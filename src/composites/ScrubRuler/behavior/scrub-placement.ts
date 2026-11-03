/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import { borderX } from '../../cell-geometry';
import type { CellGeometry } from '../../cell-geometry';

const scrubPlacement = (cells: CellGeometry, total: number, current: number): CSSProperties => ({
  '--scrub-width': `${borderX(cells, total, total)}px`,
  '--scrub-left': `${cells.lefts[current] ?? 0}px`,
  '--scrub-cell': `${cells.widths[current] ?? 0}px`,
} as CSSProperties);

export { scrubPlacement };
