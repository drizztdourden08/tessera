/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { RowRenderContext } from '../DataTable.type';
import type { UseRowContextInput } from './useRowContext.type';

const useRowContext = <T>(input: UseRowContextInput<T>): RowRenderContext<T> => {
  const {
    columns, schema, drag, getRowId, selectedId, onSelect, selection, groups,
    resolveIdRefDisplay, resolveIdRefDefault, resolveIdRefHref, reorder, rowDragData, groupActions,
  } = input;
  const { draggingPath, onDragOver, onDrop } = drag;

  return useMemo(() => ({
    columns,
    schema,
    draggingPath,
    getRowId,
    selectedId,
    onSelect,
    selection,
    isExpanded: groups.isExpanded,
    onToggleGroup: groups.toggle,
    onCellDragOver: onDragOver,
    onCellDrop: onDrop,
    resolveIdRefDisplay,
    resolveIdRefDefault,
    resolveIdRefHref,
    reorder,
    rowDragData,
    groupActions,
  }), [
    columns, schema, draggingPath, onDragOver, onDrop,
    getRowId, selectedId, onSelect, selection, groups, resolveIdRefDisplay, resolveIdRefDefault, resolveIdRefHref,
    reorder, rowDragData, groupActions,
  ]);
};

export { useRowContext };
