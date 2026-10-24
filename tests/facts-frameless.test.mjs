/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FactsPanel } from '../src/composites/FactsPanel';

const GROUPS = [[{ label: 'Seed', value: 'K7Q2-M9XA' }, { label: 'Slot', value: 'Link' }]];

describe('FactsPanel framed', () => {
  it('is framed by default, in every layout', () => {
    ['inline', 'rows', 'boxed', 'terms'].forEach((layout) => {
      expect(renderToString(h(FactsPanel, { groups: GROUPS, layout })), layout).not.toContain('facts-panel--frameless');
    });
  });

  it('framed={false} adds the frameless class and keeps the layout and the groups', () => {
    const html = renderToString(h(FactsPanel, { groups: [...GROUPS, ...GROUPS], layout: 'rows', framed: false }));
    expect(html).toContain('facts-panel facts-panel--rows facts-panel--frameless');
    expect(html.match(/class="facts-panel__group"/g)).toHaveLength(2);
  });
});
