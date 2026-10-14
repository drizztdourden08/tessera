/* @layer renderer-components @kind hook */
import { useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { clickSelection } from './click-selection';
import { STEP_KEYS } from './log-selection.constants';
import type { LogSelection, LogSelectionInput, LogSelectionMove } from './log-selection.type';
import { stepSelection } from './step-selection';

const draggedText = (row: HTMLElement): boolean => {
  const text = row.ownerDocument.getSelection();
  return text !== null && !text.isCollapsed;
};

const useLogSelection = (input: LogSelectionInput): LogSelection | null => {
  const { order, mounted, selectedIds, onSelectionChange } = input;
  const listRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);

  return useMemo(() => {
    if (!selectedIds) return null;
    const apply = (move: LogSelectionMove) => {
      anchorRef.current = move.anchor;
      setCursor(move.cursor);
      onSelectionChange?.(move.ids);
    };

    const onRowClick = (id: string, event: MouseEvent<HTMLElement>) => {
      if (!event.shiftKey && draggedText(event.currentTarget)) return;
      event.currentTarget.focus({ preventScroll: true });
      const keys = { shift: event.shiftKey, toggle: event.ctrlKey || event.metaKey };
      apply(clickSelection({ order, selected: selectedIds, anchor: anchorRef.current, id, keys }));
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      const by = STEP_KEYS[event.key];
      if (by === undefined || event.altKey || event.ctrlKey || event.metaKey) return;
      const move = stepSelection({ order, mounted, cursor, anchor: anchorRef.current, by, extend: event.shiftKey });
      if (!move) return;
      event.preventDefault();
      apply(move);
      const row = listRef.current?.children.item(mounted.indexOf(move.cursor)) as HTMLElement | null | undefined;
      row?.focus();
    };

    const shownCursor = cursor !== null && mounted.includes(cursor) ? cursor : mounted[mounted.length - 1];
    return {
      listRef,
      isSelected: (id: string) => selectedIds.has(id),
      tabStop: shownCursor,
      onRowClick,
      onRowMouseDown: (event: MouseEvent<HTMLElement>) => {
        if (event.shiftKey) event.preventDefault();
      },
      onKeyDown,
    };
  }, [order, mounted, selectedIds, onSelectionChange, cursor]);
};

export { useLogSelection };
