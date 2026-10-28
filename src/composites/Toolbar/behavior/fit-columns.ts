/* @layer renderer-components @kind util */
import type { FitCell, FitSpace } from './fit-columns.type';
import { rowsSize } from './rows-size';

const fitColumns = (cells: readonly FitCell[], more: number, space: FitSpace): number => {
  const { gap, room, columns } = space;
  if (rowsSize(cells, columns, gap) <= room) return cells.length;
  for (let count = cells.length - 1; count > 0; count -= 1) {
    if (rowsSize([...cells.slice(0, count), { size: more, span: false }], columns, gap) <= room) return count;
  }
  return 0;
};

export { fitColumns };
