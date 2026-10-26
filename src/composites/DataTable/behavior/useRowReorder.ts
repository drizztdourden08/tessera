/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { useMoveFocus } from '../../reorder/useMoveFocus';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import { moveTarget } from './move-target';
import { pointerSlot } from './pointer-slot';
import { slotDrop } from './slot-drop';
import type { PointerEvent } from 'react';
import type { RowReorderBinding } from './row-features.type';
import type { UseRowReorderInput } from './useRowReorder.type';

const useRowReorder = <T,>(input: UseRowReorderInput<T>): RowReorderBinding | null => {
  const { onRowMove, order, listRef, rootRef, getFlat } = input;
  const { table } = useTesseraStrings();
  const focus = useMoveFocus(listRef);
  const total = order.keys.length;
  const landing = useRef<{ group: string | undefined } | null>(null);
  const fired = useRef(false);

  const commit = (from: number, to: number, group: string | undefined) => {
    const key = order.keys[from];
    if (!onRowMove || key === undefined) return;
    fired.current = true;
    focus.announce(table.rowMoved(to + 1, total));
    onRowMove(key, moveTarget(order.keys, from, to, group));
  };

  const step = (from: number, to: number) => {
    const key = order.keys[from];
    if (key !== undefined) focus.expect(key);
    commit(from, to, order.groups[to]);
  };

  const drag = useReorderDrag({
    listRef,
    selector: ITEM_SELECTOR,
    locate: (point) => {
      const root = rootRef.current;
      if (!root) return total;
      const { items, rects } = getFlat();
      const drop = slotDrop(items, pointerSlot(root, rects, point));
      landing.current = { group: drop.groupKey };
      return drop.before;
    },
    onDrop: (from, to) => commit(from, to, landing.current?.group),
  });

  const handlers = (index: number) => {
    const raw = drag.handlers(index);
    return {
      ...raw,
      onPointerDown: (event: PointerEvent<HTMLElement>) => {
        landing.current = null;
        fired.current = false;
        raw.onPointerDown(event);
      },
      onPointerUp: () => {
        const held = drag.dragging === index;
        raw.onPointerUp();
        const moved = landing.current;
        if (held && !fired.current && moved && moved.group !== order.groups[index]) commit(index, index, moved.group);
      },
    };
  };

  if (!onRowMove) return null;
  return { total, indexOf: order.indexOf, drag, handlers, step, message: focus.message };
};

export { useRowReorder };
