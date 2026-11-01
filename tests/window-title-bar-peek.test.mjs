/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { usePeek } from '../src/composites/WindowTitleBar/behavior/usePeek';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const key = (name) => ({ key: name, defaultPrevented: false, target: null, preventDefault: vi.fn() });

describe('K1 WindowTitleBar peek Escape', { tags: ['critical'] }, () => {
  it('prevents the default of the Escape it handles, and of no other key', () => {
    const view = mountHook(() => usePeek(true, { current: null }, false));
    const escape = key('Escape');
    view.current.handlers.onKeyDown(escape);
    expect(escape.preventDefault).toHaveBeenCalledOnce();
    const letter = key('a');
    view.current.handlers.onKeyDown(letter);
    expect(letter.preventDefault).not.toHaveBeenCalled();
  });
});
