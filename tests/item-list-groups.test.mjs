/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ItemList } from '../src/composites/ItemList';
import { groupItems } from '../src/composites/ItemList/behavior/group-items';

const PRESETS = [
  { id: 'a', name: 'Keysanity', game: 'A Link to the Past' },
  { id: 'b', name: 'Short run', game: 'Timespinner' },
  { id: 'c', name: 'Bottle hunt', game: 'Ocarina of Time' },
];

const GAMES = [
  { name: 'Timespinner' },
  { name: 'Super Metroid', empty: 'No preset for Super Metroid yet.', action: { label: 'New preset', onSelect: () => {} } },
  { name: 'A Link to the Past', action: { label: 'New preset', onSelect: () => {} } },
];

const base = {
  title: 'Presets',
  items: PRESETS,
  getId: (preset) => preset.id,
  getName: (preset) => preset.name,
  groupBy: (preset) => preset.game,
};

const draw = (props) => renderToString(h(ItemList, { ...base, ...props }));
const names = (groups) => groups.map((group) => [group.name, group.items.length]);

describe('ItemList groups', () => {
  it('orders the groups as listed, keeps the empty ones and puts the unlisted ones after, in first seen order', () => {
    expect(names(groupItems(PRESETS, base.groupBy, GAMES))).toEqual([
      ['Timespinner', 1], ['Super Metroid', 0], ['A Link to the Past', 1], ['Ocarina of Time', 1],
    ]);
    expect(groupItems([], base.groupBy, GAMES)[1]).toMatchObject({ name: 'Super Metroid', empty: 'No preset for Super Metroid yet.', items: [] });
  });

  it('hides the empty groups while the list is filtered', () => {
    expect(names(groupItems([PRESETS[1]], base.groupBy, GAMES, false))).toEqual([['Timespinner', 1]]);
  });

  it('draws an empty group as its heading, the empty line and the action button, and no row', () => {
    const html = draw({ groups: GAMES, selectedId: 'a', onSelect: () => {} });
    expect(html).toMatch(/class="item-list__group" role="group" aria-labelledby="([^"]+)"><[^>]*id="\1"[^>]*>Super Metroid</);
    expect(html).toContain('No preset for Super Metroid yet.');
    expect(html).toMatch(/<button[^>]*class="btn[^"]*"[^>]*><span class="btn__label">New preset<\/span><\/button>/);
    expect(html.match(/list-item-row__main/g)).toHaveLength(3);
    expect(html.match(/New preset/g)).toHaveLength(1);
    expect(html.indexOf('Timespinner')).toBeLessThan(html.indexOf('Super Metroid'));
    expect(html.indexOf('Super Metroid')).toBeLessThan(html.indexOf('Ocarina of Time'));
  });

  it('keeps the action of a group out of the rows, a plain Tab stop the arrows skip', () => {
    const html = draw({ items: [], groups: [{ name: 'Super Metroid', action: { label: 'New preset', onSelect: vi.fn() } }], onActivate: () => {} });
    expect(html).toContain('Nothing here yet.');
    expect(html).toMatch(/<button(?![^>]*tabindex)[^>]*><span class="btn__label">New preset/);
    expect(html).not.toContain('list-item-row__main');
  });

  it('draws the empty text of the list only when no group is listed', () => {
    expect(draw({ items: [], empty: 'Install a game first.' })).toContain('Install a game first.');
    expect(draw({ items: [], empty: 'Install a game first.', groups: GAMES })).not.toContain('Install a game first.');
  });
});

describe('ItemList anchors', () => {
  it('marks each row with data-item-id and the data of rowData, the id last so rowData cannot change it', () => {
    const html = draw({ onSelect: () => {}, rowData: (preset) => ({ 'data-game': preset.game, 'data-item-id': 'lost' }) });
    expect(html).toMatch(/role="listitem" data-game="Timespinner" data-item-id="b"/);
    expect(html).not.toContain('lost');
    expect(html.match(/data-item-id="/g)).toHaveLength(3);
  });

  it('marks the New button for a tour, item-list-new by default', () => {
    expect(draw({ onCreate: () => {} })).toMatch(/<button[^>]*data-tour="item-list-new"[^>]*>.*?New<\/span>/);
    expect(draw({ onCreate: () => {}, createTour: 'presets-new' })).toContain('data-tour="presets-new"');
  });
});
