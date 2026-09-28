/* @layer renderer-components @kind logic */
import type { TableColumn } from '../table/types';
import { emptySnapshot } from './snapshot';
import type { ViewSnapshot } from './snapshot';

const emptySnapshotFor = (
  fallbackColumns: readonly TableColumn[],
  fallbackGroupBy?: readonly string[],
): ViewSnapshot => ({
  ...emptySnapshot(),
  columns: fallbackColumns.map((column) => ({ ...column })),
  groupBy: fallbackGroupBy ? [...fallbackGroupBy] : [],
});

export { emptySnapshotFor };
