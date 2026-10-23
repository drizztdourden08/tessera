/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ReorderList } from '../src/composites/ReorderList';
import { focusTarget } from '../src/composites/ReorderList/behavior/focus-target';
import { tabbableId } from '../src/composites/ReorderList/behavior/tabbable-id';

const ignore = () => undefined;
const TOGGLES = [
  { id: 'visible', label: 'Visible', iconOn: 'eye', iconOff: 'eye-off' },
  { id: 'locked', label: 'Locked', iconOn: 'lock', iconOff: 'lock-open' },
];
const ITEMS = [
  { id: 'top', label: 'Highlights', icon: 'sparkles', toggles: { visible: true, locked: false } },
  { id: 'mid', label: 'Outline', icon: 'pencil', toggles: { visible: false, locked: true } },
  { id: 'low', label: 'Background', icon: 'image' },
];

const draw = (props) => renderToString(h(ReorderList, {
  label: 'Layers', items: ITEMS, toggles: TOGGLES, onMove: ignore, onToggle: ignore, onSelect: ignore, ...props,
}));

const keyEvent = (key, held = {}) => ({ key, altKey: false, ctrlKey: false, metaKey: false, ...held });

describe('ReorderList', () => {
  it('draws a named list with one indexed item per entry', () => {
    const html = draw();
    expect(html).toMatch(/<ul[^>]*aria-label="Layers"/);
    expect(html.match(/data-reorder-index="\d"/g)).toHaveLength(3);
    expect(html).toContain('data-reorder-key="mid"');
    expect(html).toContain('Highlights');
    expect(html).toContain('Background');
  });

  it('names the chord on the list and describes it for screen readers', () => {
    const html = draw();
    expect(html).toContain('aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown"');
    expect(html).toContain('Alt and Up or Down moves the row');
    expect(html).toContain('aria-live="polite"');
  });

  it('draws each toggle as an icon button named by its label with aria-pressed from the item', () => {
    const html = draw();
    expect(html.match(/<button[^>]*aria-label="Visible"[^>]*>/g)).toHaveLength(3);
    expect(html.match(/<button[^>]*aria-label="Locked"[^>]*>/g)).toHaveLength(3);
    const visible = html.match(/<button[^>]*aria-label="Visible"[^>]*>/g) ?? [];
    expect(visible.map((tag) => /aria-pressed="(true|false)"/.exec(tag)?.[1])).toEqual(['true', 'false', 'false']);
    const locked = html.match(/<button[^>]*aria-label="Locked"[^>]*>/g) ?? [];
    expect(locked.map((tag) => /aria-pressed="(true|false)"/.exec(tag)?.[1])).toEqual(['false', 'true', 'false']);
  });

  it('groups the toggles of a row under the name of the item', () => {
    const html = draw();
    expect(html).toMatch(/<div[^>]*role="group"[^>]*aria-label="Outline"|<div[^>]*aria-label="Outline"[^>]*role="group"/);
    expect(html.match(/data-reorder-toggles/g)).toHaveLength(3);
  });

  it('leaves the toggles out when the list has none', () => {
    const html = draw({ toggles: undefined });
    expect(html).not.toContain('data-reorder-toggles');
    expect(html).not.toContain('aria-label="Visible"');
  });

  it('marks the selected row and keeps one tab stop on it', () => {
    const html = draw({ selectedId: 'mid' });
    const mains = html.match(/<button[^>]*list-item-row__main[^>]*>/g) ?? [];
    expect(mains).toHaveLength(3);
    expect(mains.map((tag) => /aria-pressed="(true|false)"/.exec(tag)?.[1])).toEqual(['false', 'true', 'false']);
    expect(mains.map((tag) => /tabindex="(-?\d)"/.exec(tag)?.[1])).toEqual(['-1', '0', '-1']);
  });

  it('puts the tab stop on the first row when nothing is selected', () => {
    const mains = draw().match(/<button[^>]*list-item-row__main[^>]*>/g) ?? [];
    expect(mains.map((tag) => /tabindex="(-?\d)"/.exec(tag)?.[1])).toEqual(['0', '-1', '-1']);
  });

  it('hides the grip from screen readers', () => {
    expect(draw().match(/reorder-list__grip"[^>]*aria-hidden="true"|aria-hidden="true"[^>]*reorder-list__grip/g)).toHaveLength(3);
  });

  it('shows the empty message when there are no items', () => {
    const html = draw({ items: [], empty: 'No layers yet.' });
    expect(html).toContain('No layers yet.');
    expect(html).not.toContain('<ul');
  });
});

describe('ReorderList focus', () => {
  it('moves focus on the plain arrows and to the ends on Home and End', () => {
    expect(focusTarget(keyEvent('ArrowDown'), 0, 3)).toBe(1);
    expect(focusTarget(keyEvent('ArrowUp'), 0, 3)).toBeUndefined();
    expect(focusTarget(keyEvent('Home'), 2, 3)).toBe(0);
    expect(focusTarget(keyEvent('End'), 0, 3)).toBe(2);
  });

  it('leaves the Alt chord to the move', () => {
    expect(focusTarget(keyEvent('ArrowDown', { altKey: true }), 0, 3)).toBeUndefined();
    expect(focusTarget(keyEvent('Home', { altKey: true }), 2, 3)).toBeUndefined();
  });

  it('picks the focused row, then the selected one, then the first for the tab stop', () => {
    expect(tabbableId(ITEMS, 'low', 'mid')).toBe('low');
    expect(tabbableId(ITEMS, null, 'mid')).toBe('mid');
    expect(tabbableId(ITEMS, 'gone', 'gone')).toBe('top');
    expect(tabbableId([], null, undefined)).toBeUndefined();
  });
});
