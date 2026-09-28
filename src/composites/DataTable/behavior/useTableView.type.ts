/* @layer renderer-components @kind types */
import type { SessionView } from '../../../data/view-state/session-view';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { TableColumn } from '../../../data/table/types';
import type { DataTableState } from '../../../data/table/use-data-table';
import type { ViewKey } from '../../../data/view-state/snapshot';
import type { ViewStorage } from '../../../data/view-state/use-view-state';

interface UseTableViewInput<T> {
  rows: readonly T[];
  schema: readonly FieldDescriptor[];
  viewKey?: ViewKey;
  viewStorage?: ViewStorage;
  fallbackColumns?: readonly TableColumn[];
  fallbackGroupBy?: readonly string[];
}

interface TableView<T> {
  table: DataTableState<T>;
  sessionView: SessionView;
  setSessionView: (next: SessionView) => void;
}

export type { TableView, UseTableViewInput };
