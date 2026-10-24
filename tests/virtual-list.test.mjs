/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { renderedIndices } from '../src/composites/virtual/rendered-indices';
import { scrollTopToShow } from '../src/composites/virtual/scroll-top-to-show';
import { visibleRange } from '../src/composites/virtual/visible-range';
import { nextIndex } from '../src/composites/VirtualList/behavior/next-index';
import { VirtualList } from '../src/composites/VirtualList';

const ITEMS = Array.from({ length: 5000 }, (_, at) => ({ id: `item-${at}`, text: `Item ${at}` }));

const draw = (extra) => renderToString(h(VirtualList, {
  label: 'Items', items: ITEMS, getKey: (item) => item.id, renderItem: (item) => item.text, ...extra,
}));

describe('the windowing math', () => {
  it('draws the rows in view and the overscan on each side', () => {
    expect(visibleRange({ scrollTop: 400, viewport: 200, rowHeight: 40, count: 1000, overscan: 2 })).toEqual({ start: 8, end: 17 });
  });

  it('stays inside the list at both ends', () => {
    expect(visibleRange({ scrollTop: 0, viewport: 200, rowHeight: 40, count: 3, overscan: 10 })).toEqual({ start: 0, end: 3 });
    expect(visibleRange({ scrollTop: 9999, viewport: 200, rowHeight: 40, count: 10, overscan: 1 })).toEqual({ start: 10, end: 10 });
  });

  it('keeps a pinned row outside the window, before or after it', () => {
    expect(renderedIndices({ start: 5, end: 8 }, 1)).toEqual([1, 5, 6, 7]);
    expect(renderedIndices({ start: 5, end: 8 }, 20)).toEqual([5, 6, 7, 20]);
    expect(renderedIndices({ start: 5, end: 8 }, 6)).toEqual([5, 6, 7]);
    expect(renderedIndices({ start: 5, end: 8 }, -1)).toEqual([5, 6, 7]);
  });

  it('finds the scroll position that brings a row into view', () => {
    const base = { rowHeight: 40, viewport: 200 };
    expect(scrollTopToShow({ ...base, index: 2, scrollTop: 0 })).toBe(0);
    expect(scrollTopToShow({ ...base, index: 10, scrollTop: 0 })).toBe(240);
    expect(scrollTopToShow({ ...base, index: 1, scrollTop: 300 })).toBe(40);
  });
});

describe('the keys of VirtualList', () => {
  it('moves by a row, a page, to the start and to the end, and stops at both ends', () => {
    expect(nextIndex('ArrowDown', 3, 100, 8)).toBe(4);
    expect(nextIndex('ArrowUp', 0, 100, 8)).toBe(0);
    expect(nextIndex('PageDown', 95, 100, 8)).toBe(99);
    expect(nextIndex('PageUp', 3, 100, 8)).toBe(0);
    expect(nextIndex('Home', 50, 100, 8)).toBe(0);
    expect(nextIndex('End', 50, 100, 8)).toBe(99);
  });

  it('ignores other keys and an empty list', () => {
    expect(nextIndex('a', 3, 100, 8)).toBeUndefined();
    expect(nextIndex('ArrowDown', 0, 0, 8)).toBeUndefined();
  });
});

describe('VirtualList on the server', () => {
  it('draws only the first screen of 5000 items, without a window or a document', () => {
    const html = draw();
    const rows = (html.match(/role="listitem"/g) ?? []).length;
    expect(rows).toBeGreaterThan(10);
    expect(rows).toBeLessThan(60);
    expect(html).toContain('aria-label="Items"');
    expect(html).toContain('aria-setsize="5000"');
    expect(html).toContain('aria-posinset="1"');
    expect(html).not.toContain('Item 4999');
  });

  it('puts one row in the tab order', () => {
    const html = draw();
    expect((html.match(/tabindex="0"/g) ?? []).length).toBe(1);
  });

  it('draws an empty list as a list with no row', () => {
    const html = draw({ items: [] });
    expect(html).toContain('role="list"');
    expect(html).not.toContain('role="listitem"');
  });
});
