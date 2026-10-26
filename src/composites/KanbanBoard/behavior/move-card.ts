/* @layer renderer-components @kind util */
import type { KanbanCardData, KanbanColumn, KanbanMove } from '../KanbanBoard.type';

const moveCard = <Card extends KanbanCardData>(columns: readonly KanbanColumn<Card>[], move: KanbanMove): KanbanColumn<Card>[] => {
  const card = columns.find((column) => column.id === move.from.columnId)?.cards[move.from.index];
  if (card?.id !== move.cardId) return [...columns];
  return columns.map((column) => {
    const kept = column.id === move.from.columnId ? column.cards.filter((_, index) => index !== move.from.index) : column.cards;
    if (column.id !== move.to.columnId) return { ...column, cards: kept };
    return { ...column, cards: [...kept.slice(0, move.to.index), card, ...kept.slice(move.to.index)] };
  });
};

export { moveCard };
