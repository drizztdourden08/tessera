/* @layer renderer-components @kind hook */
import { useEffect, useMemo } from 'react';
import { defaultColumns, useDataTable } from '../../../data/table/use-data-table';
import { capture, restore } from '../../../data/view-state/snapshot';
import { useViewState } from '../../../data/view-state/use-view-state';
import type { TableState } from '../../../data/table/types';
import type { TableView, UseTableViewInput } from './useTableView.type';

const signatureOf = (state: TableState): string =>
  JSON.stringify([state.columns, state.sort, state.groupBy]);

const useTableView = <T>(input: UseTableViewInput<T>): TableView<T> => {
  const { rows, schema, viewKey, viewStorage, fallbackColumns, fallbackGroupBy } = input;

  const initial = useMemo(
    () => fallbackColumns ?? defaultColumns(schema),
    [fallbackColumns, schema],
  );

  const table = useDataTable({ rows, schema, initial, initialGroupBy: fallbackGroupBy });
  const view = useViewState({ key: viewKey, schema, fallbackColumns: initial, fallbackGroupBy, storage: viewStorage });

  const tableSignature = signatureOf(table);
  const snapshotSignature = signatureOf(view.snapshot);
  const inSync = tableSignature === snapshotSignature;

  const { setState } = table;
  const { snapshot, setSnapshot } = view;

  useEffect(() => {
    if (inSync) return;
    setState(restore(snapshot).table);
  }, [snapshotSignature]);

  useEffect(() => {
    if (inSync) return;
    setSnapshot(capture(table, snapshot.filters, snapshot.tab));
  }, [tableSignature]);

  return { table, sessionView: view.sessionView, setSessionView: view.setSessionView };
};

export { useTableView };
