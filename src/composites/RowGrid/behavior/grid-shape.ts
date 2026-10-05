/* @layer renderer-components @kind util */
import { BUTTON, BUTTON_GAP, COLUMN_MIN, FRAME, GAP, HANDLE, NUMBER, PAD } from '../RowGrid.constants';
import type { ColumnSize, GridParts, GridShape } from '../RowGrid.type';
import { trackList } from './track-list';

const fixedWidth = (parts: GridParts): number => {
  const end = parts.endButtons > 0 ? parts.endButtons * BUTTON[parts.density] + (parts.endButtons - 1) * BUTTON_GAP + GAP : 0;
  return FRAME + PAD[parts.density] + (parts.handle ? HANDLE + GAP : 0) + (parts.numbered ? NUMBER + GAP : 0) + end;
};

const sum = (widths: readonly number[]): number => widths.reduce((total, width) => total + width, 0) + Math.max(0, widths.length - 1) * GAP;

const gridShape = (columns: readonly ColumnSize[], parts: GridParts): GridShape => {
  const fixed = fixedWidth(parts);
  const kept = columns.filter((column) => !column.fold);
  const capped = columns.every((column) => column.max !== undefined);
  return {
    table: fixed + sum(columns.map((column) => column.min ?? COLUMN_MIN)),
    fold: kept.length < columns.length ? fixed + sum(kept.map((column) => column.min ?? COLUMN_MIN)) : null,
    max: capped ? fixed + sum(columns.map((column) => column.max ?? 0)) : null,
    tracks: (layout) => trackList(columns, parts, layout),
  };
};

export { gridShape };
