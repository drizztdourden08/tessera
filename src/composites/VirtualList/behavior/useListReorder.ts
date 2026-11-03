/* @layer renderer-components @kind hook */
import { useEffect, useMemo } from 'react';
import { stepGap } from '../../reorder/step-gap';
import { listKeyStep } from './list-key-step';
import { listMarkOf } from './list-mark-of';
import { listPosition } from './list-position';
import { listStays } from './list-stays';
import { listThumbnails } from './list-thumbnails';
import { useListCommit } from './useListCommit';
import { useListDrag } from './useListDrag';
import type { KeyboardEvent } from 'react';
import type { ListReorder, UseListReorderInput } from './useListReorder.type';

const useListReorder = <T,>(input: UseListReorderInput<T>): ListReorder => {
  const { reorder, items, keys, indexOfKey, selected, axis, focusItem } = input;
  const { commit, message, wanted } = useListCommit({ reorder, keys });
  const keysOf = (index: number): readonly string[] => {
    const key = keys[index];
    if (key === undefined) return [];
    return selected.has(key) ? keys.filter((each) => selected.has(each)) : [key];
  };
  const { drag, target, modifier, handlersOf, swallowClick } = useListDrag({ ...input, keysOf, onDrop: commit });
  const dragging = reorder !== undefined && drag.dragging !== null && target !== null;
  const gap = dragging && !listStays(keys, drag.dragKeys, target) ? target : null;

  const refused = useMemo(() => gap !== null && reorder?.canDrop?.({ keys: drag.dragKeys, to: gap, modifier }) === false, [gap, reorder, drag.dragKeys, modifier]);
  const label = gap === null ? undefined : reorder?.dropLabel?.(listPosition(keys, drag.dragKeys, gap), modifier);

  const extrasOf: ListReorder['extrasOf'] = (index, key) => {
    if (!reorder) return {};
    const mark = gap === null ? undefined : listMarkOf(index, gap, keys.length);
    return {
      ...handlersOf(index),
      'data-drop': mark,
      'data-drop-label': mark ? label : undefined,
      'data-refused': mark && refused ? true as const : undefined,
      'data-dragging': dragging && drag.dragKeys.includes(key) ? true as const : undefined,
    };
  };

  const keyMove: ListReorder['keyMove'] = (event: KeyboardEvent<HTMLElement>, index) => {
    const by = listKeyStep(event, axis);
    if (!reorder || by === undefined || keys[index] === undefined) return false;
    event.preventDefault();
    const moving = keysOf(index);
    const to = stepGap(keys, moving, by);
    if (to !== undefined) commit(moving, to, 'none');
    return true;
  };

  useEffect(() => {
    const key = wanted.current;
    const at = key === null ? undefined : indexOfKey.get(key);
    if (at === undefined) return;
    wanted.current = null;
    focusItem(at);
  });

  const thumbnails = dragging ? listThumbnails({ reorder, items, indexOfKey, keys: drag.dragKeys }) : [];

  return {
    active: reorder !== undefined,
    message,
    ghost: dragging ? { count: drag.dragKeys.length, thumbnails, point: drag.point } : null,
    extrasOf,
    keyMove,
    swallowClick,
  };
};

export { useListReorder };
