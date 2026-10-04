/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { createSchemaIndex } from '../../../data/schema/build-schema';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { GHOST_ROW_LIMIT } from '../DataTable.constants';
import { columnLabelsOf } from './column-labels';
import { buildPickerNodes } from './field-picker-nodes';
import { ghostRowSample } from './ghost-row-sample';
import { useColumnDrag } from './useColumnDrag';
import { useColumnSizing } from './useColumnSizing';
import { useExpandedGroups } from './useExpandedGroups';
import { useRowContext } from './useRowContext';
import { useRowSelection } from './useRowSelection';
import { useTableView } from './useTableView';
import type { DataTableProps } from '../DataTable.type';

const useTableModel = <T>(props: DataTableProps<T>) => {
  const {
    rows, schema, getRowId, viewKey, viewStorage, fallbackColumns, fallbackGroupBy,
    onSelect, selectedId, selectedIds, onSelectionChange, selectable = false,
    resolveIdRefDisplay, resolveIdRefDefault, resolveIdRefHref,
  } = props;

  const { table, sessionView, setSessionView } = useTableView({
    rows, schema, viewKey, viewStorage, fallbackColumns, fallbackGroupBy,
  });
  const index = useMemo(() => createSchemaIndex(schema), [schema]);
  const strings = useTesseraStrings();

  const groups = useExpandedGroups({
    groupedRows: table.groupedRows,
    groupBy: table.groupBy,
    sessionView,
    setSessionView,
  });
  const selection = useRowSelection({
    nodes: table.groupedRows, isExpanded: groups.isExpanded, getRowId,
    selectable, selectedIds, selectedId, onSelect, onSelectionChange,
  });
  const drag = useColumnDrag(table.reorderColumn);
  const sizing = useColumnSizing({ columns: table.columns });

  const fieldNodes = useMemo(
    () => buildPickerNodes(schema, table.columns.map((column) => column.path)),
    [schema, table.columns],
  );

  const ghostRows = useMemo(
    () => ghostRowSample({
      nodes: table.groupedRows, isExpanded: groups.isExpanded, limit: GHOST_ROW_LIMIT,
    }),
    [table.groupedRows, groups.isExpanded],
  );

  const labels = columnLabelsOf({
    columns: table.columns, schema: index, sort: table.sort, groupBy: table.groupBy,
    draggingPath: drag.draggingPath, strings: strings.table,
  });

  const context = useRowContext({
    columns: table.columns, schema: index, drag, getRowId, selectedId, onSelect, selection, groups,
    resolveIdRefDisplay, resolveIdRefDefault, resolveIdRefHref,
  });

  return {
    table, index, selection, drag, sizing, fieldNodes, ghostRows, labels, context,
    checkboxes: selection?.selectable ?? false,
  };
};

export { useTableModel };
