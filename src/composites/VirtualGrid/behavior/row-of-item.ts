/* @layer renderer-components @kind logic */
import type { GridLayout } from './grid-layout.type';

const rowOfItem = (layout: GridLayout, item: number): number => {
  if (layout.rows.length === 0) return -1;
  const target = Math.min(Math.max(0, item), Math.max(0, layout.items - 1));
  let low = 0;
  let high = layout.rows.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((layout.rows[middle]?.first ?? 0) <= target) low = middle;
    else high = middle - 1;
  }
  return low;
};

export { rowOfItem };
