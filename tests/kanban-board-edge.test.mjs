/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { KanbanBoard } from '../src/composites/KanbanBoard';

const COLUMNS = [
  { id: 'todo', title: 'To do', cards: [{ id: 'a' }, { id: 'b' }] },
  { id: 'done', title: 'Done', cards: [{ id: 'c' }] },
];

const draw = (props) => renderToString(h(KanbanBoard, {
  columns: COLUMNS, onMove: () => undefined, renderCard: (entry) => h('span', null, entry.id), ...props,
}));

describe('KanbanBoard card edge tone', () => {
  it('draws an edge only on the cards the callback gives a tone', () => {
    const html = draw({ cardEdgeTone: (entry) => (entry.id === 'a' ? 'danger' : undefined) });
    expect(html.match(/card--edge-danger/g)).toHaveLength(1);
    expect(html.match(/card--edge-left/g)).toHaveLength(1);
  });

  it('draws no edge without the callback', () => {
    expect(draw({})).not.toContain('card--edge');
  });
});
