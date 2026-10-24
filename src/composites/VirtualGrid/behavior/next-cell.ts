/* @layer renderer-components @kind logic */
import { GRID_MOVES } from './next-cell.constants';
import type { GridShape } from '../VirtualGrid.type';

const nextCell = (key: string, ctrl: boolean, shape: GridShape): number | undefined => {
  if (shape.count <= 0) return undefined;
  return GRID_MOVES.get(key)?.(shape, ctrl);
};

export { nextCell };
