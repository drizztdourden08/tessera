/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { enterLayer } from '../src/primitives/Portal/behavior/enter-layer';
import { heldAbove } from '../src/primitives/Portal/behavior/held-above';

const fakeDocument = () => {
  const listeners = new Set();
  return {
    addEventListener: (type, fn) => listeners.add(fn),
    removeEventListener: (type, fn) => listeners.delete(fn),
    press: (key) => {
      const event = { key, stopped: false, stopImmediatePropagation() { this.stopped = true; } };
      for (const fn of [...listeners]) if (!event.stopped) fn(event);
      return event;
    },
    count: () => listeners.size,
  };
};

const layer = (escape = true, held = []) => ({ escape: () => escape, close: vi.fn(), holds: (node) => held.includes(node) });

describe('Escape with popups inside popups', () => {
  it('closes only the popup opened last, then the one under it', () => {
    const doc = fakeDocument();
    const panel = layer();
    const select = layer();
    enterLayer(doc, panel);
    const leaveSelect = enterLayer(doc, select);
    expect(doc.press('Escape').stopped).toBe(true);
    expect(select.close).toHaveBeenCalledTimes(1);
    expect(panel.close).not.toHaveBeenCalled();
    leaveSelect();
    doc.press('Escape');
    expect(panel.close).toHaveBeenCalledTimes(1);
  });

  it('leaves Escape to a top popup that handles it itself, and keeps the one under it open', () => {
    const doc = fakeDocument();
    const panel = layer();
    const menu = layer(false);
    enterLayer(doc, panel);
    enterLayer(doc, menu);
    expect(doc.press('Escape').stopped).toBe(false);
    expect(panel.close).not.toHaveBeenCalled();
    expect(menu.close).not.toHaveBeenCalled();
  });

  it('ignores other keys and removes its listener once every popup has closed', () => {
    const doc = fakeDocument();
    const panel = layer();
    const leave = enterLayer(doc, panel);
    doc.press('Enter');
    expect(panel.close).not.toHaveBeenCalled();
    leave();
    expect(doc.count()).toBe(0);
  });
});

describe('a press inside a nested popup', () => {
  it('counts as inside for every popup under it, not for the ones above', () => {
    const doc = fakeDocument();
    const option = {};
    const panel = layer();
    const select = layer(true, [option]);
    enterLayer(doc, panel);
    enterLayer(doc, select);
    expect(heldAbove(doc, panel, option)).toBe(true);
    expect(heldAbove(doc, select, option)).toBe(false);
  });
});

const pageDocument = () => {
  const doc = fakeDocument();
  const attributes = new Map();
  const viewListeners = new Set();
  doc.documentElement = {
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
    has: (name) => attributes.has(name),
  };
  doc.defaultView = {
    addEventListener: (type, fn) => viewListeners.add(fn),
    removeEventListener: (type, fn) => viewListeners.delete(fn),
    blur: () => [...viewListeners].forEach((fn) => fn()),
  };
  return doc;
};

describe('open popups and the window', () => {
  it('flags the page while any popup is open, so drag regions let clicks through', () => {
    const doc = pageDocument();
    const leaveMenu = enterLayer(doc, layer());
    const leaveSub = enterLayer(doc, layer());
    expect(doc.documentElement.has('data-popup-open')).toBe(true);
    leaveSub();
    expect(doc.documentElement.has('data-popup-open')).toBe(true);
    leaveMenu();
    expect(doc.documentElement.has('data-popup-open')).toBe(false);
  });

  it('closes every open popup, innermost first, when the window loses focus', () => {
    const doc = pageDocument();
    const order = [];
    const menu = { ...layer(), close: () => order.push('menu') };
    const sub = { ...layer(), close: () => order.push('sub') };
    enterLayer(doc, menu);
    enterLayer(doc, sub);
    doc.defaultView.blur();
    expect(order).toEqual(['sub', 'menu']);
  });
});
