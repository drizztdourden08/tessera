/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { groupItems } from '../src/composites/ItemList/behavior/group-items';
import { matchesText } from '../src/data/text/matches-text';
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

describe('K1 ItemList', { tags: ['critical'] }, () => {
  it('groups in first seen order and matches every typed word', () => {
    expect(groupItems(PRESETS, (preset) => preset.game).map((group) => [group.name, group.items.length])).toEqual([
      ['A Link to the Past', 2], ['Timespinner', 1],
    ]);
    expect(groupItems([], undefined)).toEqual([]);
    expect(matchesText('Open, fast Ganon', 'fast open')).toBe(true);
    expect(matchesText('Open, fast Ganon', 'slow')).toBe(false);
  });
});

describe('K1 ListDetail', { tags: ['critical'] }, () => {
  it('names the edited item and the next one in the question', () => {
    expect(guardMessage(TESSERA_STRINGS, base, 'a', { kind: 'select', id: 'b' })).toEqual({
      message: 'Keysanity has unsaved changes. Save them before you open Short run?', saveLabel: 'Save and open',
    });
    expect(guardMessage(TESSERA_STRINGS, base, 'a', { kind: 'back' })).toEqual({
      message: 'Keysanity has unsaved changes. Save them before you leave it?', saveLabel: 'Save and leave',
    });
  });
});
