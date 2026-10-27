/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { gripKeyDown } from '../../reorder/grip-key-down';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { useMoveFocus } from '../../reorder/useMoveFocus';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import type { KanbanBoardProps, KanbanCardData, KanbanMove, KanbanShared } from '../KanbanBoard.type';
import { boardMove } from './board-move';
import { cardPlace } from './card-place';
import { inColumnMove } from './in-column-move';
import { listOfColumn } from './list-of-column';
import { sideMove } from './side-move';
import { slotAt } from './slot-at';
import { useCollapsedColumns } from './useCollapsedColumns';

const useKanbanBoard = <Card extends KanbanCardData>(props: KanbanBoardProps<Card>) => {
  const { columns, renderCard, onMove, cardLabel = (card: Card) => card.id, cardEdgeTone, grip = true, foldable = true } = props;
  const { kanbanBoard } = useTesseraStrings();
  const boardRef = useRef<HTMLElement>(null);
  const landingRef = useRef<HTMLElement | null>(null);
  const focus = useMoveFocus(landingRef);
  const fold = useCollapsedColumns(boardRef, props);
  const folded = foldable ? fold.shown : [];

  const commit = (move: KanbanMove, follow: boolean): void => {
    const target = columns.find((column) => column.id === move.to.columnId);
    const place = cardPlace(columns, move.cardId);
    const card = place && columns[place.column]?.cards[place.index];
    if (!target || !card) return;
    const total = move.from.columnId === move.to.columnId ? target.cards.length : target.cards.length + 1;
    focus.announce(kanbanBoard.moved(cardLabel(card), target.title, move.to.index + 1, total));
    if (follow) {
      landingRef.current = listOfColumn(boardRef.current, target.id);
      focus.expect(move.cardId);
    }
    onMove(move);
  };

  const drag = useReorderDrag({
    listRef: boardRef,
    selector: ITEM_SELECTOR,
    axis: 'vertical',
    locate: (point) => slotAt(boardRef.current, columns, point),
    onDrop: (from, to) => {
      const move = boardMove(columns, from, to);
      if (move) commit(move, move.from.columnId !== move.to.columnId);
    },
  });

  const onCardKeyDown = (event: KeyboardEvent<HTMLElement>, card: Card): void => {
    const place = cardPlace(columns, card.id);
    const column = place && columns[place.column];
    if (!place || !column) return;
    gripKeyDown(event, {
      drag,
      index: place.index,
      total: column.cards.length,
      onStep: (to) => {
        const move = inColumnMove(columns, card.id, to);
        if (move) commit(move, true);
      },
    });
    const across = sideMove(columns, folded, card.id, event);
    if (!across) return;
    event.preventDefault();
    commit(across, true);
  };

  const shared: KanbanShared<Card> = { columns, renderCard, cardLabel, cardEdgeTone, grip, foldable, drag, onCardKeyDown, onToggle: fold.toggle };
  return { boardRef, shared, collapsed: folded, message: focus.message };
};

export { useKanbanBoard };
