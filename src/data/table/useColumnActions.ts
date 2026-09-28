/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import * as columnOps from './column-ops';
import type { ColumnMove, TableColumn, TableState } from './types';
import type { ColumnActions, Columns } from './useColumnActions.type';

const useColumnActions = (
  setState: Dispatch<SetStateAction<TableState>>,
  resetTo: () => readonly TableColumn[],
): ColumnActions => {
  const patch = useCallback(
    (transform: (columns: Columns) => Columns) =>
      setState((prev) => ({ ...prev, columns: transform(prev.columns) })),
    [setState],
  );

  const addColumn = useCallback((path: string) => patch((c) => columnOps.addColumn(c, path)), [patch]);
  const insertColumn = useCallback(
    (path: string, at: number) => patch((c) => columnOps.insertColumnAt(c, path, at)),
    [patch],
  );
  const removeColumn = useCallback((path: string) => patch((c) => columnOps.removeColumn(c, path)), [patch]);
  const moveColumn = useCallback(
    (path: string, move: ColumnMove) => patch((c) => columnOps.moveColumn(c, path, move)),
    [patch],
  );
  const reorderColumn = useCallback(
    (path: string, to: number) => patch((c) => columnOps.reorderColumn(c, path, to)),
    [patch],
  );
  const renameColumn = useCallback(
    (path: string, label: string) => patch((c) => columnOps.renameColumn(c, path, label)),
    [patch],
  );
  const resizeColumn = useCallback(
    (path: string, width: number) => patch((c) => columnOps.resizeColumn(c, path, width)),
    [patch],
  );
  const growColumn = useCallback((path: string) => patch((c) => columnOps.growColumn(c, path)), [patch]);
  const fitColumn = useCallback((path: string) => patch((c) => columnOps.fitColumn(c, path)), [patch]);
  const fitAllColumns = useCallback(() => patch((c) => columnOps.fitAllColumns(c)), [patch]);
  const setDisplayField = useCallback(
    (path: string, displayField: string | undefined) =>
      patch((c) => columnOps.setDisplayField(c, path, displayField)),
    [patch],
  );
  const resetColumns = useCallback(() => patch(resetTo), [patch, resetTo]);

  return {
    addColumn, insertColumn, removeColumn, moveColumn, reorderColumn, renameColumn,
    resizeColumn, growColumn, fitColumn, fitAllColumns, setDisplayField, resetColumns,
  };
};

export { useColumnActions };
