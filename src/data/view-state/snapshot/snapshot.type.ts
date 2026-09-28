/* @layer renderer-components @kind types */
import type { FilterClause } from '../../filter/clause';
import type { SortEntry, TableColumn, TableState } from '../../table/types';

type DetailTab = 'json' | 'ts' | 'editor';

interface ViewSnapshot {
  v: 1;
  columns: readonly TableColumn[];
  sort: readonly SortEntry[];
  groupBy: readonly string[];
  filters: readonly FilterClause[];
  tab?: DetailTab;
  collapsed?: boolean;
}

interface RestoredView {
  table: TableState;
  filters: readonly FilterClause[];
  tab?: DetailTab;
  collapsed?: boolean;
}

type ViewKey = `${string}:${string}`;
type ViewStore = Record<ViewKey, ViewSnapshot>;

export type { DetailTab, RestoredView, ViewKey, ViewSnapshot, ViewStore };
