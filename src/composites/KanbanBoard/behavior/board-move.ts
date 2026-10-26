/* @layer renderer-components @kind util */
import type { KanbanColumn, KanbanMove } from '../KanbanBoard.type';
import { placeOfSlot } from './place-of-slot';
import { sizesOf } from './sizes-of';

const boardMove = (columns: readonly KanbanColumn[], from: number, to: number): KanbanMove | undefined => {
  const sizes = sizesOf(columns);
  const source = placeOfSlot(sizes, from);
  const origin = columns[source.column];
  const card = origin?.cards[source.index];
  if (!origin || !card) return undefined;
  const target = placeOfSlot(sizes.map((size, column) => (column === source.column ? size - 1 : size)), to);
  const destination = columns[target.column];
  if (!destination || (target.column === source.column && target.index === source.index)) return undefined;
  return {
    cardId: card.id,
    from: { columnId: origin.id, index: source.index },
    to: { columnId: destination.id, index: target.index },
  };
};

export { boardMove };
