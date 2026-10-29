/* @layer renderer-components @kind hook */
import { useEffect, useMemo } from 'react';
import { stepGap } from '../../reorder/step-gap';
import { gridKeyStep } from './grid-key-step';
import { gridMarkOf } from './grid-mark-of';
import { gridMoveStays } from './grid-move-stays';
import { useGridCommit } from './useGridCommit';
import { useGridDrag } from './useGridDrag';
import type { KeyboardEvent } from 'react';
import type { GridReorder, UseGridReorderInput } from './useGridReorder.type';

const useGridReorder = <T,>(input: UseGridReorderInput<T>): GridReorder => {
  const { reorder, sections, layout, flat, keys, columns, holeKeys, indexOfKey, focusItem } = input;
  const owners = useMemo(() => (sections ? sections.flatMap((section) => section.items.map(() => section.key)) : []), [sections]);
  const { commit, message, wanted, announce } =useGridCommit({ reorder, sections, keys, owners, indexOfKey });
  const { drag, target, keysOf, handlersOf, swallowClick } = useGridDrag({ ...input, layout, onDrop: commit });
  const dragging = drag.dragging !== null && target !== null;

  const hidden = useMemo(() => {
    if (!dragging || target.kind !== 'gap') return false;
    return gridMoveStays({ keys, moving: drag.dragKeys, index: target.index, section: target.section, owners, indexOfKey });
  }, [dragging, target, keys, drag.dragKeys, owners, indexOfKey]);

  const extrasOf = (item: number, key: string) => {
    if (!reorder || holeKeys.has(key)) return {};
    const gap = dragging && !hidden && target.kind === 'gap' ? target : null;
    return {
      ...handlersOf(item),
      'data-drop': gap ? gridMarkOf({ item, gap: gap.index, section: gap.section, total: keys.length, owners }) : undefined,
      'data-dragging': dragging && drag.dragKeys.includes(key) ? true as const : undefined,
    };
  };

  const keyMove = (event: KeyboardEvent<HTMLElement>, item: number): boolean => {
    const key = keys[item];
    const by = gridKeyStep(event, columns);
    if (!reorder || by === undefined || key === undefined || holeKeys.has(key)) return false;
    event.preventDefault();
    const moving = keysOf(item);
    const gap = stepGap(keys, moving, by);
    if (gap === undefined) return true;
    commit(moving, { kind: 'gap', index: gap, section: sections ? (owners[gap] ?? owners[owners.length - 1]) : undefined }, 'none');
    return true;
  };

  useEffect(() => {
    const key = wanted.current;
    const at = key === null ? undefined : indexOfKey.get(key);
    if (at === undefined) return;
    wanted.current = null;
    focusItem(at);
  });

  const thumbnails = dragging ? drag.dragKeys.slice(0, 3).flatMap((key) => {
    const at = indexOfKey.get(key);
    const item = at === undefined ? undefined : flat[at];
    return item === undefined || at === undefined ? [] : [reorder?.renderThumbnail?.(item, at)];
  }) : [];

  return {
    active: reorder !== undefined,
    message,
    announce,
    into: dragging && target.kind === 'into' ? target.section : null,
    ghost: dragging ? { count: drag.dragKeys.length, thumbnails, point: drag.point } : null,
    extrasOf,
    keyMove,
    swallowClick,
  };
};

export { useGridReorder };
