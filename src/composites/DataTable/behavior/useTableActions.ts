/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { DataTableState } from '../../../data/table/use-data-table';
import type { TableActions } from '../DataTable.type';

const useTableActions = <T>(table: DataTableState<T>): TableActions => useMemo(() => ({
  onAddColumn: table.addColumn,
  onClearSort: table.clearSort,
  onClearGroupBy: table.clearGroupBy,
  onFitAllToContent: table.fitAllColumns,
  onResetColumns: table.resetColumns,
}), [table]);

export { useTableActions };
