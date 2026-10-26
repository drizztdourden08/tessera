/* @layer renderer-components @kind logic */
import type { FlatItem } from './flatten-rows.type';

const detailIndex = <T>(items: readonly FlatItem<T>[], detailRowId: string | null, getRowId: (row: T) => string): number =>
  detailRowId === null ? -1 : items.findIndex((item) => item.kind === 'row' && getRowId(item.row) === detailRowId);

export { detailIndex };
