/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { KanbanBoard } from '../src/composites/KanbanBoard';
import { boardMove } from '../src/composites/KanbanBoard/behavior/board-move';
import { inColumnMove } from '../src/composites/KanbanBoard/behavior/in-column-move';
import { moveCard } from '../src/composites/KanbanBoard/behavior/move-card';
import { placeOfSlot } from '../src/composites/KanbanBoard/behavior/place-of-slot';
import { sideMove } from '../src/composites/KanbanBoard/behavior/side-move';
import { slotOf } from '../src/composites/KanbanBoard/behavior/slot-of';
import { finalIndex } from '../src/composites/reorder/final-index';

const ignore = () => undefined;
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

const draw = (props) => renderToString(h(KanbanBoard, {
  columns: COLUMNS, onMove: ignore, renderCard: (entry) => h('span', { className: 'title' }, entry.title), ...props,
}));

describe('KanbanBoard slots', () => {
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

describe('boardMove', () => {
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

describe('moveCard', () => {
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

describe('keyboard steps', () => {
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

describe('KanbanBoard', () => {
  it('draws a named group of columns, each a named group with a list of cards', () => {
    const html = draw();
    expect(html).toMatch(/role="group"[^>]*aria-label="Board"/);
    expect(html).toContain('aria-label="To do, 3 cards"');
    expect(html).toContain('aria-label="Doing, 1 card"');
    expect(html.match(/<ul[^>]*data-board-list="[a-z]+"/g)).toHaveLength(4);
  });

  it('takes the name of the board from label', () => {
    expect(draw({ label: 'Sprint 12' })).toContain('aria-label="Sprint 12"');
  });

  it('shows the count of each column in its header', () => {
    const counts = [...draw().matchAll(/<h3[^>]*>([^<]*)<span[^>]*>(\d+)<\/span>/g)].map((match) => [match[1], match[2]]);
    expect(counts).toEqual([['To do', '3'], ['Doing', '1'], ['Review', '0'], ['Done', '2']]);
  });

  it('follows the cards when the count changes', () => {
    const columns = [{ id: 'todo', title: 'To do', cards: [card('a'), card('b')] }];
    expect(draw({ columns })).toMatch(/To do<span[^>]*>2<\/span>/);
  });

  it('numbers the cards by slot and keys them by id, one grip button each', () => {
    const html = draw();
    expect(html.match(/data-reorder-index="\d+"/g)).toEqual([0, 1, 2, 4, 7, 8].map((slot) => `data-reorder-index="${slot}"`));
    expect(html).toContain('data-reorder-key="e"');
    expect(html.match(/aria-label="Move [a-f]"/g)).toHaveLength(6);
  });

  it('draws what renderCard returns inside the card', () => {
    expect(draw().match(/<span class="title">/g)).toHaveLength(6);
  });

  it('names the grip after cardLabel and lists the move keys', () => {
    const html = draw({ cardLabel: (entry) => `Task ${entry.id}` });
    expect(html).toContain('aria-label="Move Task a"');
    expect(html).toContain('aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight"');
  });

  it('says No cards in an empty column', () => {
    expect(draw()).toContain('No cards');
  });

  it('has a polite live region for the move announcements', () => {
    expect(draw()).toMatch(/aria-live="polite"/);
  });

});

describe('KanbanBoard collapse', () => {
  it('folds the columns of defaultCollapsed to a rail with the title and the count', () => {
    const html = draw({ defaultCollapsed: ['done'] });
    expect(html).toContain('kanban__rail');
    expect(html).toContain('aria-label="Done, 2 cards"');
    expect(html).toContain('aria-label="Expand Done"');
    expect(html).toContain('aria-expanded="false"');
    expect(html.match(/data-board-list=/g)).toHaveLength(3);
    expect(html).toMatch(/kanban__rail-title">Done</);
    expect(html).not.toContain('data-reorder-key="e"');
  });

  it('leaves the others open with a Collapse button each', () => {
    const html = draw({ defaultCollapsed: ['done'] });
    expect(html).toContain('aria-label="Collapse To do"');
    expect(html).toContain('aria-label="Collapse Review"');
  });

  it('numbers the slots of the open columns as if the folded ones were drawn', () => {
    const html = draw({ defaultCollapsed: ['doing'] });
    expect(html.match(/data-reorder-index="\d+"/g)).toEqual([0, 1, 2, 7, 8].map((slot) => `data-reorder-index="${slot}"`));
  });

  it('follows collapsed when the app controls it, over defaultCollapsed', () => {
    const html = draw({ collapsed: ['todo'], defaultCollapsed: ['done'] });
    expect(html).toContain('aria-label="Expand To do"');
    expect(html).toContain('aria-label="Collapse Done"');
  });
});
