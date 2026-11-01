/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { buildSchema, createClause, toSchemaIndex } from '../src/data';
import { clauseFromToken } from '../src/composites/FilterBar/behavior/clause-from-token';
import { overflowItems } from '../src/composites/FilterBar/behavior/overflow-items';
import { splitChips } from '../src/composites/FilterBar/behavior/split-chips';
import { takeTokens } from '../src/composites/FilterBar/behavior/take-tokens';
import { FILTER_STRINGS } from '../src/primitives/strings/filters-strings.constants';

const ROWS = [{ name: 'Sam', status: 'playing', checked: 12, deathLink: true, kind: 'sprite' }];
const SCHEMA = buildSchema(ROWS, { kinds: { name: 'string' }, options: { status: ['playing', 'idle', 'goal'] }, labels: { checked: 'Checks' } });
const INDEX = toSchemaIndex(SCHEMA);

describe('K1 FilterBar +N overflow', { tags: ['critical'] }, () => {
  const clauses = [
    createClause('name', 'contains', 'S'),
    createClause('status', 'anyOf', ['playing']),
    createClause('checked', 'gte', 5),
  ];

  it('keeps every chip when there is no limit or the limit is not passed', () => {
    expect(splitChips(clauses, undefined)).toEqual({ shown: clauses, folded: [] });
    expect(splitChips(clauses, 3)).toEqual({ shown: clauses, folded: [] });
    expect(splitChips(clauses, 9).folded).toHaveLength(0);
  });

  it('folds the chips past the limit, in order', () => {
    const { shown, folded } = splitChips(clauses, 1);
    expect(shown).toEqual([clauses[0]]);
    expect(folded).toEqual([clauses[1], clauses[2]]);
    expect(splitChips(clauses, 0).shown).toHaveLength(0);
  });

  it('lists a folded chip by field and value, and removes it on select', () => {
    const removed = [];
    const items = overflowItems({ folded: clauses.slice(1), index: INDEX, strings: FILTER_STRINGS, onRemove: (id) => removed.push(id) });
    expect(items.map((item) => item.label)).toEqual(['Status: playing', 'Checks: 5']);
    expect(items[0].description).toBe('Remove filter on Status');
    items[0].onSelect();
    expect(removed).toEqual([clauses[1].id]);
  });
});

describe('K1 FilterBar key:value tokens', { tags: ['critical'] }, () => {
  it('reads a string, number, boolean and enum token by field name or label', () => {
    expect(clauseFromToken(INDEX, 'name:sam')).toMatchObject({ path: 'name', op: 'contains', value: 'sam' });
    expect(clauseFromToken(INDEX, 'checks:12')).toMatchObject({ path: 'checked', op: 'eq', value: 12 });
    expect(clauseFromToken(INDEX, 'deathLink:yes')).toMatchObject({ path: 'deathLink', op: 'isTrue' });
    expect(clauseFromToken(INDEX, 'deathLink:no')).toMatchObject({ op: 'isFalse' });
    expect(clauseFromToken(INDEX, 'Status:Playing')).toMatchObject({ path: 'status', op: 'anyOf', value: ['playing'] });
  });

  it('turns away an unknown key, a bad value, an empty side and a value outside a closed list', () => {
    expect(clauseFromToken(INDEX, 'nothing:1')).toBeNull();
    expect(clauseFromToken(INDEX, 'checks:many')).toBeNull();
    expect(clauseFromToken(INDEX, 'deathLink:maybe')).toBeNull();
    expect(clauseFromToken(INDEX, 'name:')).toBeNull();
    expect(clauseFromToken(INDEX, ':sam')).toBeNull();
    expect(clauseFromToken(INDEX, 'status:lost')).toBeNull();
  });

  it('takes the finished tokens out of the search and leaves the rest', () => {
    const parse = (token) => clauseFromToken(INDEX, token);
    const taken = takeTokens('hello status:playing world checks:3 ', parse);
    expect(taken.rest).toBe('hello world ');
    expect(taken.clauses.map((clause) => clause.path)).toEqual(['status', 'checked']);
  });

  it('waits for a space before it takes the last word', () => {
    const parse = (token) => clauseFromToken(INDEX, token);
    expect(takeTokens('status:playing', parse)).toEqual({ rest: 'status:playing', clauses: [] });
    expect(takeTokens('status:playing ', parse).clauses).toHaveLength(1);
  });

  it('keeps a word with a colon that is no token', () => {
    const parse = (token) => clauseFromToken(INDEX, token);
    expect(takeTokens('http://x.dev ', parse)).toEqual({ rest: 'http://x.dev ', clauses: [] });
  });

  it('takes a parser of your own', () => {
    const own = (token) => (token === 'mine:1' ? createClause('name', 'eq', 'Sam') : null);
    expect(takeTokens('mine:1 other:2 ', own).clauses).toHaveLength(1);
  });
});
