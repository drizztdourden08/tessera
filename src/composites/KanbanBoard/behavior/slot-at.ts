/* @layer renderer-components @kind util */
import { insertionAt } from '../../reorder/insertion-at';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { LIST_ATTRIBUTE } from '../KanbanBoard.constants';
import type { KanbanColumn } from '../KanbanBoard.type';
import { nearestList } from './nearest-list';
import { sizesOf } from './sizes-of';
import { slotOf } from './slot-of';

const slotAt = (board: HTMLElement | null, columns: readonly KanbanColumn[], point: { clientX: number; clientY: number }): number => {
  const sizes = sizesOf(columns);
  const list = nearestList([...(board?.querySelectorAll<HTMLElement>(`[${LIST_ATTRIBUTE}]`) ?? [])], point.clientX, point.clientY);
  const column = columns.findIndex((candidate) => candidate.id === list?.getAttribute(LIST_ATTRIBUTE));
  if (!list || column < 0) return slotOf(sizes, sizes.length - 1, sizes.at(-1) ?? 0);
  return slotOf(sizes, column, insertionAt(list, ITEM_SELECTOR, 'vertical', point.clientY));
};

export { slotAt };
