/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
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

const names = (groups) => groups.map((group) => [group.name, group.items.length]);

describe('K1 ItemList groups', { tags: ['critical'] }, () => {
  it('orders the groups as listed, keeps the empty ones and puts the unlisted ones after, in first seen order', () => {
    expect(names(groupItems(PRESETS, base.groupBy, GAMES))).toEqual([
      ['Timespinner', 1], ['Super Metroid', 0], ['A Link to the Past', 1], ['Ocarina of Time', 1],
    ]);
    expect(groupItems([], base.groupBy, GAMES)[1]).toMatchObject({ name: 'Super Metroid', empty: 'No preset for Super Metroid yet.', items: [] });
  });

  it('hides the empty groups while the list is filtered', () => {
    expect(names(groupItems([PRESETS[1]], base.groupBy, GAMES, false))).toEqual([['Timespinner', 1]]);
  });
});
