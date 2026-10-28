/* @layer renderer-components @kind logic */
import type { SelectionCell } from '../../selection';
import type { GridKeys } from './grid-keys.type';
import type { GridLayout } from './grid-layout.type';

const gridKeys = (layout: GridLayout, keys: readonly string[]): GridKeys => {
  const order: string[] = [];
  const cells = new Map<string, SelectionCell>();
  for (const row of layout.rows) {
    if (row.kind !== 'tiles') continue;
    for (let at = 0; at < row.size; at += 1) {
      const key = keys[row.first + at];
      if (key === undefined) continue;
      order.push(key);
      cells.set(key, { row: row.tiles, column: at });
    }
  }
  return { order, cells };
};

export { gridKeys };
