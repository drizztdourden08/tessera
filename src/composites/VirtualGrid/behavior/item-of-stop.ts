/* @layer renderer-components @kind logic */
import { rowOfStop } from './row-of-stop';
import type { GridLayout } from './grid-layout.type';

const itemOfStop = (layout: GridLayout, stop: number): number => {
  const row = layout.rows[rowOfStop(layout, stop)];
  if (!row || row.kind === 'header') return -1;
  return row.first + (stop - row.stop);
};

export { itemOfStop };
