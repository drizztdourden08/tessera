/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { boardMove } from '../src/composites/KanbanBoard/behavior/board-move';
import { inColumnMove } from '../src/composites/KanbanBoard/behavior/in-column-move';
import { moveCard } from '../src/composites/KanbanBoard/behavior/move-card';
import { placeOfSlot } from '../src/composites/KanbanBoard/behavior/place-of-slot';
import { sideMove } from '../src/composites/KanbanBoard/behavior/side-move';
import { slotOf } from '../src/composites/KanbanBoard/behavior/slot-of';
import { finalIndex } from '../src/composites/reorder/final-index';

const card = (id) => ({ id, title: id.toUpperCase() });
const COLUMNS = [
  { id: 'todo', title: 'To do', cards: [card('a'), card('b'), card('c')] },
  { id: 'doing', title: 'Doing', cards: [card('d')] },
  { id: 'review', title: 'Review', cards: [] },
  { id: 'done', title: 'Done', cards: [card('e'), card('f')] },
];
const SIZES = [3, 1, 0, 2];
const ids = (columns) => columns.map((column) => column.cards.map((entry) => entry.id).join(''));
const key = (name, held = {}) => ({ key: name, altKey: false, ctrlKey: false, metaKey: false, ...held });

describe('K1 KanbanBoard slots', { tags: ['critical'] }, () => {
  it('numbers the cards of all columns with one spare slot after each column', () => {
    expect(slotOf(SIZES, 0, 0)).toBe(0);
    expect(slotOf(SIZES, 0, 3)).toBe(3);
    expect(slotOf(SIZES, 1, 0)).toBe(4);
    expect(slotOf(SIZES, 2, 0)).toBe(6);
    expect(slotOf(SIZES, 3, 0)).toBe(7);
    expect(slotOf(SIZES, 3, 1)).toBe(8);
  });

  it('reads a slot back as a column and an index, the end of a column included', () => {
    expect(placeOfSlot(SIZES, 2)).toEqual({ column: 0, index: 2 });
    expect(placeOfSlot(SIZES, 3)).toEqual({ column: 0, index: 3 });
    expect(placeOfSlot(SIZES, 4)).toEqual({ column: 1, index: 0 });
    expect(placeOfSlot(SIZES, 6)).toEqual({ column: 2, index: 0 });
    expect(placeOfSlot(SIZES, 9)).toEqual({ column: 3, index: 2 });
  });
});

describe('K1 boardMove', { tags: ['critical'] }, () => {
  const drop = (from, before) => boardMove(COLUMNS, from, finalIndex({ from, before }));

  it('moves a card down within its column and reports the index it ends at', () => {
    expect(drop(0, 3)).toEqual({ cardId: 'a', from: { columnId: 'todo', index: 0 }, to: { columnId: 'todo', index: 2 } });
    expect(drop(0, 2)?.to).toEqual({ columnId: 'todo', index: 1 });
  });

  it('moves a card up within its column', () => {
    expect(drop(2, 0)).toEqual({ cardId: 'c', from: { columnId: 'todo', index: 2 }, to: { columnId: 'todo', index: 0 } });
  });

  it('reports nothing when the card is dropped where it was', () => {
    expect(drop(1, 1)).toBeUndefined();
    expect(drop(1, 2)).toBeUndefined();
  });

  it('moves a card to the top and the end of another column', () => {
    expect(drop(0, 4)?.to).toEqual({ columnId: 'doing', index: 0 });
    expect(drop(0, 5)?.to).toEqual({ columnId: 'doing', index: 1 });
    expect(drop(7, 3)?.to).toEqual({ columnId: 'todo', index: 3 });
  });

  it('moves a card between two cards of another column', () => {
    expect(drop(0, 7)?.to).toEqual({ columnId: 'done', index: 0 });
    expect(drop(0, 8)?.to).toEqual({ columnId: 'done', index: 1 });
    expect(drop(0, 9)?.to).toEqual({ columnId: 'done', index: 2 });
  });

  it('moves the last card of a column to the top of the next one, not to nothing', () => {
    expect(drop(2, 4)).toEqual({ cardId: 'c', from: { columnId: 'todo', index: 2 }, to: { columnId: 'doing', index: 0 } });
  });

  it('drops a card into an empty column', () => {
    expect(drop(4, 6)).toEqual({ cardId: 'd', from: { columnId: 'doing', index: 0 }, to: { columnId: 'review', index: 0 } });
  });

  it('moves a card up inside the last column', () => {
    expect(drop(8, 7)).toEqual({ cardId: 'f', from: { columnId: 'done', index: 1 }, to: { columnId: 'done', index: 0 } });
  });

  it('reports nothing for a slot that holds no card', () => {
    expect(boardMove(COLUMNS, 3, 0)).toBeUndefined();
  });
});

