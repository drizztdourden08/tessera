/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListItemRow } from '../src/composites/ListItemRow';

describe('ListItemRow drag', () => {
  it('makes the whole row draggable when asked, plain or clickable', () => {
    expect(renderToString(h(ListItemRow, { name: 'hero.png', draggable: true, onDragStart: () => {} }))).toContain('draggable="true"');
    expect(renderToString(h(ListItemRow, { name: 'hero.png', draggable: true, onClick: () => {} }))).toContain('draggable="true"');
  });

  it('is not draggable by default', () => {
    expect(renderToString(h(ListItemRow, { name: 'hero.png' }))).not.toContain('draggable');
  });
});
