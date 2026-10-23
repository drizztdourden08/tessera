/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListDetail } from '../src/composites/ListDetail';

const SERVERS = [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Beta' }, { id: 'c', name: 'Gamma' }, { id: 'd', name: 'Delta' }];
const list = { title: 'Servers', items: SERVERS, getId: (server) => server.id, getName: (server) => server.name };

describe('ListDetail heading count', () => {
  it('draws the list heading with its count, as ItemList does', () => {
    const html = renderToString(h(ListDetail, { list, selectedId: null, onSelect: () => {}, detail: null }));
    expect(html).toContain('Servers · 4');
  });
});
