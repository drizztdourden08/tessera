/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListItemList, ListItemRow } from '../src/composites/ListItemRow';
import { SectionHeader } from '../src/primitives/SectionHeader';

describe('SectionHeader', () => {
  it('draws its title as an h3 by default, and at the level asked', () => {
    expect(renderToString(h(SectionHeader, { title: 'Templates' }))).toMatch(/<h3 class="[^"]*section-header__title[^"]*">Templates<\/h3>/);
    expect(renderToString(h(SectionHeader, { title: 'Templates', level: 2 }))).toContain('<h2 ');
  });

  it('draws the count as a Badge inside the heading, apart from the title text', () => {
    const html = renderToString(h(SectionHeader, { title: 'Players', count: 2 }));
    expect(html).toMatch(/Players<span class="[^"]*badge[^"]*section-header__count[^"]*">2<\/span><\/h3>/);
    expect(renderToString(h(SectionHeader, { title: 'Players', count: 0 }))).toContain('>0</span></h3>');
  });
});

describe('ListItemList', () => {
  const row = h(ListItemRow, { key: 'a', name: 'Friday async' });

  it('names the list after its heading, drawn in the overline look with its count', () => {
    const html = renderToString(h(ListItemList, { heading: 'Sessions', count: 4, className: 'host' }, row));
    const id = html.match(/class="text text--overline list-item-list__heading" id="([^"]+)"/)?.[1];
    expect(id).toBeTruthy();
    expect(html).toContain(`role="list" aria-labelledby="${id}" class="list-item-list"`);
    expect(html).toContain('class="list-item-list-group host"');
    expect(html).toMatch(/Sessions<span class="[^"]*list-item-list__count[^"]*">4<\/span>/);
  });

  it('stays a bare list without a heading', () => {
    const html = renderToString(h(ListItemList, { label: 'Sessions', className: 'host' }, row));
    expect(html.startsWith('<div role="list" aria-label="Sessions" class="list-item-list host"')).toBe(true);
  });
});
