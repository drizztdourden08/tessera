/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useFocusBack } from '../src/composites/VolumeControl/behavior/useFocusBack';
import { useVolumeWheel } from '../src/composites/VolumeControl/behavior/useVolumeWheel';
import { mountHook } from './hook-harness.mjs';
import { listenerNode } from './listener-node.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const wheel = (deltaY) => ({ deltaY, preventDefault: vi.fn() });

describe('useVolumeWheel', () => {
  it('listens on the button, and on the panel while it is open, without a passive listener', () => {
    const anchor = listenerNode();
    const panel = listenerNode();
    const onNudge = vi.fn();
    const view = mountHook(() => useVolumeWheel({ anchorRef: { current: anchor }, panelRef: { current: panel }, onNudge, active: true, open: false }));
    expect(anchor.listeners.get('wheel').options).toEqual({ passive: false });
    expect(panel.listeners.has('wheel')).toBe(false);
    view.rerender(() => useVolumeWheel({ anchorRef: { current: anchor }, panelRef: { current: panel }, onNudge, active: true, open: true }));
    expect(panel.listeners.has('wheel')).toBe(true);
  });

  it('turns a wheel up into a nudge up and a wheel down into a nudge down, and keeps the page still', () => {
    const anchor = listenerNode();
    const onNudge = vi.fn();
    mountHook(() => useVolumeWheel({ anchorRef: { current: anchor }, panelRef: { current: null }, onNudge, active: true, open: false }));
    const up = wheel(-120);
    anchor.listeners.get('wheel').listener(up);
    anchor.listeners.get('wheel').listener(wheel(120));
    anchor.listeners.get('wheel').listener(wheel(0));
    expect(onNudge.mock.calls).toEqual([[1], [-1]]);
    expect(up.preventDefault).toHaveBeenCalled();
  });

  it('does nothing while disabled', () => {
    const anchor = listenerNode();
    mountHook(() => useVolumeWheel({ anchorRef: { current: anchor }, panelRef: { current: null }, onNudge: vi.fn(), active: false, open: false }));
    expect(anchor.listeners.has('wheel')).toBe(false);
  });
});

describe('useFocusBack', () => {
  const button = () => {
    const doc = { body: {}, activeElement: null };
    const own = { ownerDocument: doc, focus: vi.fn() };
    doc.activeElement = doc.body;
    return own;
  };

  it('puts focus back on the button when the popover closes with focus inside it', () => {
    const own = button();
    const ref = { current: own };
    const view = mountHook(() => useFocusBack(true, ref));
    view.current.onFocus();
    view.rerender(() => useFocusBack(false, ref));
    expect(own.focus).toHaveBeenCalledTimes(1);
  });

  it('leaves focus alone when it had already moved out of the popover', () => {
    const own = button();
    const ref = { current: own };
    const view = mountHook(() => useFocusBack(true, ref));
    view.current.onFocus();
    view.current.onBlur();
    view.rerender(() => useFocusBack(false, ref));
    expect(own.focus).not.toHaveBeenCalled();
  });
});
