/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { KanbanBoard } from '../src/composites/KanbanBoard';

const ignore = () => undefined;
const card = (id) => ({ id, title: id.toUpperCase() });
const TODO = { id: 'todo', title: 'To do', cards: [card('a'), card('b')] };
const DOING = { id: 'doing', title: 'Doing', cards: [card('c')] };

const draw = (props) => renderToString(h(KanbanBoard, {
  columns: [TODO, DOING], onMove: ignore, renderCard: (entry) => h('span', { className: 'title' }, entry.title), ...props,
}));

describe('KanbanBoard column header slots', () => {
  const slotted = [
    { ...TODO, badge: h('span', { 'data-slot': 'badge' }, '2 quiet'), action: h('button', { 'data-slot': 'action' }, 'Add') },
    DOING,
  ];

  it('draws the badge after the count and the action before the fold button', () => {
    const html = draw({ columns: slotted });
    expect(html.indexOf('data-slot="badge"')).toBeGreaterThan(html.indexOf('section-header__count'));
    expect(html.indexOf('data-slot="action"')).toBeGreaterThan(html.indexOf('data-slot="badge"'));
    expect(html.indexOf('data-slot="action"')).toBeLessThan(html.indexOf('data-board-toggle="todo"'));
    expect(html.match(/data-slot="action"/g)).toHaveLength(1);
  });

  it('draws only the fold button when a column has no slots', () => {
    const html = draw({ columns: [DOING] });
    expect(html).not.toContain('data-slot');
    expect(html).toContain('data-board-toggle="doing"');
  });

  it('hides the action and keeps the badge when the column is folded to a rail', () => {
    const html = draw({ columns: slotted, defaultCollapsed: ['todo'] });
    expect(html).toContain('kanban__rail');
    expect(html).toContain('kanban__rail-badge');
    expect(html).toContain('data-slot="badge"');
    expect(html).not.toContain('data-slot="action"');
  });
});

describe('KanbanBoard top slot', () => {
  const topped = [{ ...TODO, top: h('form', { className: 'add-form' }) }, DOING];

  it('draws top above the cards of an open column and hides it when folded', () => {
    const open = draw({ columns: topped });
    expect(open).toContain('class="add-form"');
    expect(open.indexOf('add-form')).toBeLessThan(open.indexOf('data-board-list="todo"'));
    expect(draw({ columns: topped, defaultCollapsed: ['todo'] })).not.toContain('add-form');
  });

  it('does not count top as a card for the drag slots', () => {
    expect(draw({ columns: topped }).match(/data-reorder-index="\d+"/g)).toEqual(draw().match(/data-reorder-index="\d+"/g));
  });
});
