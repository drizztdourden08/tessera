/* @layer tooling-scripts @kind test */
import { mountHook } from './hook-harness.mjs';
import { listenerNode } from './listener-node.mjs';
import { describe, expect, it, vi } from 'vitest';
import { useWheelStep } from '../src/composites/wheel-step';
import { wheelStepOf } from '../src/composites/wheel-step/wheel-step-of';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const turn = (deltaY, extra = {}) => ({ deltaX: 0, deltaY, shiftKey: false, preventDefault: vi.fn(), ...extra });

describe('wheelStepOf', () => {
  it('turns a wheel up into a step up and a wheel down into a step down', () => {
    expect(wheelStepOf({ deltaX: 0, deltaY: -120, shiftKey: false })).toEqual({ direction: 1, fine: false });
    expect(wheelStepOf({ deltaX: 0, deltaY: 120, shiftKey: false })).toEqual({ direction: -1, fine: false });
  });

  it('marks a step fine while Shift is down, and reads the sideways wheel the browser sends with Shift', () => {
    expect(wheelStepOf({ deltaX: 0, deltaY: -1, shiftKey: true })).toEqual({ direction: 1, fine: true });
    expect(wheelStepOf({ deltaX: 40, deltaY: 0, shiftKey: true })).toEqual({ direction: -1, fine: true });
  });

  it('ignores a wheel that did not move', () => {
    expect(wheelStepOf({ deltaX: 0, deltaY: 0, shiftKey: false })).toBeUndefined();
  });
});

describe('useWheelStep', () => {
  it('listens without a passive listener, keeps the page still and reports each step', () => {
    const anchor = listenerNode();
    const onStep = vi.fn();
    mountHook(() => useWheelStep({ refs: [{ current: anchor }], active: true, onStep }));
    expect(anchor.listeners.get('wheel').options).toEqual({ passive: false });
    const up = turn(-100);
    anchor.listeners.get('wheel').listener(up);
    anchor.listeners.get('wheel').listener(turn(100, { shiftKey: true }));
    anchor.listeners.get('wheel').listener(turn(0));
    expect(onStep.mock.calls).toEqual([[{ direction: 1, fine: false }], [{ direction: -1, fine: true }]]);
    expect(up.preventDefault).toHaveBeenCalled();
  });

  it('does nothing while inactive, and listens again when watch changes', () => {
    const first = listenerNode();
    const second = listenerNode();
    const view = mountHook(() => useWheelStep({ refs: [{ current: first }], active: false, onStep: vi.fn() }));
    expect(first.listeners.has('wheel')).toBe(false);
    view.rerender(() => useWheelStep({ refs: [{ current: first }, { current: second }], active: true, onStep: vi.fn(), watch: true }));
    expect(first.listeners.has('wheel')).toBe(true);
    expect(second.listeners.has('wheel')).toBe(true);
  });
});
