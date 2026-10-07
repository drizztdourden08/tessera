/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ItemList } from '../src/composites/ItemList';

const PRESETS = [
  { id: 'a', name: 'Keysanity', changes: 7 },
  { id: 'b', name: 'Bottle hunt', changes: 11, missing: true },
];

const base = {
  title: 'Presets',
  items: PRESETS,
  getId: (preset) => preset.id,
  getName: (preset) => preset.name,
  render: (preset) => ({
    meta: `${preset.changes} changes`,
    columns: preset.missing ? [{ primary: 'not installed', align: 'end' }] : undefined,
  }),
  selectedId: 'a',
  onSelect: () => {},
  onRename: () => {},
  onDelete: () => {},
};

const draw = (props) => renderToString(h(ItemList, { ...base, ...props }));
const tracks = (html) => html.match(/class="list-item-list"[^>]*style="grid-template-columns:([^"]+)"/)?.[1];
const rowClass = (html, id) => html.match(new RegExp(`class="([^"]+)"[^>]*data-item-id="${id}"`))?.[1];
const css = readFileSync(new URL('../src/composites/ListItemRow/ListItemRow.css', import.meta.url), 'utf8');

describe('ItemList rows on one line', () => {
  it('gives the list a track for every column of its rows, read from render', () => {
    expect(tracks(draw({ actionVisibility: 'always' }))).toBe('[main] minmax(0, 1fr) auto [action] auto [end]');
  });

  it('keeps no track for actions shown on hover: they take the row line only while shown', () => {
    const html = draw();
    expect(tracks(html)).toBe('[main] minmax(0, 1fr) auto [action end]');
    expect(rowClass(html, 'b')).toContain('list-item-row--action-inline');
    expect(rowClass(html, 'b')).not.toContain('list-item-row--action-shown');
    expect(rowClass(html, 'a')).toContain('list-item-row--action-shown');
  });

  it('hides a hover action out of the layout and draws a shown one at the row end', () => {
    expect(css).toMatch(/\.list-item-row--action-inline:not\(:hover, :focus-within, \.list-item-row--action-shown\) \.list-item-row__action \{\s*display: none;/);
    expect(css).toMatch(/\.list-item-row--action-inline \{\s*display: flex;/);
    expect(css).toMatch(/\.list-item-row--action-inline \.list-item-row__cell--main \{\s*flex: 1;/);
  });

  it('keeps the name and the meta on one line each, with the full text as a title', () => {
    const html = draw();
    expect(html).toMatch(/list-item-row__primary" title="Bottle hunt"/);
    expect(html).toMatch(/list-item-row__secondary" title="11 changes"/);
    expect(css).toMatch(/\.list-item-row__secondary \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis;/);
  });
});
