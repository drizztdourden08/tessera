/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LogPanel } from '../src/composites/LogPanel';
import { clickSelection } from '../src/composites/LogPanel/behavior/click-selection';
import { stepSelection } from '../src/composites/LogPanel/behavior/step-selection';

const ORDER = ['a', 'b', 'c', 'd', 'e'];
const ids = (move) => [...move.ids];
const PLAIN = { shift: false, toggle: false };
const SHIFT = { shift: true, toggle: false };

describe('LogPanel row clicks', () => {
  it('picks one row on a click, and the rows between on a click with Shift', () => {
    const one = clickSelection({ order: ORDER, selected: new Set(), anchor: null, id: 'b', keys: PLAIN });
    expect(ids(one)).toEqual(['b']);
    const range = clickSelection({ order: ORDER, selected: one.ids, anchor: one.anchor, id: 'd', keys: SHIFT });
    expect(ids(range)).toEqual(['b', 'c', 'd']);
    expect(range.anchor).toBe('b');
    expect(ids(clickSelection({ order: ORDER, selected: range.ids, anchor: range.anchor, id: 'a', keys: SHIFT }))).toEqual(['a', 'b']);
  });

  it('adds or drops one row with Ctrl, and adds a range to the pick with Ctrl and Shift', () => {
    const added = clickSelection({ order: ORDER, selected: new Set(['a']), anchor: 'a', id: 'c', keys: { shift: false, toggle: true } });
    expect(ids(added)).toEqual(['a', 'c']);
    expect(ids(clickSelection({ order: ORDER, selected: added.ids, anchor: 'c', id: 'c', keys: { shift: false, toggle: true } }))).toEqual(['a']);
    expect(ids(clickSelection({ order: ORDER, selected: new Set(['a']), anchor: 'c', id: 'e', keys: { shift: true, toggle: true } }))).toEqual(['a', 'c', 'd', 'e']);
  });
});

describe('LogPanel row keys', () => {
  const step = (cursor, anchor, by, extend) => stepSelection({ order: ORDER, mounted: ORDER, cursor, anchor, by, extend });

  it('starts at the newest mounted row, then moves one row at a time and stops at each end', () => {
    expect(ids(step(null, null, -1, false))).toEqual(['e']);
    expect(ids(step('c', 'c', -1, false))).toEqual(['b']);
    expect(ids(step('c', 'c', 1, false))).toEqual(['d']);
    expect(ids(step('a', 'a', -1, false))).toEqual(['a']);
    expect(ids(step('e', 'e', 1, false))).toEqual(['e']);
    expect(stepSelection({ order: ORDER, mounted: [], cursor: null, anchor: null, by: 1, extend: false })).toBeNull();
  });

  it('extends from the anchor with Shift, over rows that are filtered in but not mounted', () => {
    const up = step('c', 'c', -1, true);
    expect(ids(up)).toEqual(['b', 'c']);
    expect(up.anchor).toBe('c');
    expect(ids(step('b', 'c', -1, true))).toEqual(['a', 'b', 'c']);
    const late = stepSelection({ order: ORDER, mounted: ['c', 'd', 'e'], cursor: 'd', anchor: 'a', by: 1, extend: true });
    expect(ids(late)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});

const ROWS = ORDER.map((id) => ({ id, gutter: '12:00:00', tag: 'INFO', kind: 'info', message: `line ${id}` }));

describe('LogPanel selection markup', () => {
  it('keeps one focusable log region when the app holds no selection', () => {
    const html = renderToString(h(LogPanel, { rows: ROWS, toolbar: false }));
    expect(html).toMatch(/role="log" tabindex="0"/);
    expect(html).not.toContain('role="listbox"');
    expect(html).not.toContain('log-panel__row--');
  });

  it('draws the rows as options of a listbox, the picked ones selected, with the newest row as the tab stop', () => {
    const html = renderToString(h(LogPanel, { rows: ROWS, toolbar: false, selectedIds: new Set(['b', 'c']), onSelectionChange: () => undefined }));
    expect(html).not.toMatch(/role="log" tabindex/);
    expect(html).toContain('role="listbox" aria-multiselectable="true" aria-label="Log lines"');
    expect(html.match(/aria-selected="true"/g)).toHaveLength(2);
    expect(html.match(/log-panel__row--selected/g)).toHaveLength(2);
    expect(html.match(/tabindex="0"/g)).toHaveLength(1);
    const options = html.split('role="option"').slice(1);
    expect(options).toHaveLength(5);
    expect(options[4]).toMatch(/^ aria-selected="false" tabindex="0"/);
    expect(options[4]).toContain('line e');
    expect(html.match(/data-review-mask/g)).toHaveLength(5);
  });
});
