/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const relocate = (columns: readonly TableColumn[], from: number, to: number): readonly TableColumn[] => {
  const moved = columns[from];
  if (moved === undefined) return columns;
  const next = columns.filter((_, index) => index !== from);
  next.splice(to, 0, moved);
  return next;
};

export { relocate };
