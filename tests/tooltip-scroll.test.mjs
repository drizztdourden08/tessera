/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { nextTooltipState } from '../src/primitives/Tooltip/behavior/next-tooltip-state';
import { useTooltipOpen } from '../src/primitives/Tooltip/behavior/useTooltipOpen';
import { mountHook } from './hook-harness.mjs';
import { fakeAnchor, fakeDocument } from './tooltip-document.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/Portal/behavior/useDismissListeners', () => ({ useDismissListeners: () => undefined }));
vi.mock('../src/primitives/hint/keyboard-focus', () => ({ keyboardFocus: (target) => target?.keyboard === true }));

const KEYBOARD = { target: { keyboard: true }, relatedTarget: null, currentTarget: { contains: () => false } };

const at = (clientX, clientY) => ({ clientX, clientY });

const mount = () => {
  const doc = fakeDocument();
  const ref = fakeAnchor(doc);
  const view = mountHook(() => useTooltipOpen(ref, ref, true));
  const move = (x, y) => doc.fire('mousemove', at(x, y));
  return { doc, view, move };
};

describe('a tooltip under a pointer that did not move', () => {
  it('stays closed when content scrolls under the pointer', () => {
    const { view, move } = mount();
    move(40, 50);
    view.act((tip) => tip.handlers.onMouseEnter(at(40, 50)));
    expect(view.current.open).toBe(false);
  });

  it('opens when the pointer moves into it', () => {
    const { view, move } = mount();
    move(10, 10);
    view.act((tip) => tip.handlers.onMouseEnter(at(40, 50)));
    expect(view.current.open).toBe(true);
  });

  it('opens on the first real move inside, not on a repeat of the same spot', () => {
    const { view, move } = mount();
    move(40, 50);
    view.act((tip) => tip.handlers.onMouseEnter(at(40, 50)));
    view.act((tip) => tip.handlers.onMouseMove(at(40, 50)));
    expect(view.current.open).toBe(false);
    view.act((tip) => tip.handlers.onMouseMove(at(42, 50)));
    expect(view.current.open).toBe(true);
  });
});

describe('a tooltip open while the page scrolls', () => {
  it('closes a hover tooltip on a scroll anywhere, and listens only while it is open', () => {
    const { doc, view, move } = mount();
    expect(doc.listeners.has('scroll')).toBe(false);
    move(10, 10);
    view.act((tip) => tip.handlers.onMouseEnter(at(40, 50)));
    expect(view.current.open).toBe(true);
    expect(doc.listeners.has('scroll')).toBe(true);
    view.act(() => doc.fire('scroll'));
    expect(view.current.open).toBe(false);
    expect(doc.listeners.has('scroll')).toBe(false);
  });

  it('does not reopen from the same-spot pointer events a scroll produces', () => {
    const { doc, view, move } = mount();
    move(10, 10);
    view.act((tip) => tip.handlers.onMouseEnter(at(40, 50)));
    move(40, 50);
    view.act(() => doc.fire('scroll'));
    view.act((tip) => tip.handlers.onMouseEnter(at(40, 50)));
    view.act((tip) => tip.handlers.onMouseMove(at(40, 50)));
    expect(view.current.open).toBe(false);
  });

  it('keeps a focus-opened tooltip open through a scroll', () => {
    const { doc, view } = mount();
    view.act((tip) => tip.handlers.onFocus(KEYBOARD));
    expect(view.current.open).toBe(true);
    expect(doc.listeners.has('scroll')).toBe(false);
    view.act(() => doc.fire('scroll'));
    expect(view.current.open).toBe(true);
  });

  it('drops only the hover when focus holds it too', () => {
    expect(nextTooltipState({ hover: true, focus: true, dismissed: false }, 'scroll')).toEqual({ hover: false, focus: true, dismissed: false });
  });
});
