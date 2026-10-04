/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { enterDialog } from '../src/composites/DialogShell/behavior/enter-dialog';
import { initialFocusOf } from '../src/composites/DialogShell/behavior/initial-focus-of';
import { isTopDialog } from '../src/composites/DialogShell/behavior/is-top-dialog';
import { restoreFocus } from '../src/composites/DialogShell/behavior/restore-focus';
import { tabTarget } from '../src/composites/DialogShell/behavior/tab-target';
import { tabbablesIn } from '../src/primitives/dom/tabbables-in';

const element = (name, extra = {}) => ({
  name, nodeType: 1, offsetHeight: 20, tabIndex: 0, tagName: 'BUTTON', isConnected: true,
  closest: (selector) => (selector === '.dialog__header' && extra.header ? {} : null),
  getClientRects: () => [{}],
  focus: vi.fn(),
  ...extra,
});

const dialogOf = (children) => element('dialog', {
  tabIndex: -1,
  querySelectorAll: () => children,
  contains: (node) => children.includes(node),
});

describe('Tab inside a dialog', () => {
  const stops = ['close', 'cancel', 'delete'];
  const step = (active, backwards = false, inside = true) => tabTarget({ stops, active, backwards, container: 'dialog', inside });

  it('wraps from the last stop to the first, and back with Shift', () => {
    expect(step('delete')).toBe('close');
    expect(step('close', true)).toBe('delete');
  });

  it('lets the browser move between the stops in the middle', () => {
    expect(step('close')).toBeNull();
    expect(step('cancel', true)).toBeNull();
  });

  it('brings focus back in from the dialog itself or from outside', () => {
    expect(step('dialog')).toBe('close');
    expect(step('dialog', true)).toBe('delete');
    expect(step('page', false, false)).toBe('close');
  });

  it('moves from a heading or other focus inside that is no stop to the stop beside it, or wraps', () => {
    const order = ['close', 'heading', 'cancel', 'delete'];
    const follows = (from) => (stop) => order.indexOf(stop) > order.indexOf(from);
    const loose = (backwards) => tabTarget({ stops, active: 'heading', backwards, container: 'dialog', inside: true, follows: follows('heading') });
    expect(loose(false)).toBe('cancel');
    expect(loose(true)).toBe('close');
    const first = tabTarget({ stops: ['cancel'], active: 'heading', backwards: true, container: 'dialog', inside: true, follows: follows('heading') });
    expect(first).toBe('cancel');
  });

  it('keeps focus on the dialog when it holds nothing to focus', () => {
    expect(tabTarget({ stops: [], active: 'dialog', backwards: false, container: 'dialog', inside: true })).toBe('dialog');
  });
});

describe('focus on open', () => {
  const close = element('close', { header: true });
  const cancel = element('cancel');
  const confirm = element('confirm');
  const dialog = dialogOf([close, cancel, confirm]);

  it('takes the ref when it can hold focus', () => {
    expect(initialFocusOf(dialog, { initialFocusRef: { current: confirm }, initialFocus: 'first' })).toBe(confirm);
  });

  it('skips the header close button for the first stop of the body', () => {
    expect(initialFocusOf(dialog, { initialFocus: 'first' })).toBe(cancel);
  });

  it('falls back from a disabled or missing ref, to the dialog itself when asked', () => {
    const disabled = element('create', { tabIndex: -1 });
    const field = element('field', { tagName: 'INPUT' });
    expect(initialFocusOf(dialogOf([close, field, disabled]), { initialFocusRef: { current: disabled }, initialFocus: 'first' })).toBe(field);
    const lone = dialogOf([close]);
    expect(initialFocusOf(lone, { initialFocusRef: { current: null }, initialFocus: 'dialog' })).toBe(lone);
    expect(initialFocusOf(lone, { initialFocus: 'first' })).toBe(lone);
  });

  it('starts on the heading of a screen, made focusable, before its first control', () => {
    const heading = element('heading', { tagName: 'H2', tabIndex: -1, attrs: {}, hasAttribute: () => false, setAttribute: vi.fn() });
    const screen = { ...dialogOf([cancel]), ownerDocument: { getElementById: (id) => (id === 'title' ? heading : null) }, contains: (node) => node === heading || node === cancel };
    expect(initialFocusOf(screen, { initialFocus: 'first', headingId: 'title' })).toBe(heading);
    expect(heading.setAttribute).toHaveBeenCalledWith('tabindex', '-1');
    expect(initialFocusOf(screen, { initialFocus: 'first', headingId: 'missing' })).toBe(cancel);
  });

  it('counts only the checked radio of a group as a stop', () => {
    const radio = (name, checked) => element(name, { tagName: 'INPUT', type: 'radio', name: 'size', checked });
    const small = radio('small', false);
    const large = radio('large', true);
    expect(tabbablesIn(dialogOf([small, large, confirm]))).toEqual([large, confirm]);
  });
});

describe('focus on close', () => {
  const docWith = (active) => ({ body: { name: 'body' }, activeElement: active });

  it('returns focus to the opener when focus was inside the dialog or lost', () => {
    const opener = element('opener');
    const inner = element('inner');
    restoreFocus(docWith(inner), dialogOf([inner]), opener);
    restoreFocus(docWith(null), dialogOf([]), opener);
    expect(opener.focus).toHaveBeenCalledTimes(2);
  });

  it('leaves focus where the app moved it, and skips an opener that is gone', () => {
    const opener = element('opener');
    restoreFocus(docWith(element('row')), dialogOf([]), opener);
    const gone = element('gone', { isConnected: false });
    restoreFocus(docWith(null), dialogOf([]), gone);
    expect(opener.focus).not.toHaveBeenCalled();
    expect(gone.focus).not.toHaveBeenCalled();
  });
});

describe('dialogs over dialogs', () => {
  it('treats only the dialog opened last as the top one', () => {
    const doc = {};
    const wizard = element('wizard');
    const guard = element('guard');
    enterDialog(doc, wizard);
    const leaveGuard = enterDialog(doc, guard);
    expect(isTopDialog(doc, guard)).toBe(true);
    expect(isTopDialog(doc, wizard)).toBe(false);
    leaveGuard();
    expect(isTopDialog(doc, wizard)).toBe(true);
  });
});
