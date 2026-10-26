/* @layer renderer-components @kind util */
import { reorderStep } from '../../reorder/reorder-step';
import type { ReorderKeyEvent } from '../../reorder/reorder.type';
import type { KanbanColumn, KanbanMove } from '../KanbanBoard.type';
import { cardPlace } from './card-place';

const sideMove = (
  columns: readonly KanbanColumn[],
  collapsed: readonly string[],
  cardId: string,
  event: ReorderKeyEvent,
): KanbanMove | undefined => {
  const place = cardPlace(columns, cardId);
  const origin = place && columns[place.column];
  if (!place || !origin) return undefined;
  const open = columns.filter((column) => !collapsed.includes(column.id));
  const step = reorderStep(event, { axis: 'horizontal', chord: 'plain', index: open.findIndex((column) => column.id === origin.id), total: open.length });
  const target = step === undefined ? undefined : open[step];
  if (!target) return undefined;
  return {
    cardId,
    from: { columnId: origin.id, index: place.index },
    to: { columnId: target.id, index: Math.min(place.index, target.cards.length) },
  };
};

export { sideMove };
