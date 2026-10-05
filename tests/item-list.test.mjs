/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ItemList } from '../src/composites/ItemList';
import { groupItems } from '../src/composites/ItemList/behavior/group-items';
import { matchesText } from '../src/data/text/matches-text';
import { ListDetail } from '../src/composites/ListDetail';
import { guardMessage } from '../src/composites/ListDetail/behavior/guard-message';
import { TESSERA_STRINGS } from '../src/primitives/strings';

const PRESETS = [
  { id: 'a', name: 'Keysanity', game: 'A Link to the Past' },
  { id: 'b', name: 'Short run', game: 'Timespinner' },
  { id: 'c', name: 'Open, fast Ganon', game: 'A Link to the Past' },
];

const base = {
  title: 'Presets',
  items: PRESETS,
  getId: (preset) => preset.id,
  getName: (preset) => preset.name,
};

const draw = (props) => renderToString(h(ItemList, { ...base, ...props }));

describe('ItemList', () => {
  it('draws the title with its count, New and the rows under their groups, in first seen order', () => {
    const html = draw({ groupBy: (preset) => preset.game, onCreate: () => {}, selectedId: 'a', onSelect: () => {} });
    expect(html).toContain('Presets · 3');
    expect(html).toContain('>New<');
    const headings = [...html.matchAll(/list-item-list__heading[^>]*>([^<]+)</g)].map((match) => match[1]);
    expect(headings).toEqual(['A Link to the Past', 'Timespinner']);
    expect(html.indexOf('Open, fast Ganon')).toBeLessThan(html.indexOf('Short run'));
    expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
  });

  it('shows rename and delete on the picked row, and on the other rows on hover', () => {
    const html = draw({ selectedId: 'a', onSelect: () => {}, onRename: () => {}, onDelete: () => {} });
    expect(html).toContain('aria-label="Rename Keysanity"');
    expect(html).toContain('aria-label="Delete Keysanity"');
    expect(html).toMatch(/list-item-row__action--hover.*aria-label="Rename Short run"/);
  });

  it('shows the filter from 8 items, or when asked', () => {
    const many = Array.from({ length: 8 }, (_, index) => ({ id: String(index), name: `Preset ${index}` }));
    expect(draw({ items: many })).toContain('placeholder="Filter presets"');
    expect(draw({})).not.toContain('placeholder="Filter presets"');
    expect(draw({ filter: true })).toContain('placeholder="Filter presets"');
    expect(draw({ items: many, filter: false })).not.toContain('placeholder="Filter presets"');
  });

  it('replaces the rows while loading, on an error and when empty', () => {
    expect(draw({ title: 'Servers', loading: true })).toMatch(/role="status".*Loading servers/);
    expect(draw({ error: 'Could not read servers.json' })).toMatch(/role="alert".*Could not read servers.json/);
    const empty = draw({ items: [], empty: 'Install a game first.' });
    expect(empty).toContain('Presets · 0');
    expect(empty).toContain('Install a game first.');
    expect(empty).not.toContain('role="list"');
  });

  it('groups in first seen order and matches every typed word', () => {
    expect(groupItems(PRESETS, (preset) => preset.game).map((group) => [group.name, group.items.length])).toEqual([
      ['A Link to the Past', 2], ['Timespinner', 1],
    ]);
    expect(groupItems([], undefined)).toEqual([]);
    expect(matchesText('Open, fast Ganon', 'fast open')).toBe(true);
    expect(matchesText('Open, fast Ganon', 'slow')).toBe(false);
  });
});

describe('ListDetail', () => {
  const md = (props) => renderToString(h(ListDetail, {
    list: base, selectedId: 'a', onSelect: () => {}, detail: h('p', null, 'The editor'), ...props,
  }));

  it('draws the list and the editor of the picked item, and no question until one is asked', () => {
    const html = md({ dirty: true });
    expect(html).toContain('Presets · 3');
    expect(html).toContain('The editor');
    expect(html).not.toContain('Unsaved changes');
    expect(html).not.toContain('role="alertdialog"');
  });

  it('asks the user to pick an item when none is picked', () => {
    expect(md({ selectedId: null })).toContain('Pick an item from the list.');
    expect(md({ selectedId: null, emptyDetail: 'Pick a preset.' })).toContain('Pick a preset.');
  });

  it('names the edited item and the next one in the question', () => {
    expect(guardMessage(TESSERA_STRINGS, base, 'a', { kind: 'select', id: 'b' })).toEqual({
      message: 'Keysanity has unsaved changes. Save them before you open Short run?', saveLabel: 'Save and open',
    });
    expect(guardMessage(TESSERA_STRINGS, base, 'a', { kind: 'back' })).toEqual({
      message: 'Keysanity has unsaved changes. Save them before you leave it?', saveLabel: 'Save and leave',
    });
  });
});
