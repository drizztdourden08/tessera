/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { newEntry } from '../src/composites/KeyValueEditor/behavior/new-entry';
import { rowsOf } from '../src/composites/KeyValueEditor/behavior/rows-of';
import { rowsProblem } from '../src/composites/KeyValueEditor/behavior/rows-problem';
import { TESSERA_STRINGS } from '../src/primitives/strings';

describe('K1 KeyValueEditor', { tags: ['critical'] }, () => {
  const row = (id, key, value = 1) => ({ id, key, value });

  it('finds empty names, names listed twice and names not on the list', () => {
    expect(rowsProblem([row('a', 'Bombs'), row('b', ' Bombs ')], undefined, TESSERA_STRINGS)).toEqual({ rows: new Set(['a', 'b']), message: 'Bombs is listed twice.' });
    expect(rowsProblem([row('a', '')], undefined, TESSERA_STRINGS).message).toBe('Every row needs a name.');
    expect(rowsProblem([row('a', 'Lamp')], ['Bombs'], TESSERA_STRINGS)).toEqual({ rows: new Set(['a']), message: 'Lamp is not on the list.' });
    expect(rowsProblem([row('a', 'Bombs')], ['Bombs'], TESSERA_STRINGS).message).toBeNull();
  });

  it('starts a new row at a value that fits its kind', () => {
    expect(newEntry({ value: {}, onChange: () => {} })).toBe(1);
    expect(newEntry({ value: {}, onChange: () => {}, valueKind: 'number', min: 3 })).toBe(3);
    expect(newEntry({ value: {}, onChange: () => {}, valueKind: 'select', options: ['eu', 'us'] })).toBe('eu');
    expect(newEntry({ value: {}, onChange: () => {}, valueKind: 'text' })).toBe('');
  });

  it('keeps the row of each name when the value comes back reordered, so a name being typed keeps its field', () => {
    const before = [{ id: 'a', key: 'region', value: 'eu' }, { id: 'b', key: 'mode', value: 'race' }];
    expect(rowsOf({ mode: 'race', region: 'eu' }, 'x', before).map((row) => row.id)).toEqual(['b', 'a']);
    expect(rowsOf({ server: 'eu', mode: 'race' }, 'x', before).map((row) => row.id)).toEqual(['a', 'b']);
    expect(rowsOf({ mode: 'coop', lang: 'fr', extra: 1 }, 'x', before).map((row) => row.id)).toEqual(['b', 'x-1', 'x-2']);
  });
});
