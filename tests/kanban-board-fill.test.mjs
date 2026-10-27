/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { KanbanBoard } from '../src/composites/KanbanBoard';

const COLUMNS = [
  { id: 'todo', title: 'To do', cards: [{ id: 'a' }] },
  { id: 'done', title: 'Done', cards: [] },
];

const draw = (props) => renderToString(h(KanbanBoard, {
  columns: COLUMNS, onMove: () => undefined, renderCard: (card) => h('span', null, card.id), ...props,
}));

describe('KanbanBoard column width', () => {
  it('keeps a fixed column width by default', () => {
    expect(draw({})).not.toContain('kanban--fill');
    expect(draw({ columnWidth: 'fixed' })).not.toContain('kanban--fill');
  });

  it('puts the fill class on the board for columnWidth fill', () => {
    expect(draw({ columnWidth: 'fill' })).toMatch(/class="kanban kanban--fill"/);
  });

  it('keeps a custom class beside the fill class', () => {
    expect(draw({ columnWidth: 'fill', className: 'mine' })).toMatch(/class="kanban kanban--fill mine"/);
  });
});
