/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useScrub } from '../src/composites/NumberField/behavior/useScrub';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const noop = () => undefined;

describe('useScrub', () => {
  const pointer = (clientX, extra = {}) => ({ button: 0, pointerId: 1, clientX, shiftKey: false, currentTarget: { setPointerCapture: vi.fn(), hasPointerCapture: () => false, releasePointerCapture: vi.fn() }, ...extra });

  it('steps once for every six pixels of drag and a fine step with Shift', () => {
    const changes = [];
    const view = mountHook(() => useScrub({ value: 10, enabled: true, config: { step: 1, fineStep: 0.1 }, onChange: (next) => changes.push(next) }));
    const handlers = view.current;
    handlers.onPointerDown(pointer(100));
    handlers.onPointerMove(pointer(105));
    expect(changes).toEqual([]);
    handlers.onPointerMove(pointer(112));
    handlers.onPointerMove(pointer(118, { shiftKey: true }));
    expect(changes).toEqual([12, 12.1]);
    handlers.onPointerUp(pointer(118));
    handlers.onPointerMove(pointer(200));
    expect(changes).toHaveLength(2);
  });

  it('turns back to steps down, and does nothing when off', () => {
    const changes = [];
    const view = mountHook(() => useScrub({ value: 10, enabled: true, config: { step: 5, fineStep: 1 }, onChange: (next) => changes.push(next) }));
    view.current.onPointerDown(pointer(50));
    view.current.onPointerMove(pointer(38));
    expect(changes).toEqual([0]);
    expect(mountHook(() => useScrub({ value: 1, enabled: false, config: { step: 1, fineStep: 1 }, onChange: noop })).current).toBeUndefined();
  });
});
