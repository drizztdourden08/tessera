/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef, useState } from 'react';
import { createSchemaIndex } from '../../schema/build-schema';
import * as sortOps from '../sort-ops';
import { deriveRows } from '../derive-rows';
import { useColumnActions } from '../useColumnActions';
import type { SortEntry, TableState } from '../types';
import { initialState } from './initial-state';
import type { DataTableState, UseDataTableInput } from './use-data-table.type';

const useDataTable = <T>(input: UseDataTableInput<T>): DataTableState<T> => {
  const { rows, schema, initial, initialGroupBy, sort: controlledSort, onSortChange } = input;
  const [state, setState] = useState<TableState>(() => initialState(schema, initial, initialGroupBy));
  const sort = controlledSort ?? state.sort;
  const sortRef = useRef(sort);
  sortRef.current = sort;
  const controlRef = useRef({ controlled: controlledSort !== undefined, onSortChange });
  controlRef.current = { controlled: controlledSort !== undefined, onSortChange };

  const index = useMemo(() => createSchemaIndex(schema), [schema]);
  const derived = useMemo(
    () => deriveRows({ rows, schema: index, sort, groupBy: state.groupBy }),
    [rows, index, sort, state.groupBy],
  );

  const resetTo = useCallback(() => initialState(schema, initial).columns, [schema, initial]);
  const columnActions = useColumnActions(setState, resetTo);

  const patchSort = useCallback(
    (transform: (sort: TableState['sort']) => TableState['sort']) => {
      const { controlled, onSortChange: notify } = controlRef.current;
      if (!controlled) setState((prev) => ({ ...prev, sort: transform(prev.sort) }));
      notify?.(transform(sortRef.current));
    },
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
    ...state, sort, rows, ...derived, ...columnActions,
    setSingleSort, setSortDir, removeSort, clearSort,
    addGroupBy, removeGroupBy, clearGroupBy, setState,
  };
};

export { useDataTable };
