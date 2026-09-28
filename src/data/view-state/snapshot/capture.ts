/* @layer renderer-components @kind logic */
import type { FilterClause } from '../../filter/clause';
import type { TableState } from '../../table/types';
import { SNAPSHOT_VERSION } from './snapshot.constants';
import type { DetailTab, ViewSnapshot } from './snapshot.type';

const capture = (
  table: TableState,
  filters: readonly FilterClause[],
  tab?: DetailTab,
  collapsed?: boolean,
): ViewSnapshot => {
  const snapshot: ViewSnapshot = {
    v: SNAPSHOT_VERSION,
    columns: table.columns.map((column) => ({ ...column })),
    sort: table.sort.map((entry) => ({ ...entry })),
    groupBy: [...table.groupBy],
    filters: filters.map((clause) => ({ ...clause })),
  };
  if (tab !== undefined) snapshot.tab = tab;
  if (collapsed !== undefined) snapshot.collapsed = collapsed;
  return snapshot;
};

export { capture };
