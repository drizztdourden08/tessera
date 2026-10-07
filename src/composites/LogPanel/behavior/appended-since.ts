/* @layer renderer-components @kind logic */
import type { LogRow } from '../LogPanel.type';

const appendedSince = (rows: readonly LogRow[], newestId: string | undefined, before: number): number | null => {
  if (newestId === undefined) return before === 0 ? rows.length : null;
  for (let i = rows.length - 1; i >= 0; i -= 1) {
    if (rows[i]?.id === newestId) return i < before ? rows.length - 1 - i : null;
  }
  return null;
};

export { appendedSince };
