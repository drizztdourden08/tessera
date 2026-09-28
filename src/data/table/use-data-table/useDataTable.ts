/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { createSchemaIndex } from '../../schema/build-schema';
import * as sortOps from '../sort-ops';
import { deriveRows } from '../derive-rows';
import { useColumnActions } from '../useColumnActions';
import type { SortEntry, TableState } from '../types';
import { initialState } from './initial-state';
import type { DataTableState, UseDataTableInput } from './useDataTable.type';

const useDataTable = <T>({ rows, schema, initial, initialGroupBy }: UseDataTableInput<T>): DataTableState<T> => {
  const [state, setState] = useState<TableState>(() => initialState(schema, initial, initialGroupBy));

  const index = useMemo(() => createSchemaIndex(schema), [schema]);
  const derived = useMemo(
    () => deriveRows({ rows, schema: index, sort: state.sort, groupBy: state.groupBy }),
    [rows, index, state.sort, state.groupBy],
  );

  const resetTo = useCallback(() => initialState(schema, initial).columns, [schema, initial]);
  const columnActions = useColumnActions(setState, resetTo);

  const patchSort = useCallback(
    (transform: (sort: TableState['sort']) => TableState['sort']) =>
      setState((prev) => ({ ...prev, sort: transform(prev.sort) })),
    [],
  );
  const patchGroupBy = useCallback(
    (transform: (groupBy: readonly string[]) => readonly string[]) =>
      setState((prev) => ({ ...prev, groupBy: transform(prev.groupBy) })),
    [],
  );

  const setSingleSort = useCallback((path: string) => patchSort((s) => sortOps.setSingleSort(s, path)), [patchSort]);
  const setSortDir = useCallback(
    (path: string, dir: SortEntry['dir']) => patchSort((s) => sortOps.setSortDir(s, path, dir)),
    [patchSort],
  );
  const removeSort = useCallback((path: string) => patchSort((s) => sortOps.removeSort(s, path)), [patchSort]);
  const clearSort = useCallback(() => patchSort(() => []), [patchSort]);

  const addGroupBy = useCallback(
    (path: string) => patchGroupBy((g) => (g.includes(path) ? g : [...g, path])),
    [patchGroupBy],
  );
  const removeGroupBy = useCallback(
    (path: string) => patchGroupBy((g) => g.filter((entry) => entry !== path)),
    [patchGroupBy],
  );
  const clearGroupBy = useCallback(() => patchGroupBy(() => []), [patchGroupBy]);

  return {
    ...state, rows, ...derived, ...columnActions,
    setSingleSort, setSortDir, removeSort, clearSort,
    addGroupBy, removeGroupBy, clearGroupBy, setState,
  };
};

export { useDataTable };
