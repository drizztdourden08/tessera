/* @layer renderer-components @kind logic */
import { ANCHOR_GRID } from '../AnchorPicker.constants';
import type { Anchor, AnchorCell } from '../AnchorPicker.type';

const clamp = (index: number): number => Math.min(ANCHOR_GRID.length - 1, Math.max(0, index));

const cellAnchor = (cell: AnchorCell): Anchor => ANCHOR_GRID[clamp(cell.row)]?.[clamp(cell.col)] ?? 'center';

export { cellAnchor };
