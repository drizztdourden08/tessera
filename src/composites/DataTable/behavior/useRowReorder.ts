/* @layer renderer-components @kind hook */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { useMoveFocus } from '../../reorder/useMoveFocus';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import { pointerRowInsertion } from './pointer-row-insertion';
import type { RowReorderBinding } from './row-features.type';
import type { UseRowReorderInput } from './useRowReorder.type';

const useRowReorder = (input: UseRowReorderInput): RowReorderBinding | null => {
  const { onRowMove, order, listRef, rootRef, getRects } = input;
  const { table } = useTesseraStrings();
  const focus = useMoveFocus(listRef);
  const total = order.keys.length;

  const drop = (from: number, to: number) => {
    const key = order.keys[from];
    if (!onRowMove || key === undefined) return;
    focus.announce(table.rowMoved(to + 1, total));
    onRowMove(key, to);
  };

  const step = (from: number, to: number) => {
    const key = order.keys[from];
    if (key !== undefined) focus.expect(key);
    drop(from, to);
  };

  const drag = useReorderDrag({
    listRef,
    selector: ITEM_SELECTOR,
    locate: (point) => {
      const root = rootRef.current;
      return root ? pointerRowInsertion(root, getRects(), point) : total;
    },
    onDrop: drop,
  });

  if (!onRowMove) return null;
  return { total, indexOf: order.indexOf, drag, drop, step, message: focus.message };
};

export { useRowReorder };
