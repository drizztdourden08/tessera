/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useTourEntry } from '../src/composites/GuidedTour/behavior/useTourEntry';
import { useTourKeys } from '../src/composites/GuidedTour/behavior/useTourKeys';
import { mountHook } from './hook-harness.mjs';
import { escapeStackOf } from '../src/primitives/escape-stack/escape-stack-of';

const listeners = [];
const doc = {
  querySelector: () => null,
  defaultView: { requestAnimationFrame: (callback) => setTimeout(callback, 0) },
  addEventListener: (type, listener, capture) => listeners.push({ type, listener, capture }),
  removeEventListener: vi.fn(),
};

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => doc }));

const settle = () => new Promise((resolve) => { setTimeout(resolve, 5); });

describe('the keys of an open tour', () => {
  const press = (key, target = null) => ({ key, target, defaultPrevented: false, preventDefault: vi.fn(), stopPropagation: vi.fn() });

  it('listen in the capture phase and stop only the keys the tour acts on, and close on Escape through the Escape stack', () => {
    listeners.length = 0;
    const tour = { next: vi.fn(), back: vi.fn(), close: vi.fn() };
    mountHook(() => useTourKeys(tour, { ownerDocument: doc }, null, false));
    const { listener } = listeners.find((entry) => entry.capture === true);
    const stack = listeners.find((entry) => entry.capture !== true);
    const escape = press('Escape');
    listener(escape);
    expect(tour.close).not.toHaveBeenCalled();
    expect(escape.stopPropagation).not.toHaveBeenCalled();
    stack.listener({ ...escape, stopImmediatePropagation: vi.fn() });
    expect(tour.close).toHaveBeenCalledOnce();
    expect(escapeStackOf(doc).top()).toBe('menu');
    const letter = press('a');
    listener(letter);
    expect(letter.stopPropagation).not.toHaveBeenCalled();
    const button = { nodeType: 1, offsetHeight: 1, matches: (selector) => selector.includes('button') };
    const enter = press('Enter', button);
    listener(enter);
    expect(tour.next).not.toHaveBeenCalled();
    expect(enter.stopPropagation).not.toHaveBeenCalled();
  });

  it('leave Right and Enter alone on a wait step', () => {
    listeners.length = 0;
    const tour = { next: vi.fn(), back: vi.fn(), close: vi.fn() };
    mountHook(() => useTourKeys(tour, { ownerDocument: doc }, null, true));
    const right = press('ArrowRight');
    listeners.find((entry) => entry.capture === true).listener(right);
    expect(tour.next).not.toHaveBeenCalled();
    expect(right.stopPropagation).not.toHaveBeenCalled();
  });
});

describe('the step events', () => {
  const steps = (onEnter) => [
    { id: 'one', title: 'One', body: 'First', onEnter },
    { id: 'two', title: 'Two', body: 'Second' },
  ];

  it('runs onStepShown after onEnter, and onStepLeave on the next step and on close', async () => {
    const order = [];
    const options = {
      steps: steps(async () => { await settle(); order.push('enter'); }),
      onStepShown: (step, index, target) => order.push(`shown ${step.id} ${index} ${target}`),
      onStepLeave: (step, index) => order.push(`leave ${step.id} ${index}`),
    };
    const latest = { current: { options } };
    let at = { open: true, index: 0 };
    const hook = mountHook(() => useTourEntry(at, options.steps[at.index].id, latest));
    expect(hook.current).toBeNull();
    await settle();
    await settle();
    hook.act(() => undefined);
    expect(hook.current).toEqual({ index: 0, id: 'one', target: null });
    expect(order).toEqual(['enter', 'shown one 0 null']);
    at = { open: true, index: 1 };
    hook.rerender(() => useTourEntry(at, options.steps[at.index].id, latest));
    expect(order.at(-1)).toBe('leave one 0');
    at = { open: false, index: 1 };
    hook.rerender(() => useTourEntry(at, undefined, latest));
    expect(order.at(-1)).toBe('leave two 1');
    expect(order.filter((line) => line.startsWith('shown'))).toHaveLength(1);
  });

  it('aborts onEnter when the step changes first, and never shows that step', async () => {
    const signals = [];
    const shown = vi.fn();
    const options = { steps: steps(({ signal }) => { signals.push(signal); return settle(); }), onStepShown: shown };
    const latest = { current: { options } };
    let at = { open: true, index: 0 };
    const hook = mountHook(() => useTourEntry(at, options.steps[at.index].id, latest));
    at = { open: true, index: 1 };
    hook.rerender(() => useTourEntry(at, options.steps[at.index].id, latest));
    expect(signals[0].aborted).toBe(true);
    await settle();
    await settle();
    hook.act(() => undefined);
    expect(shown).toHaveBeenCalledOnce();
    expect(shown.mock.calls[0][1]).toBe(1);
  });
});
