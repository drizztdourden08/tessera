/* @layer renderer-components @kind logic */
import type { PixelGrid } from '../../primitives/Icon/Icon.type';
import { PIXEL_INK } from '../../primitives/Icon/behavior/pixel-grid.constants';
import { PIXEL_GRIDS } from '../../primitives/icon-sets/pixel.constants';
import { FILE_TYPE_MASTER } from './file-type-layouts.constants';
import type { FileTypeGrid, FileTypeSpec } from './file-type.type';

const inked = (line: string): boolean => line.includes(PIXEL_INK);

const trimmed = (grid: PixelGrid): PixelGrid => {
  const marks = grid.map(inked);
  const rows = grid.slice(marks.indexOf(true), marks.lastIndexOf(true) + 1);
  const columns = [...(rows[0] ?? '')].map((_, x) => rows.some((row) => row[x] === PIXEL_INK));
  return rows.map((row) => row.slice(columns.indexOf(true), columns.lastIndexOf(true) + 1));
};

const fileTypeGlyph = (type: FileTypeSpec, grid: FileTypeGrid): PixelGrid =>
  trimmed(grid === FILE_TYPE_MASTER ? PIXEL_GRIDS[type.icon] : type.small[grid]);

export { fileTypeGlyph };
