/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListItemList, ListItemRow } from '../src/composites/ListItemRow';
import { shapeOfRows } from '../src/composites/ListItemRow/behavior/shape-of-rows';

describe('ListItemRow lead', () => {
  it('draws the lead before the name in the first column, readable by screen readers', () => {
    const html = renderToString(h(ListItemRow, { name: 'Friday async', lead: '#12' }));
    expect(html).toContain('list-item-row__icon list-item-row__lead');
    expect(html.indexOf('#12')).toBeLessThan(html.indexOf('Friday async'));
    expect(html).not.toContain('aria-hidden');
  });

  it('opens the first track of a lone row and of a list', () => {
    expect(renderToString(h(ListItemRow, { name: 'A', lead: '1' }))).toContain('grid-template-columns:[icon] auto');
    expect(shapeOfRows([h(ListItemRow, { key: 'a', name: 'A' }), h(ListItemRow, { key: 'b', name: 'B', lead: '2' })]).icon).toBe(true);
    expect(shapeOfRows([h(ListItemRow, { key: 'a', name: 'A' })]).icon).toBe(false);
  });

  it('keeps an icon beside the lead and hides only the icon from screen readers', () => {
    const html = renderToString(h(ListItemRow, { name: 'A', lead: '1', icon: h('i', null, 'x') }));
    expect(html).toContain('aria-hidden="true"><i>x</i>');
  });

  it('leaves the markup of a row with only an icon as before', () => {
    const html = renderToString(h(ListItemRow, { name: 'A', icon: h('i', null, 'x') }));
    expect(html).toContain('class="list-item-row__icon" aria-hidden="true"');
    expect(html).not.toContain('list-item-row__lead');
  });

  it('puts the lead track in a list too', () => {
    const html = renderToString(h(ListItemList, { label: 'Sessions' }, h(ListItemRow, { name: 'A', lead: '1' })));
    expect(html).toContain('grid-template-columns:[icon] auto');
  });
});

describe('ListItemRow flat', () => {
  it('adds list-item-row--flat only when asked', () => {
    expect(renderToString(h(ListItemRow, { name: 'A' }))).not.toContain('list-item-row--flat');
    expect(renderToString(h(ListItemRow, { name: 'A', flat: true }))).toContain('list-item-row--flat');
    expect(renderToString(h(ListItemRow, { name: 'A', flat: true, onClick: () => undefined }))).toContain('list-item-row--flat');
  });
});
