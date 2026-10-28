/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { isElement } from '../../../primitives/dom/is-element';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { REORDER_ITEM_SELECTOR } from '../../reorder';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import { DRAG_THRESHOLD, GHOST_LIMIT, INTERACTIVE, NO_KEYS, SPRING_DELAY } from '../Tree.constants';
import type { ReorderPoint } from '../../reorder';
import type { TreeDropMark, TreeDropTarget, TreeMoveRequest } from '../Tree.type';
import { dropTargetOf } from './drop-target-of';
import { keyMoveOf } from './key-move-of';
import { moveRequestOf } from './move-request-of';
import { topKeysOf } from './top-keys-of';
import { useSpringOpen } from './useSpringOpen';
import type { TreeKeyDirection } from './move-request.type';
import type { TreeDrag, TreeDragInput } from './useTreeDrag.type';

const DIRECTIONS: Readonly<Record<string, TreeKeyDirection>> = { ArrowUp: 'up', ArrowDown: 'down', ArrowRight: 'in', ArrowLeft: 'out' };

const far = (from: ReorderPoint, event: PointerEvent<HTMLElement>): boolean =>
  Math.hypot(event.clientX - from.x, event.clientY - from.y) > DRAG_THRESHOLD;

const useTreeDrag = <T,>(input: TreeDragInput<T>): TreeDrag => {
  const { rows, indexOfKey, selected, reorder, filtering, rootRef, bodyRef, rowHeight, getLabel, childCount, setExpanded, jump } = input;
  const { lists } = useTesseraStrings();
  const enabled = reorder !== undefined && !filtering;
  const [message, setMessage] = useState('');
  const moving = useRef<readonly string[]>(NO_KEYS);
  const fromRow = useRef(0);
  const target = useRef<TreeDropTarget | undefined>(undefined);
  const down = useRef<ReorderPoint | null>(null);
  const moved = useRef(false);
  const swallow = useRef(false);
  const wanted = useRef<string | null>(null);

  const requestFor = useCallback((at: TreeDropTarget, keys: readonly string[]): TreeMoveRequest =>
    moveRequestOf({ rows, indexOfKey, target: at, keys, modifier: 'none', childCount }), [rows, indexOfKey, childCount]);

  const commit = (request: TreeMoveRequest): void => {
    const parent = request.parentKey === null ? undefined : rows[indexOfKey.get(request.parentKey) ?? -1];
    const total = childCount(request.parentKey) + request.keys.filter((key) => rows[indexOfKey.get(key) ?? -1]?.parentKey !== request.parentKey).length;
    setMessage(request.into && parent ? lists.itemsMovedInto(request.keys.length, getLabel(parent.item)) : lists.itemsMoved(request.keys.length, request.index + 1, total));
    wanted.current = request.keys[0] ?? null;
    reorder?.onMove(request);
    if (request.into && request.parentKey !== null) setExpanded(request.parentKey, true);
  };

  const drag = useReorderDrag({
    listRef: bodyRef, selector: REORDER_ITEM_SELECTOR, axis: 'vertical', scrollRef: rootRef,
    keys: (from) => {
      const row = rows[from];
      fromRow.current = from;
      moving.current = !row ? NO_KEYS : (selected.has(row.key) ? topKeysOf(rows, selected) : [row.key]);
      return moving.current;
    },
    locate: (point) => {
      const top = bodyRef.current?.getBoundingClientRect().top ?? 0;
      const keys = new Set(moving.current);
      target.current = dropTargetOf({
        rows, indexOfKey, y: point.clientY - top, rowHeight, from: fromRow.current, moving: keys, maxDepth: reorder?.maxDepth,
        allow: reorder?.canDrop ? (at) => reorder.canDrop?.(requestFor(at, moving.current)) ?? true : undefined,
      });
      return target.current?.gap ?? fromRow.current;
    },
    onDrop: (_from, _to, drop) => {
      const at = target.current;
      if (!moved.current || !at) return;
      swallow.current = true;
      commit({ ...requestFor(at, drop.keys), modifier: drop.modifier });
    },
  });

  const active = enabled && drag.dragging !== null && moved.current;
  const found = active ? target.current : undefined;
  const springKey = found?.into && rows[found.intoAt] && !rows[found.intoAt]?.expanded ? (rows[found.intoAt]?.key ?? null) : null;
  const openKey = useCallback((key: string) => setExpanded(key, true), [setExpanded]);
  useSpringOpen(springKey, reorder?.springDelay ?? SPRING_DELAY, openKey);

  useEffect(() => {
    const key = wanted.current;
    const at = key === null ? undefined : indexOfKey.get(key);
    if (at === undefined) return;
    wanted.current = null;
    jump(at);
  });

  const dragging = useMemo(() => new Set(active ? drag.dragKeys : NO_KEYS), [active, drag.dragKeys]);

  const markOf = (at: number): TreeDropMark | undefined => {
    if (!found) return undefined;
    if (found.into) return found.intoAt === at ? 'into' : undefined;
    if (found.gap === at) return 'before';
    return found.gap === rows.length && at === rows.length - 1 ? 'after' : undefined;
  };

  const pointerOf = (at: number) => {
    if (!enabled) return undefined;
    const base = drag.handlers(at);
    return {
      onPointerDown: (event: PointerEvent<HTMLElement>) => {
        if (isElement(event.target) && event.target.closest(INTERACTIVE)) return;
        moved.current = false;
        down.current = { x: event.clientX, y: event.clientY };
        base.onPointerDown(event);
      },
      onPointerMove: (event: PointerEvent<HTMLElement>) => {
        if (!moved.current && down.current && far(down.current, event)) moved.current = true;
        base.onPointerMove(event);
      },
      onPointerUp: (event: PointerEvent<HTMLElement>) => {
        base.onPointerUp(event);
        down.current = null;
      },
      onPointerCancel: () => {
        moved.current = false;
        base.onPointerCancel();
      },
    };
  };

  const keyMove = (event: KeyboardEvent<HTMLElement>, at: number): boolean => {
    const direction = DIRECTIONS[event.key];
    if (!enabled || !reorder || !direction || !event.altKey || event.ctrlKey || event.metaKey) return false;
    event.preventDefault();
    const row = rows[at];
    if (!row) return true;
    const keys = selected.has(row.key) ? topKeysOf(rows, selected) : [row.key];
    const request = keyMoveOf({ rows, indexOfKey, keys, direction, maxDepth: reorder.maxDepth, childCount });
    if (request && (reorder.canDrop?.(request) ?? true)) commit(request);
    return true;
  };

  const swallowClick = (): boolean => {
    const was = swallow.current;
    swallow.current = false;
    return was;
  };

  const ghost = active ? {
    count: drag.dragKeys.length,
    thumbnails: drag.dragKeys.slice(0, GHOST_LIMIT).map((key) => reorder?.renderThumbnail?.(key)),
    point: drag.point,
  } : null;

  return { enabled, message, ghost, dragging, markOf, pointerOf, keyMove, swallowClick };
};

export { useTreeDrag };
