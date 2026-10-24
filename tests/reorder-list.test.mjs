/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ReorderList } from '../src/composites/ReorderList';
import { doubleClickAction } from '../src/composites/ReorderList/behavior/double-click-action';
import { focusTarget } from '../src/composites/ReorderList/behavior/focus-target';
import { renameResult } from '../src/composites/ReorderList/behavior/rename-result';
import { rowKeyAction } from '../src/composites/ReorderList/behavior/row-key-action';
import { ReorderRename } from '../src/composites/ReorderList/sub-components/ReorderRename';
import { reorderStep } from '../src/composites/reorder/reorder-step';
import { nameEditKey } from '../src/primitives/field-control/name-edit-key';
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

describe('ReorderList media', () => {
  it('draws the media of an item in the media slot of its row and nowhere else', () => {
    const items = ITEMS.map((item, index) => (index === 0 ? { ...item, media: h('i', { className: 'thumb' }) } : item));
    const html = draw({ items, mediaWidth: 40 });
    expect(html.match(/list-item-row__media/g)).toHaveLength(1);
    expect(html).toContain('class="thumb"');
    expect(html).toContain('--list-item-media-w:40px');
  });

  it('leaves the slot out when no item has media', () => {
    expect(draw()).not.toContain('list-item-row__media');
  });
});

describe('ReorderList rename', () => {
  it('opens the rename box on the current name', () => {
    const html = renderToString(h(ReorderRename, { name: 'Outline', onEnd: ignore }));
    expect(html).toContain('value="Outline"');
  });

  it('keeps on Enter, cancels on Escape and ignores both while composing', () => {
    expect(nameEditKey('Enter', false)).toBe('keep');
    expect(nameEditKey('Escape', false)).toBe('undo');
    expect(nameEditKey('Enter', true)).toBeNull();
    expect(nameEditKey('a', false)).toBeNull();
  });

  it('reports a new name and reports nothing when the name did not change', () => {
    expect(renameResult('Outline', 'Ink')).toBe('Ink');
    expect(renameResult('Outline', 'Outline')).toBeNull();
  });

  it('starts on F2 only when onRename is set', () => {
    expect(rowKeyAction(keyEvent('F2'), { rename: true, activate: false })).toBe('rename');
    expect(rowKeyAction(keyEvent('F2'), { rename: false, activate: true })).toBeUndefined();
  });
});

describe('ReorderList activate', () => {
  it('fires on Enter only when onActivate is set', () => {
    expect(rowKeyAction(keyEvent('Enter'), { rename: true, activate: true })).toBe('activate');
    expect(rowKeyAction(keyEvent('Enter'), { rename: true, activate: false })).toBeUndefined();
  });

  it('ignores Enter and F2 with a modifier held', () => {
    expect(rowKeyAction(keyEvent('Enter', { altKey: true }), { rename: true, activate: true })).toBeUndefined();
    expect(rowKeyAction(keyEvent('F2', { ctrlKey: true }), { rename: true, activate: true })).toBeUndefined();
  });

  it('activates on a double-click of the row, and renames on the label only without onActivate', () => {
    const on = { main: true, label: true };
    expect(doubleClickAction(on, { rename: true, activate: true })).toBe('activate');
    expect(doubleClickAction({ main: true, label: false }, { rename: true, activate: true })).toBe('activate');
    expect(doubleClickAction(on, { rename: true, activate: false })).toBe('rename');
    expect(doubleClickAction({ main: true, label: false }, { rename: true, activate: false })).toBeUndefined();
    expect(doubleClickAction(on, { rename: false, activate: false })).toBeUndefined();
  });

  it('ignores a double-click on the grip or the toggles', () => {
    expect(doubleClickAction({ main: false, label: false }, { rename: true, activate: true })).toBeUndefined();
  });
});

describe('ReorderList keys do not fight', () => {
  const both = { rename: true, activate: true };
  const chord = { axis: 'vertical', chord: 'alt', index: 1, total: 3 };

  it('keeps Alt and the arrows for the move and gives them no row action', () => {
    expect(reorderStep(keyEvent('ArrowDown', { altKey: true }), chord)).toBe(2);
    expect(rowKeyAction(keyEvent('ArrowDown', { altKey: true }), both)).toBeUndefined();
    expect(rowKeyAction(keyEvent('ArrowUp'), both)).toBeUndefined();
  });

  it('gives F2 and Enter no focus move and no reorder step', () => {
    for (const key of ['F2', 'Enter']) {
      expect(focusTarget(keyEvent(key), 1, 3)).toBeUndefined();
      expect(reorderStep(keyEvent(key, { altKey: true }), chord)).toBeUndefined();
    }
  });
});
