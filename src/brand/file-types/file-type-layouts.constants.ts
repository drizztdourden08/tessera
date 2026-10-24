/* @layer renderer-components @kind data */
import type { FileTypeGrid, FileTypeLayout } from './file-type.type';

const FILE_TYPE_GRIDS: readonly FileTypeGrid[] = [32, 24, 16];

const FILE_TYPE_MASTER = 32 satisfies FileTypeGrid;

const FILE_TYPE_LAYOUTS: Readonly<Record<FileTypeGrid, FileTypeLayout>> = {
  32: { page: { left: 4, right: 27, top: 1, bottom: 30, fold: 7 }, badge: [6, 3], glyph: { x: 5, y: 9, w: 22, h: 20 } },
  24: { page: { left: 3, right: 20, top: 1, bottom: 22, fold: 5 }, badge: [5, 3], glyph: { x: 4, y: 9, w: 16, h: 12 } },
  16: { page: { left: 2, right: 14, top: 0, bottom: 15, fold: 4 }, badge: [4, 2], glyph: { x: 3, y: 5, w: 11, h: 9 } },
};

export { FILE_TYPE_GRIDS, FILE_TYPE_LAYOUTS, FILE_TYPE_MASTER };
