/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Toolbar } from '../src/composites/Toolbar';
import { contextHandler } from '../src/composites/Toolbar/behavior/context-handler';
import { fitColumns } from '../src/composites/Toolbar/behavior/fit-columns';
import { isContextKey } from '../src/composites/Toolbar/behavior/is-context-key';
import { keyWithContext } from '../src/composites/Toolbar/behavior/key-with-context';
import { splitItems } from '../src/composites/Toolbar/behavior/split-items';
import { visibleItems } from '../src/composites/Toolbar/behavior/visible-items';
import { tagFit } from '../src/primitives/listbox/tag-fit';

const ignore = () => undefined;
const button = (id, extra = {}) => ({ kind: 'button', id, label: id, icon: 'pencil', onSelect: ignore, ...extra });
const separator = (id) => ({ kind: 'separator', id });
const ids = (items) => items.map((item) => item.id);
const cells = (...sizes) => sizes.map((size) => ({ size, span: false }));

describe('splitItems with priority', () => {
  const items = [button('a', { priority: 1 }), button('b'), button('c', { priority: 2 }), button('d')];

  it('folds the lowest priority first and keeps the order of what is shown', () => {
    const { shown, folded } = splitItems(items, 2);
    expect(ids(shown)).toEqual(['a', 'c']);
    expect(ids(folded)).toEqual(['b', 'd']);
  });

  it('folds the later item first when priorities are equal', () => {
    const { shown, folded } = splitItems([button('a'), button('b'), button('c')], 2);
    expect(ids(shown)).toEqual(['a', 'b']);
    expect(ids(folded)).toEqual(['c']);
  });

  it('treats a missing priority as zero and a negative one as lower', () => {
    const { folded } = splitItems([button('a', { priority: -1 }), button('b'), button('c')], 2);
    expect(ids(folded)).toEqual(['a']);
  });

  it('keeps a separator with the item before it and trims the ones left at the ends', () => {
    const list = [button('a', { priority: 5 }), separator('s'), button('b'), button('c', { priority: 5 })];
    const { shown, folded } = splitItems(list, 3);
    expect(ids(shown)).toEqual(['a', 's', 'c']);
    expect(ids(folded)).toEqual(['b']);
    const small = splitItems(list, 1);
    expect(ids(small.shown)).toEqual(['a']);
    expect(ids(small.folded)).toEqual(['b', 'c']);
  });

  it('shows everything when it all fits and everything folds when nothing does', () => {
    expect(splitItems(items, 9).folded).toEqual([]);
    expect(splitItems(items, 0).shown).toEqual([]);
  });
});

describe('visibleItems', () => {
  const items = [button('a'), separator('s1'), button('b'), separator('s2'), button('c')];

  it('returns the same list when nothing is hidden', () => {
    expect(visibleItems(items, undefined)).toBe(items);
    expect(visibleItems(items, [])).toBe(items);
    expect(visibleItems(items, ['gone'])).toBe(items);
  });

  it('drops the hidden ids and the separators left dangling', () => {
    expect(ids(visibleItems(items, ['b']))).toEqual(['a', 's1', 'c']);
    expect(ids(visibleItems(items, ['a']))).toEqual(['b', 's2', 'c']);
    expect(ids(visibleItems(items, ['c']))).toEqual(['a', 's1', 'b']);
  });

  it('can hide a separator by id and everything at once', () => {
    expect(ids(visibleItems(items, ['s1', 's2']))).toEqual(['a', 'b', 'c']);
    expect(visibleItems(items, ['a', 'b', 'c'])).toEqual([]);
  });
});

const fit = (list, room, columns) => fitColumns(list, 28, { gap: 4, room, columns });

