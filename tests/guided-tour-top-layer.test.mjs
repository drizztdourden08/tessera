/* @layer tooling-scripts @kind test */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTopLayer } from '../src/composites/GuidedTour/behavior/useTopLayer';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const listeners = [];
const doc = {
  activeElement: null,
  addEventListener: (type, listener, capture) => listeners.push({ type, listener, capture }),
  removeEventListener: vi.fn(),
};

const element = (extra = {}) => {
  const node = {
    nodeType: 1,
    offsetHeight: 1,
    ownerDocument: doc,
    open: false,
    calls: [],
    contains: (other) => other === node || extra.inside?.includes(other) === true,
    matches: (selector) => selector === ':popover-open' && node.open,
    hasAttribute: (name) => name === 'popover',
    focus: vi.fn(() => { doc.activeElement = node; }),
    showPopover: vi.fn(() => { node.open = true; node.calls.push('show'); }),
    hidePopover: vi.fn(() => { node.open = false; node.calls.push('hide'); }),
    ...extra,
  };
  return node;
};

const toggle = (target, newState = 'open') => ({ type: 'toggle', target, newState });
const heard = () => listeners.find((entry) => entry.type === 'toggle' && entry.capture === true).listener;

beforeEach(() => {
  listeners.length = 0;
  doc.activeElement = null;
  vi.stubGlobal('HTMLElement', class { showPopover() { return undefined; } });
});

afterEach(() => vi.unstubAllGlobals());

describe('the tour top layer', () => {
  it('shows the tour root as a popover when it mounts and listens for toggles in the capture phase', () => {
    const root = element();
    mountHook(() => useTopLayer(root));
    expect(root.calls).toEqual(['show']);
    expect(listeners.filter((entry) => entry.type === 'toggle').map((entry) => entry.capture)).toEqual([true]);
  });

  it('raises the tour again when another popover opens, so it stays above the menu', () => {
    const root = element();
    mountHook(() => useTopLayer(root));
    heard()(toggle(element()));
    expect(root.calls).toEqual(['show', 'hide', 'show']);
    expect(root.open).toBe(true);
  });

  it('leaves the tour alone for its own toggles, for a close and for a non popover target, so it never loops', () => {
    const inner = element();
    const root = element({ inside: [inner] });
    mountHook(() => useTopLayer(root));
    heard()(toggle(root));
    heard()(toggle(inner));
    heard()(toggle(element(), 'closed'));
    heard()(toggle({ nodeType: 1, offsetHeight: 1, hasAttribute: () => false }));
    expect(root.calls).toEqual(['show']);
  });

  it('keeps the keyboard focus that sat inside the tour across the raise', () => {
    const button = element();
    const root = element({ inside: [button] });
    mountHook(() => useTopLayer(root));
    doc.activeElement = button;
    root.hidePopover.mockImplementationOnce(() => { root.open = false; doc.activeElement = null; });
    heard()(toggle(element()));
    expect(button.focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(doc.activeElement).toBe(button);
  });

  it('does not touch the focus of the page when it was outside the tour', () => {
    const outside = element();
    const root = element();
    mountHook(() => useTopLayer(root));
    doc.activeElement = outside;
    heard()(toggle(element()));
    expect(outside.focus).not.toHaveBeenCalled();
  });

  it('stops listening when the tour closes, and does nothing without the popover api', () => {
    const root = element();
    const view = mountHook(() => useTopLayer(root));
    view.unmount();
    expect(doc.removeEventListener).toHaveBeenCalledWith('toggle', expect.any(Function), true);
    vi.stubGlobal('HTMLElement', class {});
    listeners.length = 0;
    const plain = element();
    mountHook(() => useTopLayer(plain));
    expect(plain.calls).toEqual([]);
    expect(listeners).toEqual([]);
  });
});
