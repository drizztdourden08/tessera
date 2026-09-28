/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { DataTableState } from '../../../data/table/use-data-table';
import type { ColumnActions } from '../DataTable.type';

const useColumnActions = <T>(
  table: DataTableState<T>,
  previewWidth: (path: string, width: number) => void,
): ColumnActions => useMemo(() => ({
  onToggleSort: table.setSingleSort,
  onSortDir: table.setSortDir,
  onRemoveSort: table.removeSort,
  onAddColumnAt: table.insertColumn,
  onRemove: table.removeColumn,
  onMove: table.moveColumn,
  onRename: table.renameColumn,
  onGroupBy: table.addGroupBy,
  onUngroup: table.removeGroupBy,
  onResize: table.resizeColumn,
  onPreviewResize: previewWidth,
  onFitToContent: table.fitColumn,
  onExpandToFill: table.growColumn,
  onSetDisplayField: table.setDisplayField,
}), [table, previewWidth]);

export { useColumnActions };
