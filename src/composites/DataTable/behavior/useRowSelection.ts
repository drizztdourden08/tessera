/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { EMPTY, noChange } from '../../selection/selection.constants';
import { useSelectionModel } from '../../selection/useSelectionModel';
import { ghostRowSample } from './ghost-row-sample';
import { SELECT_CELL_SELECTOR } from './useRowSelection.constants';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { RowSelectionBinding } from '../DataTable.type';
import type { UseRowSelectionInput } from './useRowSelection.type';

const isGridKey = (event: KeyboardEvent<HTMLElement>) => {
  const { target, currentTarget } = event;
  return target === currentTarget || ((target as Partial<Element>).closest?.(SELECT_CELL_SELECTOR) ?? null) !== null;
};

const useRowSelection = <T,>(input: UseRowSelectionInput<T>): RowSelectionBinding | null => {
  const {
    nodes, isExpanded, getRowId, selectable, selectedIds, selectedId, onSelect, onSelectionChange,
  } = input;

  const order = useMemo(
    () => (selectedIds
      ? ghostRowSample({ nodes, isExpanded, limit: Number.POSITIVE_INFINITY }).map(getRowId)
      : []),
    [selectedIds, nodes, isExpanded, getRowId],
  );

  const model = useSelectionModel({
    order, selected: selectedIds ?? EMPTY, onChange: onSelectionChange ?? noChange, onPick: onSelect, seed: selectedId,
  });

  return useMemo(() => {
    if (!selectedIds) return null;

    const onRowMouseDown = (event: MouseEvent<HTMLElement>) => {
      if (event.shiftKey) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Escape' || selectedIds.size === 0 || !isGridKey(event)) return;
      event.preventDefault();
      model.clear();
    };

    return {
      selectable,
      isSelected: model.isSelected,
      onRowClick: model.click,
      onRowMouseDown,
      onCheck: (id: string, range: boolean) => (range ? model.extend(id, true) : model.toggle(id)),
      onCheckAll: model.checkAll,
      allState: model.allState,
      onKeyDown,
    };
  }, [selectedIds, selectable, model]);
};

export { useRowSelection };
