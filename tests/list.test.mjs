/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { List, ListItem } from '../src/primitives/List';

describe('List', () => {
  it('draws a bulleted list by default', () => {
    const html = renderToString(h(List, null, h(ListItem, null, 'one'), h(ListItem, null, 'two')));
    expect(html).toBe('<ul class="list list--bullets"><li class="list-item">one</li><li class="list-item">two</li></ul>');
  });

  it('draws a numbered list from a start and ignores start without ordered', () => {
    expect(renderToString(h(List, { ordered: true, start: 3 }, h(ListItem, null, 'x')))).toContain('<ol class="list list--numbers" start="3">');
    expect(renderToString(h(List, { start: 3 }, h(ListItem, null, 'x')))).not.toContain('start');
  });

  it('draws a bare item with no marker and passes a class and attributes through', () => {
    const html = renderToString(h(List, { className: 'mine', 'aria-label': 'Steps' }, h(ListItem, { bare: true, className: 'own' }, 'x')));
    expect(html).toContain('class="list list--bullets mine"');
    expect(html).toContain('aria-label="Steps"');
    expect(html).toContain('<li class="list-item list-item--bare own">x</li>');
  });
});
