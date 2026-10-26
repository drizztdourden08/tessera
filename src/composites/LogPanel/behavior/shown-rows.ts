/* @layer renderer-components @kind logic */
import type { LogOrder, LogRow } from '../LogPanel.type';

const shownRows = (rows: readonly LogRow[], count: number, order: LogOrder): readonly LogRow[] => {
  const newest = rows.slice(Math.max(0, rows.length - count));
  return order === 'newest-first' ? newest.reverse() : newest;
};

export { shownRows };
