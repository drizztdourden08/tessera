/* @layer renderer-components @kind logic */
import { FILE_TYPE_GRIDS, FILE_TYPE_MASTER } from './file-type-layouts.constants';
import type { FileTypeGrid } from './file-type.type';

const fileTypeGridFor = (size: number): FileTypeGrid => FILE_TYPE_GRIDS.find((grid) => size % grid === 0) ?? FILE_TYPE_MASTER;

export { fileTypeGridFor };
