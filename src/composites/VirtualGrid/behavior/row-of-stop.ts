/* @layer renderer-components @kind logic */
import type { GridLayout } from './grid-layout.type';

const rowOfStop = (layout: GridLayout, stop: number): number => {
  let low = 0;
  let high = layout.rows.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((layout.rows[middle]?.stop ?? 0) <= stop) low = middle;
    else high = middle - 1;
  }
  return low;
};

export { rowOfStop };
