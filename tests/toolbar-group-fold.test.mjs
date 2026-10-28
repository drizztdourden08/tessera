/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { itemGroups } from '../src/composites/Toolbar/behavior/item-groups';
import { itemPriorities } from '../src/composites/Toolbar/behavior/item-priorities';
import { itemUnits } from '../src/composites/Toolbar/behavior/item-units';
import { splitItems } from '../src/composites/Toolbar/behavior/split-items';

const ignore = () => undefined;
const button = (id, extra = {}) => ({ kind: 'button', id, label: id, icon: 'pencil', onSelect: ignore, ...extra });
const separator = (id, extra = {}) => ({ kind: 'separator', id, label: id, ...extra });
const ids = (items) => items.map((item) => item.id);

const grouped = [
  separator('draw', { priority: 3 }), button('a'), button('b'), button('c'),
  separator('shapes', { priority: 2 }), button('d'), button('e'),
  separator('view', { priority: 1 }), button('f'), button('g'),
];

describe('groups on named separators', () => {
  it('gives each item the priority of the separator that opens its group', () => {
    expect(itemGroups(grouped)).toEqual([3, 3, 3, 3, 2, 2, 2, 1, 1, 1]);
    expect(itemPriorities(grouped)).toEqual([3, 3, 3, 3, 2, 2, 2, 1, 1, 1]);
  });

  it('ends a group at a separator without priority', () => {
    const list = [separator('x', { priority: 4 }), button('a'), separator('y'), button('b', { priority: 1 })];
    expect(itemGroups(list)).toEqual([4, 4, undefined, undefined]);
    expect(itemPriorities(list)).toEqual([4, 4, 4, 1]);
  });

  it('joins the items after a prioritised separator into one unit', () => {
    expect(itemUnits(grouped)).toEqual([[0, 1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });

  it('keeps every item its own unit when no separator has a priority', () => {
    const plain = [button('a'), separator('s'), button('b')];
    expect(itemUnits(plain)).toEqual([[0], [1], [2]]);
  });
});

describe('splitItems with group priority', () => {
  it('folds the lowest group first, whole, under its heading', () => {
    const { shown, folded } = splitItems(grouped, 7);
    expect(ids(shown)).toEqual(['draw', 'a', 'b', 'c', 'shapes', 'd', 'e']);
    expect(ids(folded)).toEqual(['view', 'f', 'g']);
  });

  it('never splits a group across the bar and More', () => {
    for (let fit = 0; fit < grouped.length; fit += 1) {
      const { shown, folded } = splitItems(grouped, fit);
      for (const group of [['a', 'b', 'c'], ['d', 'e'], ['f', 'g']]) {
        const inShown = group.filter((id) => ids(shown).includes(id)).length;
        expect(inShown === 0 || inShown === group.length, `fit ${fit}, group ${group.join('')}`).toBe(true);
        expect(ids(shown).length + ids(folded).length).toBeLessThanOrEqual(grouped.length);
      }
    }
  });

  it('folds a group that does not fit and everything of lower priority with it', () => {
    const { shown, folded } = splitItems(grouped, 5);
    expect(ids(shown)).toEqual(['draw', 'a', 'b', 'c']);
    expect(ids(folded)).toEqual(['shapes', 'd', 'e', 'view', 'f', 'g']);
  });

  it('lets a lower group stay above a higher one when the priorities say so', () => {
    const list = [separator('low', { priority: 0 }), button('a'), button('b'), separator('high', { priority: 5 }), button('c')];
    const { shown, folded } = splitItems(list, 2);
    expect(ids(shown)).toEqual(['high', 'c']);
    expect(ids(folded)).toEqual(['low', 'a', 'b']);
  });

  it('mixes a group with single items by priority', () => {
    const list = [button('x', { priority: 9 }), button('y', { priority: 2 }), separator('g', { priority: 1 }), button('a'), button('b')];
    const { shown } = splitItems(list, 3);
    expect(ids(shown)).toEqual(['x', 'y']);
  });

  it('shows everything when it all fits', () => {
    expect(splitItems(grouped, 99)).toEqual({ shown: grouped, folded: [] });
  });
});

describe('splitItems without group priority', () => {
  const plain = [button('a', { priority: 1 }), separator('s'), button('b'), button('c', { priority: 5 })];

  it('behaves as before: a named separator stays with the item before it', () => {
    const { shown, folded } = splitItems(plain, 3);
    expect(ids(shown)).toEqual(['a', 's', 'c']);
    expect(ids(folded)).toEqual(['b']);
  });
});
