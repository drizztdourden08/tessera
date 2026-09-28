/* @layer renderer-components @kind hook */
import { useMemo, useRef } from 'react';
import { ghostRowSample } from './ghost-row-sample';
import { toggledId } from './row-selection-math';
import { rangeBetween } from './rangeBetween';
import { allStateOf } from './allStateOf';
import { checkAllOf } from './checkAllOf';
import { EMPTY, SELECT_CELL_SELECTOR } from './useRowSelection.constants';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { RowSelectionBinding } from '../DataTable.type';
import type { UseRowSelectionInput } from './useRowSelection.type';

const isToggleClick = (event: MouseEvent<HTMLElement>) => event.ctrlKey || event.metaKey;

const isGridKey = (event: KeyboardEvent<HTMLElement>) => {
  const { target, currentTarget } = event;
  return target === currentTarget || (target instanceof Element && target.closest(SELECT_CELL_SELECTOR) !== null);
};

const useRowSelection = <T,>(input: UseRowSelectionInput<T>): RowSelectionBinding | null => {
  const {
    nodes, isExpanded, getRowId, selectable, selectedIds, selectedId, onSelect, onSelectionChange,
  } = input;
  const anchorRef = useRef<string | null>(null);

  const order = useMemo(
    () => (selectedIds
      ? ghostRowSample({ nodes, isExpanded, limit: Number.POSITIVE_INFINITY }).map(getRowId)
      : []),
    [selectedIds, nodes, isExpanded, getRowId],
  );

  return useMemo(() => {
    if (!selectedIds) return null;
    const change = (ids: ReadonlySet<string>) => onSelectionChange?.(ids);

    const extend = (id: string, keep: boolean) => {
      const from = anchorRef.current ?? selectedId ?? null;
      const range = from === null ? [id] : rangeBetween(order, from, id);
      change(new Set([...(keep ? selectedIds : EMPTY), ...range]));
    };

    const toggle = (id: string) => {
      anchorRef.current = id;
      change(toggledId(selectedIds, id));
    };

    const onRowClick = (id: string, event: MouseEvent<HTMLElement>) => {
      if (event.shiftKey) {
        extend(id, isToggleClick(event));
        return;
      }
      if (isToggleClick(event)) {
        toggle(id);
        return;
      }
      anchorRef.current = id;
      change(new Set([id]));
      onSelect?.(id);
    };

    const onRowMouseDown = (event: MouseEvent<HTMLElement>) => {
      if (event.shiftKey) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Escape' || selectedIds.size === 0 || !isGridKey(event)) return;
      event.preventDefault();
      change(EMPTY);
    };

    return {
      selectable,
      isSelected: (id: string) => selectedIds.has(id),
      onRowClick,
      onRowMouseDown,
      onCheck: (id: string, range: boolean) => (range ? extend(id, true) : toggle(id)),
      onCheckAll: () => change(checkAllOf(order, selectedIds)),
      allState: allStateOf(order, selectedIds),
      onKeyDown,
    };
  }, [selectedIds, selectedId, selectable, order, onSelect, onSelectionChange]);
};

export { useRowSelection };
