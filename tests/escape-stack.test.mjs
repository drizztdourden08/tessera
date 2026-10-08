/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useDialogEscape } from '../src/composites/DialogShell/behavior/useDialogEscape';
import { keyFromInside } from '../src/composites/ScreenLayer/behavior/key-from-inside';
import { useDismissListeners } from '../src/primitives/Portal/behavior/useDismissListeners';
import { escapeStackOf } from '../src/primitives/escape-stack/escape-stack-of';
import { pushEscape } from '../src/primitives/escape-stack/push-escape';
import { useEscapeLayer } from '../src/primitives/escape-stack/useEscapeLayer';
import { useEscapeStack } from '../src/primitives/escape-stack/useEscapeStack';
import { escapeDocument } from './escape-document.mjs';
import { mountHook } from './hook-harness.mjs';

const page = escapeDocument();

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => page }));

const ORDERS = [
  ['screen', 'dialog', 'menu'],
  ['menu', 'dialog', 'screen'],
  ['dialog', 'menu', 'screen'],
];

const opener = (doc, closed) => (level) => [level, pushEscape(doc, level, () => closed.push(level))];

describe('one press of Escape closes one thing, the innermost', () => {
  it.each(ORDERS)('a menu in a dialog in a screen, opened in the order %s, %s, %s', (...order) => {
    const doc = escapeDocument();
    const closed = [];
    const leaves = Object.fromEntries(order.map(opener(doc, closed)));
    const first = doc.press('Escape');
    expect(closed).toEqual(['menu']);
    expect(first.defaultPrevented).toBe(true);
    expect(first.stopped).toBe(true);
    leaves.menu();
    doc.press('Escape');
    leaves.dialog();
    doc.press('Escape');
    expect(closed).toEqual(['menu', 'dialog', 'screen']);
    leaves.screen();
    expect(doc.count()).toBe(0);
  });

  it('takes the later of two surfaces on one level, such as a dialog over a dialog', () => {
    const doc = escapeDocument();
    const lower = vi.fn();
    const upper = vi.fn();
    pushEscape(doc, 'dialog', lower);
    pushEscape(doc, 'dialog', upper);
    doc.press('Escape');
    expect(upper).toHaveBeenCalledOnce();
    expect(lower).not.toHaveBeenCalled();
  });

  it('ends a live drag before the popover it started over', () => {
    const doc = escapeDocument();
    const drag = vi.fn();
    const popover = vi.fn();
    pushEscape(doc, 'drag', drag);
    pushEscape(doc, 'popover', popover);
    doc.press('Escape');
    expect(drag).toHaveBeenCalledOnce();
    expect(popover).not.toHaveBeenCalled();
  });

});

describe('what the Escape stack leaves alone', () => {
  it('leaves a key an inner editor already handled, and every other key', () => {
    const doc = escapeDocument();
    const dialog = vi.fn();
    pushEscape(doc, 'dialog', dialog);
    expect(doc.press('Escape', true).stopped).toBe(false);
    expect(doc.press('Enter').stopped).toBe(false);
    expect(dialog).not.toHaveBeenCalled();
  });

  it('keeps the key from the screen under a dialog that takes no Escape', () => {
    const doc = escapeDocument();
    const screen = vi.fn();
    pushEscape(doc, 'screen', screen);
    pushEscape(doc, 'dialog', () => undefined);
    doc.press('Escape');
    expect(screen).not.toHaveBeenCalled();
  });

  it('binds one listener while anything is open and none once all have closed', () => {
    const doc = escapeDocument();
    const leaves = [pushEscape(doc, 'screen', vi.fn()), pushEscape(doc, 'popover', vi.fn())];
    expect(doc.count()).toBe(1);
    expect(escapeStackOf(doc).depth()).toBe(2);
    expect(escapeStackOf(doc).top()).toBe('popover');
    leaves.forEach((leave) => leave());
    leaves[0]();
    expect(doc.count()).toBe(0);
    expect(escapeStackOf(doc).depth()).toBe(0);
    expect(escapeStackOf(doc).top()).toBeNull();
    expect(escapeStackOf(undefined).depth()).toBe(0);
  });
});

const node = (doc, inside = []) => ({ nodeType: 1, ownerDocument: doc, contains: (target) => inside.includes(target) });

describe('the parts on the stack', () => {
  it('ScreenLayer, DialogShell and a menu close one by one, innermost first', () => {
    const doc = escapeDocument();
    const open = { screen: true, dialog: true, menu: true };
    const closed = [];
    const close = (part) => () => {
      closed.push(part);
      open[part] = false;
      view.rerender(draw);
    };
    const anchor = { current: node(doc) };
    const draw = () => {
      useEscapeLayer(open.screen ? doc : null, 'screen', close('screen'), keyFromInside(node(doc)));
      useDialogEscape(open.dialog ? node(doc) : null, true, close('dialog'));
      useDismissListeners({ open: open.menu, onClose: close('menu'), contentRef: { current: null }, triggerRef: anchor, level: 'menu' });
    };
    const view = mountHook(draw);
    expect(escapeStackOf(doc).depth()).toBe(3);
    doc.press('Escape');
    expect(closed).toEqual(['menu']);
    doc.press('Escape');
    doc.press('Escape');
    expect(closed).toEqual(['menu', 'dialog', 'screen']);
    expect(escapeStackOf(doc).depth()).toBe(0);
  });

  it('a dialog with no onClose still holds the key, so the screen under it stays', () => {
    const doc = escapeDocument();
    const screen = vi.fn();
    mountHook(() => {
      useEscapeLayer(doc, 'screen', screen);
      useDialogEscape(node(doc), false, vi.fn());
    });
    doc.press('Escape');
    expect(screen).not.toHaveBeenCalled();
  });
});

describe('useEscapeStack', () => {
  it('registers a level for the app while active and reads the depth at any time', () => {
    const onEscape = vi.fn();
    const state = { active: true };
    const draw = () => ({ own: useEscapeStack({ level: 'dialog', onEscape, active: state.active }), reader: useEscapeStack() });
    const view = mountHook(draw);
    expect(view.current.reader.depth()).toBe(1);
    expect(view.current.reader.top()).toBe('dialog');
    page.press('Escape');
    expect(onEscape).toHaveBeenCalledOnce();
    state.active = false;
    view.rerender(draw);
    expect(view.current.own.depth()).toBe(0);
    expect(page.count()).toBe(0);
  });
});

describe('a screen beside another screen', () => {
  it('takes only a key pressed inside it, or on the page body', () => {
    const doc = escapeDocument();
    doc.body = { nodeType: 1 };
    doc.documentElement = { nodeType: 1 };
    const [inLeft, inRight] = [{ nodeType: 1 }, { nodeType: 1 }];
    const left = vi.fn();
    const right = vi.fn();
    pushEscape(doc, 'screen', left, keyFromInside(node(doc, [inLeft])));
    pushEscape(doc, 'screen', right, keyFromInside(node(doc, [inRight])));
    doc.press('Escape', false, inLeft);
    expect(left).toHaveBeenCalledOnce();
    expect(right).not.toHaveBeenCalled();
    doc.press('Escape', false, doc.body);
    expect(right).toHaveBeenCalledOnce();
    const outside = doc.press('Escape', false, { nodeType: 1 });
    expect(outside.stopped).toBe(false);
  });
});
