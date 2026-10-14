/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useDismissListeners } from '../src/primitives/Portal/behavior/useDismissListeners';
import { escapeStackOf } from '../src/primitives/escape-stack/escape-stack-of';
import { escapeDocument } from './escape-document.mjs';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const pressPage = () => {
  const page = escapeDocument();
  const presses = new Set();
  const doc = {
    addEventListener: (type, fn, capture) => (type === 'mousedown' ? presses.add(fn) : page.addEventListener(type, fn, capture)),
    removeEventListener: (type, fn, capture) => (type === 'mousedown' ? presses.delete(fn) : page.removeEventListener(type, fn, capture)),
    press: (key) => page.press(key),
    click: (target) => [...presses].forEach((fn) => fn({ composedPath: () => [target] })),
    presses: () => presses.size,
  };
  return doc;
};

const nodeIn = (doc) => {
  const inner = { nodeType: 1 };
  return { inner, node: { nodeType: 1, ownerDocument: doc, contains: (other) => other === inner } };
};

const mount = (doc, extra = {}) => {
  const onClose = vi.fn();
  const popup = nodeIn(doc);
  const trigger = nodeIn(doc);
  mountHook(() => useDismissListeners({ open: true, onClose, contentRef: { current: popup.node }, triggerRef: { current: trigger.node }, ...extra }));
  return { onClose, popup, trigger };
};

describe('dismissing a popup', () => {
  it('closes on Escape through the shared stack at the popover level', () => {
    const doc = pressPage();
    const { onClose } = mount(doc);
    expect(escapeStackOf(doc).top()).toBe('popover');
    expect(doc.press('Escape').stopped).toBe(true);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes on a press outside, not on one inside the popup or its trigger', () => {
    const doc = pressPage();
    const { onClose, popup, trigger } = mount(doc);
    doc.click(popup.inner);
    doc.click(trigger.inner);
    expect(onClose).not.toHaveBeenCalled();
    doc.click({ nodeType: 1 });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('turns each way off on its own', () => {
    const escapeOnly = pressPage();
    mount(escapeOnly, { outsidePress: false });
    expect(escapeOnly.presses()).toBe(0);
    expect(escapeStackOf(escapeOnly).depth()).toBe(1);
    const outsideOnly = pressPage();
    mount(outsideOnly, { escape: false });
    expect(outsideOnly.presses()).toBe(1);
    expect(escapeStackOf(outsideOnly).depth()).toBe(0);
  });
});
