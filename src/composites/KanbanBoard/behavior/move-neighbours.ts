/* @layer renderer-components @kind util */
import type { KanbanColumn, KanbanMove } from '../KanbanBoard.type';
import { moveCard } from './move-card';

const moveNeighbours = (columns: readonly KanbanColumn[], move: KanbanMove): KanbanMove => {
  const cards = moveCard(columns, move).find((column) => column.id === move.to.columnId)?.cards ?? [];
  const above = move.to.index > 0 ? cards[move.to.index - 1]?.id : undefined;
  const below = cards[move.to.index + 1]?.id;
  return { ...move, ...(above === undefined ? {} : { above }), ...(below === undefined ? {} : { below }) };
};

export { moveNeighbours };
