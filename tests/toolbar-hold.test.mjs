/* @layer tooling-scripts @kind test */
import { mountHook } from './hook-harness.mjs';
import { listenerNode } from './listener-node.mjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useHoldOpen } from '../src/composites/Toolbar/behavior/useHoldOpen';
import { useReleasePick } from '../src/composites/Toolbar/behavior/useReleasePick';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

afterEach(() => vi.useRealTimers());

const press = (button = 0) => ({ button });
const holdView = (onHold, enabled = true) => mountHook(() => useHoldOpen({ enabled, delay: 300, onHold }));
const pressFor = (view, ms, end) => {
  view.act((hold) => hold.handlers.onPointerDown(press()));
  vi.advanceTimersByTime(ms);
  if (end !== undefined) view.act((hold) => hold.handlers[end]());
};

describe('useHoldOpen', () => {
  it('opens after the delay and swallows the click that ends the press', () => {
    vi.useFakeTimers();
    const onHold = vi.fn();
    const view = holdView(onHold);
    pressFor(view, 299);
    expect(onHold).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2);
    expect(onHold).toHaveBeenCalledTimes(1);
    expect(view.current.consumed()).toBe(true);
    expect(view.current.consumed()).toBe(false);
  });

  it('does not open when the press ends or leaves before the delay, and the click goes through', () => {
    vi.useFakeTimers();
    const onHold = vi.fn();
    const view = holdView(onHold);
    pressFor(view, 200, 'onPointerUp');
    vi.advanceTimersByTime(500);
    pressFor(view, 200, 'onPointerLeave');
    vi.advanceTimersByTime(500);
    expect(onHold).not.toHaveBeenCalled();
    expect(view.current.consumed()).toBe(false);
  });

  it('ignores a press that is not the main button, and hands out no handlers while off', () => {
    vi.useFakeTimers();
    const onHold = vi.fn();
    const view = holdView(onHold);
    view.act((hold) => hold.handlers.onPointerDown(press(2)));
    vi.advanceTimersByTime(900);
    expect(onHold).not.toHaveBeenCalled();
    expect(holdView(onHold, false).current.handlers).toEqual({});
  });
});

describe('useReleasePick', () => {
  const doc = (hit) => listenerNode({ elementFromPoint: () => hit });

  it('clicks the menu item under the pointer when the press is released, once', () => {
    const click = vi.fn();
    const target = doc({ closest: (selector) => (selector.includes('menuitem') ? { click } : null) });
    mountHook(() => useReleasePick(true, { current: { ownerDocument: target } }));
    const release = target.listeners.get('pointerup');
    expect(release.options).toEqual({ once: true });
    release.listener({ clientX: 4, clientY: 5 });
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('does nothing when the release is not over an item, or while the menu is not held open', () => {
    const none = doc({ closest: () => null });
    mountHook(() => useReleasePick(true, { current: { ownerDocument: none } }));
    expect(() => none.listeners.get('pointerup').listener({ clientX: 0, clientY: 0 })).not.toThrow();
    const idle = doc(null);
    mountHook(() => useReleasePick(false, { current: { ownerDocument: idle } }));
    expect(idle.listeners.has('pointerup')).toBe(false);
  });
});
