/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { createSchemaIndex } from '../../../data/schema/build-schema';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { VIRTUALIZE_FROM } from '../DataTable.constants';
import { columnLabelsOf } from './column-labels';
import { buildPickerNodes } from './field-picker-nodes';
import { useColumnDrag } from './useColumnDrag';
import { useColumnSizing } from './useColumnSizing';
import { useExpandedGroups } from './useExpandedGroups';
import { useGhostRows } from './useGhostRows';
import { useRowContext } from './useRowContext';
import { useRowFeatures } from './useRowFeatures';
import { useTableHandle } from './useTableHandle';
import { useRowSelection } from './useRowSelection';
import { useTableView } from './useTableView';
import { useVirtualRows } from './useVirtualRows';
import type { DataTableProps } from '../DataTable.type';

const useTableModel = <T>(props: DataTableProps<T>) => {
  const {
    rows, schema, getRowId, viewKey, viewStorage, fallbackColumns, fallbackGroupBy,
    defaultExpanded, virtualizeFrom = VIRTUALIZE_FROM, onSelect, selectedId, selectedIds, onSelectionChange, selectable = false,
    resolveIdRefDisplay, resolveIdRefDefault, resolveIdRefHref, onRowMove, rowDragData, groupActions,
    renderCell, rowState, rowHeight, sort, onSortChange, detailRowId, renderDetail, onDetailClose,
  } = props;

  const { table, sessionView, setSessionView } = useTableView({
    rows, schema, viewKey, viewStorage, fallbackColumns, fallbackGroupBy, sort, onSortChange,
  });
  const index = useMemo(() => createSchemaIndex(schema), [schema]);
  const strings = useTesseraStrings();

  const groups = useExpandedGroups({
    groupedRows: table.groupedRows,
    groupBy: table.groupBy,
    defaultExpanded,
    sessionView,
    setSessionView,
    controlled: props.expanded,
    onChange: props.onExpandedChange,
  });
  const selection = useRowSelection({
    nodes: table.groupedRows, isExpanded: groups.isExpanded, getRowId,
    selectable, selectedIds, selectedId, onSelect, onSelectionChange,
  });
  const drag = useColumnDrag(table.reorderColumn);
  const sizing = useColumnSizing({ columns: table.columns });
  const windowed = table.sortedRows.length >= virtualizeFrom;
  const virtual = useVirtualRows({
    enabled: windowed,
    nodes: table.groupedRows, isExpanded: groups.isExpanded, getRowId, rootRef: sizing.rootRef, rowHeight,
    detailRowId: renderDetail ? detailRowId : null,
  });

  const active = windowed ? virtual : null;
  const { getRects, reorder } = useRowFeatures({
    onRowMove, virtual: active, rootRef: sizing.rootRef, nodes: table.groupedRows, isExpanded: groups.isExpanded, getRowId,
  });

  const fieldNodes = useMemo(
    () => buildPickerNodes(schema, table.columns.map((column) => column.path)),
    [schema, table.columns],
  );

  const ghostRows = useGhostRows({ nodes: table.groupedRows, isExpanded: groups.isExpanded });

  const labels = columnLabelsOf({
    columns: table.columns, schema: index, sort: table.sort, groupBy: table.groupBy,
    draggingPath: drag.draggingPath, strings: strings.table,
  });

  const context = useRowContext({
    columns: table.columns, schema: index, drag, getRowId, selectedId, onSelect, selection, groups,
    resolveIdRefDisplay, resolveIdRefDefault, resolveIdRefHref, reorder, rowDragData, groupActions, renderCell, rowState,
    detailRowId, renderDetail, onDetailClose, onDetailHeight: active?.onDetailHeight,
  });

  return {
    table, index, selection, drag, sizing, fieldNodes, ghostRows, labels, context,
    virtual: active,
    rootRef: useTableHandle({ ref: props.ref, getRects, rootRef: sizing.rootRef, scrollRef: props.scrollRef }),
    reorder,
    checkboxes: selection?.selectable ?? false,
  };
};

export { useTableModel };