describe('K1 moveCard', { tags: ['critical'] }, () => {
  it('reorders inside a column and keeps the order of the rest', () => {
    const moved = moveCard(COLUMNS, { cardId: 'a', from: { columnId: 'todo', index: 0 }, to: { columnId: 'todo', index: 2 } });
    expect(ids(moved)).toEqual(['bca', 'd', '', 'ef']);
  });

  it('moves a card between columns', () => {
    const moved = moveCard(COLUMNS, { cardId: 'b', from: { columnId: 'todo', index: 1 }, to: { columnId: 'done', index: 1 } });
    expect(ids(moved)).toEqual(['ac', 'd', '', 'ebf']);
  });

  it('leaves the columns alone when the move does not match the board', () => {
    const moved = moveCard(COLUMNS, { cardId: 'z', from: { columnId: 'todo', index: 0 }, to: { columnId: 'done', index: 0 } });
    expect(ids(moved)).toEqual(ids(COLUMNS));
  });

  it('agrees with boardMove for every drop on the board', () => {
    for (let from = 0; from <= 9; from += 1) {
      for (let to = 0; to <= 9; to += 1) {
        const move = boardMove(COLUMNS, from, to);
        if (!move) continue;
        const after = moveCard(COLUMNS, move);
        const column = after.find((entry) => entry.id === move.to.columnId);
        expect(column?.cards[move.to.index]?.id).toBe(move.cardId);
        expect(after.flatMap((entry) => entry.cards)).toHaveLength(6);
      }
    }
  });
});

describe('K1 keyboard steps', { tags: ['critical'] }, () => {
  it('moves a card up and down inside its column', () => {
    expect(inColumnMove(COLUMNS, 'b', 2)).toEqual({ cardId: 'b', from: { columnId: 'todo', index: 1 }, to: { columnId: 'todo', index: 2 } });
    expect(inColumnMove(COLUMNS, 'b', 1)).toBeUndefined();
  });

  it('moves a card to the next column on Right and keeps its row when it fits', () => {
    expect(sideMove(COLUMNS, [], 'a', key('ArrowRight'))?.to).toEqual({ columnId: 'doing', index: 0 });
    expect(sideMove(COLUMNS, [], 'f', key('ArrowLeft'))?.to).toEqual({ columnId: 'review', index: 0 });
    expect(sideMove(COLUMNS, [], 'e', key('ArrowRight'))).toBeUndefined();
  });

  it('puts the card at the end when the next column is shorter', () => {
    expect(sideMove(COLUMNS, [], 'c', key('ArrowRight'))?.to).toEqual({ columnId: 'doing', index: 1 });
  });

  it('stops at the first and the last column', () => {
    expect(sideMove(COLUMNS, [], 'a', key('ArrowLeft'))).toBeUndefined();
    expect(sideMove(COLUMNS, [], 'f', key('ArrowRight'))).toBeUndefined();
  });

  it('skips a collapsed column, since its cards are hidden', () => {
    expect(sideMove(COLUMNS, ['doing'], 'a', key('ArrowRight'))?.to.columnId).toBe('review');
    expect(sideMove(COLUMNS, ['doing', 'review'], 'a', key('ArrowRight'))?.to.columnId).toBe('done');
  });

  it('ignores the vertical keys, a held Alt and an unknown card', () => {
    expect(sideMove(COLUMNS, [], 'a', key('ArrowDown'))).toBeUndefined();
    expect(sideMove(COLUMNS, [], 'a', key('ArrowRight', { altKey: true }))).toBeUndefined();
    expect(sideMove(COLUMNS, [], 'zz', key('ArrowRight'))).toBeUndefined();
  });
});
