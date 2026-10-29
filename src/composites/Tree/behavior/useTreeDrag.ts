/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef } from 'react';
import { REORDER_ITEM_SELECTOR } from '../../reorder';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import { NO_KEYS, SPRING_DELAY } from '../Tree.constants';
import type { TreeDropTarget, TreeMoveRequest } from '../Tree.type';
import { dragKeysOf } from './drag-keys-of';
import { dropMarkFor } from './drop-mark-for';
import { ghostOf } from './ghost-of';
import { keyMoverOf } from './key-mover-of';
import { locatorOf } from './locator-of';
import { moveRequestOf } from './move-request-of';
import { pointerHandlersOf } from './pointer-handlers-of';
import { springKeyOf } from './spring-key-of';
import { takeFlag } from './take-flag';
import { useSpringOpen } from './useSpringOpen';
import { useTreeCommit } from './useTreeCommit';
import type { DragSession, TreeDrag, TreeDragInput } from './useTreeDrag.type';

const useTreeDrag = <T,>(input: TreeDragInput<T>): TreeDrag => {
  const { rows, indexOfKey, selected, reorder, filtering, yieldsToDragOut, rootRef, bodyRef, rowHeight, getLabel, childCount, setExpanded, jump } = input;
  const enabled = reorder !== undefined && !filtering;
  const { commit, message } = useTreeCommit({ rows, indexOfKey, reorder, getLabel, childCount, setExpanded, jump });
  const moving = useRef<readonly string[]>(NO_KEYS);
  const fromRow = useRef(0);
  const target = useRef<TreeDropTarget | undefined>(undefined);
  const session = useRef<DragSession>({ down: null, moved: false });
  const swallow = useRef(false);

  const requestFor = useCallback((at: TreeDropTarget, keys: readonly string[]): TreeMoveRequest =>
    moveRequestOf({ rows, indexOfKey, target: at, keys, modifier: 'none', childCount }), [rows, indexOfKey, childCount]);

  const drag = useReorderDrag({
    listRef: bodyRef, selector: REORDER_ITEM_SELECTOR, axis: 'vertical', scrollRef: rootRef,
    keys: (from) => {
      fromRow.current = from;
      moving.current = dragKeysOf(rows, selected, from);
      return moving.current;
    },
    locate: locatorOf({ rows, indexOfKey, bodyRef, rowHeight, reorder, requestFor, moving, fromRow, target }),
    onDrop: (_from, _to, drop) => {
      if (!session.current.moved || !target.current) return;
      swallow.current = true;
      commit({ ...requestFor(target.current, drop.keys), modifier: drop.modifier });
    },
  });

  const active = enabled && drag.dragging !== null && session.current.moved;
  const found = active ? target.current : undefined;
  const openKey = useCallback((key: string) => setExpanded(key, true), [setExpanded]);
  useSpringOpen(springKeyOf(found, rows), reorder?.springDelay ?? SPRING_DELAY, openKey);
  const dragging = useMemo(() => new Set(active ? drag.dragKeys : NO_KEYS), [active, drag.dragKeys]);

  return {
    enabled,
    message,
    ghost: ghostOf(active, drag, reorder),
    dragging,
    markOf: (at) => dropMarkFor(found, rows.length, at),
    pointerOf: (at) => (enabled ? pointerHandlersOf(drag.handlers(at), session.current, yieldsToDragOut) : undefined),
    keyMove: keyMoverOf({ reorder, enabled, rows, indexOfKey, selected, childCount, commit }),
    swallowClick: () => takeFlag(swallow),
  };
};

export { useTreeDrag };
