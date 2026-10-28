/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef } from 'react';
import { EMPTY } from '../../selection/selection.constants';
import { gridCellExtras } from './grid-cell-extras';
import { itemOfStop } from './item-of-stop';
import { rowOfItem } from './row-of-item';
import { useGridRects } from './useGridRects';
import { useGridReorder } from './useGridReorder';
import { useGridSelection } from './useGridSelection';
import type { KeyboardEvent } from 'react';
import type { GridInteraction, UseGridInteractionInput } from './useGridInteraction.type';

const useGridInteraction = <T,>(input: UseGridInteractionInput<T>): GridInteraction => {
  const { flat, layout, getKey, selection, getLabel, holes, reorder, sections } = input;
  const jumpRef = useRef<(stop: number, row: number) => void>(() => undefined);
  const keys = useMemo(() => flat.map((item, at) => getKey(item, at)), [flat, getKey]);
  const focusItem = useCallback((index: number) => {
    const at = rowOfItem(layout, index);
    const row = layout.rows[at];
    if (row?.kind === 'tiles') jumpRef.current(row.stop + (index - row.first), at);
  }, [layout]);
  const { model: select, holeKeys, indexOfKey } = useGridSelection({ flat, keys, layout, selection, getLabel, holes, focusItem });
  const getRects = useGridRects({ ...input, skip: holeKeys });
  const moving = useGridReorder({
    ...input, reorder, sections, keys, selected: selection?.selected ?? EMPTY, holeKeys, indexOfKey, focusItem,
  });
  const selecting = selection !== undefined;

  const onMove = useCallback((event: KeyboardEvent<HTMLElement>, to: { index: number }, from: number) => {
    const start = keys[itemOfStop(layout, from)];
    const end = keys[itemOfStop(layout, to.index)];
    if (selecting && event.shiftKey && start !== undefined && end !== undefined) select.step(start, end, event.ctrlKey || event.metaKey);
  }, [layout, keys, selecting, select]);
  const extrasOf = (item: number, key: string) => gridCellExtras({ key, item, select, moving, selecting, hole: holeKeys.has(key) });
  const cellKeys: GridInteraction['cellKeys'] = (event, stop, item, navigate) => {
    if (moving.keyMove(event, item)) return;
    if (selecting) select.onKeyDown(event, keys[item] ?? '');
    navigate(event, stop);
  };

  return { jumpRef, getRects, onMove, extrasOf, cellKeys, selecting, moving };
};

export { useGridInteraction };
