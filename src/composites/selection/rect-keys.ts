/* @layer renderer-components @kind logic */
import type { SelectionCell } from './selection.type';

const rectKeys = (order: readonly string[], cellOf: (key: string) => SelectionCell | undefined, from: string, to: string): string[] => {
  const start = cellOf(from);
  const end = cellOf(to);
  if (!start || !end) return [to];
  const rows = [Math.min(start.row, end.row), Math.max(start.row, end.row)] as const;
  const columns = [Math.min(start.column, end.column), Math.max(start.column, end.column)] as const;
  return order.filter((key) => {
    const cell = cellOf(key);
    return cell !== undefined && cell.row >= rows[0] && cell.row <= rows[1] && cell.column >= columns[0] && cell.column <= columns[1];
  });
};

export { rectKeys };
