/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { useVirtualFocus } from '../../virtual/useVirtualFocus';
import { CELL_ATTRIBUTE } from '../VirtualGrid.constants';
import { itemOfStop } from './item-of-stop';
import { nextCell } from './next-cell';
import { rowOfStop } from './row-of-stop';
import { rowPlace } from './row-place';
import type { KeyboardEvent } from 'react';
import type { VirtualFocus } from '../../virtual/virtual-focus.type';
import type { UseGridFocusInput } from './useGridFocus.type';

const useGridFocus = (input: UseGridFocusInput): VirtualFocus => {
  const { layout, heights, rootRef, bodyRef, metrics, onScroll, onMove, onActiveChange } = input;
  const { rows: placed } = layout;
  const resolve = useCallback((event: KeyboardEvent<HTMLElement>, stop: number, page: number) => {
    const to = nextCell(event.key, layout, stop, { ctrl: event.ctrlKey || event.metaKey, page });
    return to === undefined ? undefined : { index: to, row: rowOfStop(layout, to) };
  }, [layout]);
  const spanOf = useCallback((row: number) => {
    const entry = placed[row];
    return entry ? rowPlace(entry, heights) : { top: 0, height: 0 };
  }, [placed, heights]);
  const follow = useCallback((stop: number) => {
    const item = itemOfStop(layout, stop);
    if (item >= 0) onActiveChange?.(item);
  }, [layout, onActiveChange]);
  return useVirtualFocus({
    rootRef, bodyRef, cellAttribute: CELL_ATTRIBUTE, metrics, onScroll, resolve, spanOf, onMove, onActiveChange: follow,
  });
};

export { useGridFocus };
