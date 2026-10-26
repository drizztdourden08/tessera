/* @layer renderer-components @kind util */
import type { KanbanColumn, KanbanMove } from '../KanbanBoard.type';
import { cardPlace } from './card-place';

const inColumnMove = (columns: readonly KanbanColumn[], cardId: string, to: number): KanbanMove | undefined => {
  const place = cardPlace(columns, cardId);
  const column = place && columns[place.column];
  if (!place || !column || to === place.index) return undefined;
  return { cardId, from: { columnId: column.id, index: place.index }, to: { columnId: column.id, index: to } };
};

export { inColumnMove };
