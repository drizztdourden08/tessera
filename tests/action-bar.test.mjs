/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { confirmOf } from '../src/composites/ActionBar/behavior/confirm-of';
import { menuGroups } from '../src/composites/ActionBar/behavior/menu-groups';
import { splitActions } from '../src/composites/ActionBar/behavior/split-actions';

const noop = () => {};
const ACTIONS = [
  { id: 'reset', label: 'Reset all', icon: 'rotate-ccw', onSelect: noop },
  { id: 'save', label: 'Save', kind: 'primary', onSelect: noop },
  { id: 'duplicate', label: 'Duplicate', onSelect: noop },
  { id: 'export', label: 'Export yaml', onSelect: noop },
  { id: 'delete', label: 'Delete', kind: 'danger', onSelect: noop },
];

const ids = (list) => list.map((action) => action.id);
const question = (label) => `${label}?`;
const labels = (groups) => groups.map((group) => group.items.map((item) => item.label));

describe('K1 ActionBar split', { tags: ['critical'] }, () => {
  it('keeps the primary out of the fold and folds from the end', () => {
    const split = splitActions(ACTIONS, Number.POSITIVE_INFINITY, 2);
    expect(ids(split.primary)).toEqual(['save']);
    expect(ids(split.shown)).toEqual(['reset', 'duplicate']);
    expect(ids(split.folded)).toEqual(['export', 'delete']);
  });

  it('shows no more than keep, even with room', () => {
    expect(ids(splitActions(ACTIONS, 1, Number.POSITIVE_INFINITY).shown)).toEqual(['reset']);
    expect(ids(splitActions(ACTIONS, 0, 9).folded)).toEqual(['reset', 'duplicate', 'export', 'delete']);
  });
});

describe('K1 ActionBar confirm', { tags: ['critical'] }, () => {
  it('asks before every danger action, with its label as the check', () => {
    expect(confirmOf(ACTIONS[4], question)).toEqual({ title: 'Delete?', confirmLabel: 'Delete' });
    expect(confirmOf(ACTIONS[0], question)).toBeUndefined();
  });

  it('takes the words of confirm, on any kind', () => {
    const words = { title: 'Reset every option?', confirmLabel: 'Reset all' };
    expect(confirmOf({ ...ACTIONS[0], confirm: words }, question)).toBe(words);
  });

  it('skips the ask with confirm false, and asks any action with confirm true', () => {
    expect(confirmOf({ ...ACTIONS[4], confirm: false }, question)).toBeUndefined();
    expect(confirmOf({ ...ACTIONS[0], confirm: true }, question)).toEqual({ title: 'Reset all?', confirmLabel: 'Reset all' });
  });

  it('asks with the name suffix, and keeps the label as the check', () => {
    expect(confirmOf({ ...ACTIONS[4], nameSuffix: 'Friday run' }, question)).toEqual({ title: 'Delete Friday run?', confirmLabel: 'Delete' });
  });

  it('puts danger actions in their own menu group, marked as asking', () => {
    const groups = menuGroups({ folded: ACTIONS.slice(2), asks: (action) => action.kind === 'danger', onPress: noop }, (label) => `${label}...`);
    expect(labels(groups)).toEqual([['Duplicate', 'Export yaml'], ['Delete...']]);
  });
});
