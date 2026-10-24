/* @layer renderer-components @kind logic */
import { GRID_MOVES } from './next-cell.constants';
import { rowOfStop } from './row-of-stop';
import type { GridLayout } from './grid-layout.type';
import type { GridPress } from './next-cell.type';

const nextCell = (key: string, layout: GridLayout, active: number, press: GridPress): number | undefined => {
  if (layout.stops <= 0) return undefined;
  const row = rowOfStop(layout, active);
  const column = active - (layout.rows[row]?.stop ?? active);
  return GRID_MOVES.get(key)?.({ layout, active, row, column, ...press });
};

export { nextCell };
