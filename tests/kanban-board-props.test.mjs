/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { KanbanBoard } from '../src/composites/KanbanBoard';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

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


describe('KanbanBoard card edge tone', () => {
  it('draws an edge only on the cards the callback gives a tone', () => {
    const html = draw({ cardEdgeTone: (card) => (card.id === 'a' ? 'danger' : undefined) });
    expect(html.match(/card--edge-danger/g)).toHaveLength(1);
    expect(html.match(/card--edge-left/g)).toHaveLength(1);
  });

  it('draws no edge without the callback', () => {
    expect(draw({})).not.toContain('card--edge');
  });
});

describe('KanbanBoard grip', () => {
  it('draws the grip with drag handlers by default', () => {
    expect(draw({})).toContain('kanban__grip');
    expect(draw({})).not.toContain('kanban--no-grip');
  });

  it('keeps the grip button for the keys but marks the board without a grip', () => {
    const html = draw({ grip: false });
    expect(html).toMatch(/class="kanban kanban--no-grip"/);
    expect(html).toContain('kanban__grip');
    expect(html).toContain('aria-keyshortcuts');
  });
});

describe('KanbanBoard fold chevron', () => {
  it('draws a fold button per column by default', () => {
    expect(draw({}).match(/data-board-toggle=/g)).toHaveLength(2);
  });

  it('draws none with foldable false, even for a folded column', () => {
    const html = draw({ foldable: false, defaultCollapsed: ['done'] });
    expect(html).not.toContain('data-board-toggle');
    expect(html).not.toContain('kanban__rail');
  });
});

describe('KanbanBoard column height', () => {
  it('stretches by default and fits the cards with columnHeight fit', () => {
    expect(draw({})).not.toContain('kanban--fit');
    expect(draw({ columnHeight: 'fit' })).toMatch(/class="kanban kanban--fit"/);
  });
});

describe('KanbanBoard stack', () => {
  it('adds no wrapper by default and wraps the board with stack', () => {
    expect(draw({})).not.toContain('kanban-stack');
    expect(draw({ stack: true })).toMatch(/^<div class="kanban-stack"><div[^>]*class="kanban"/);
  });

  it('stacks at the pixel width of the board-stack-w token', () => {
    expect(read('src/tokens/size.css')).toContain('--board-stack-w: calc(420 * var(--size-1))');
    const css = read('src/composites/KanbanBoard/KanbanBoard.css');
    expect([...css.matchAll(/@container kanban \(width < (\d+)px\)/g)].map((m) => m[1])).toEqual(['420']);
  });
});