describe('fitColumns', () => {
  it('matches tagFit in one column', () => {
    const sizes = [28, 28, 28, 28, 28];
    for (const room of [0, 30, 70, 100, 150, 200]) {
      expect(fit(cells(...sizes), room, 1)).toBe(tagFit(sizes, 28, 4, room));
    }
  });

  it('holds twice the items in two columns', () => {
    expect(fit(cells(28, 28, 28, 28, 28, 28), 60, 2)).toBe(3);
    expect(fit(cells(28, 28, 28, 28, 28, 28), 92, 2)).toBe(6);
  });

  it('keeps room for More before it folds', () => {
    expect(fit(cells(28, 28, 28, 28, 28, 28, 28), 92, 2)).toBe(5);
  });

  it('lets a separator take a row of its own', () => {
    const list = [...cells(28, 28), { size: 2, span: true }, ...cells(28, 28)];
    expect(fit(list, 66, 2)).toBe(5);
    expect(fit(list, 65, 2)).toBe(2);
  });

  it('returns zero when not even More fits', () => {
    expect(fit(cells(28, 28), 10, 2)).toBe(0);
  });
});

describe('context menu', () => {
  const event = () => ({ preventDefault: vi.fn(), key: 'x', shiftKey: false });

  it('knows Shift+F10 and the Menu key', () => {
    expect(isContextKey({ key: 'F10', shiftKey: true })).toBe(true);
    expect(isContextKey({ key: 'F10', shiftKey: false })).toBe(false);
    expect(isContextKey({ key: 'ContextMenu', shiftKey: false })).toBe(true);
    expect(isContextKey({ key: 'Enter', shiftKey: true })).toBe(false);
  });

  it('has no handler without a callback, and none for a separator', () => {
    expect(contextHandler(button('a'), undefined)).toBeUndefined();
    expect(contextHandler(separator('s'), vi.fn())).toBeUndefined();
  });

  it('calls the item first and the toolbar with the id, after stopping the browser menu', () => {
    const calls = [];
    const own = vi.fn(() => calls.push('item'));
    const all = vi.fn(() => calls.push('toolbar'));
    const ev = event();
    contextHandler(button('pencil', { onContextMenu: own }), all)(ev);
    expect(ev.preventDefault).toHaveBeenCalledOnce();
    expect(calls).toEqual(['item', 'toolbar']);
    expect(all).toHaveBeenCalledWith('pencil', ev);
    expect(own).toHaveBeenCalledWith(ev);
  });

  it('works with only one of the two callbacks', () => {
    const all = vi.fn();
    contextHandler(button('a'), all)(event());
    expect(all).toHaveBeenCalledOnce();
    const own = vi.fn();
    contextHandler(button('a', { onContextMenu: own }), undefined)(event());
    expect(own).toHaveBeenCalledOnce();
  });

  it('turns Shift+F10 into the callback and leaves other keys to the tool', () => {
    const keys = vi.fn();
    const context = vi.fn();
    const handler = keyWithContext(keys, context);
    handler({ key: 'F10', shiftKey: true });
    handler({ key: 'ArrowRight', shiftKey: false });
    expect(context).toHaveBeenCalledOnce();
    expect(keys).toHaveBeenCalledOnce();
    expect(keyWithContext(keys, undefined)).toBe(keys);
  });
});

describe('Toolbar with the new options', () => {
  const draw = (props) => renderToString(h(Toolbar, { label: 'Tools', items: [button('a'), button('b'), button('c')], ...props }));
  const stops = (html) => [...html.replace(/<div class="toolbar__measure".*$/, '').matchAll(/data-toolbar-stop="([^"]*)"/g)].map((match) => match[1]);

  it('draws every item by default', () => {
    expect(stops(draw())).toEqual(['a', 'b', 'c']);
  });

  it('leaves out the hidden items in a bar and in a list', () => {
    expect(stops(draw({ hiddenItems: ['b'] }))).toEqual(['a', 'c']);
    expect(stops(draw({ hiddenItems: ['a'], layout: 'list' }))).toEqual(['b', 'c']);
  });

  it('draws with columns and a context callback without changing the tab stops', () => {
    const html = draw({ orientation: 'vertical', columns: 'auto', onContextMenu: ignore });
    expect(stops(html)).toEqual(['a', 'b', 'c']);
    expect(html).not.toContain('data-columns');
  });
});
