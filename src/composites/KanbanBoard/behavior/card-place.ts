/* @layer renderer-components @kind util */
import type { CardPlace, KanbanColumn } from '../KanbanBoard.type';

const cardPlace = (columns: readonly KanbanColumn[], cardId: string): CardPlace | undefined => {
  for (const [column, { cards }] of columns.entries()) {
    const index = cards.findIndex((card) => card.id === cardId);
    if (index >= 0) return { column, index };
  }
  return undefined;
};

export { cardPlace };
