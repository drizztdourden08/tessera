/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useLazyLoad } from '../src/composites/Tree/behavior/useLazyLoad';
import { useSpringOpen } from '../src/composites/Tree/behavior/useSpringOpen';
import { useTreeExpansion } from '../src/composites/Tree/behavior/useTreeExpansion';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

afterEach(() => vi.useRealTimers());

describe('useTreeExpansion', () => {
  it('starts with the default keys and keeps its own after a change', () => {
    const onExpandedChange = vi.fn();
    const view = mountHook(() => useTreeExpansion({ defaultExpandedKeys: ['a'], onExpandedChange }));
    expect([...view.current.open]).toEqual(['a']);
    view.act((tree) => tree.setExpanded('b', true));
    expect(onExpandedChange).toHaveBeenCalledWith(['a', 'b']);
    expect([...view.current.open]).toEqual(['a', 'b']);
    view.act((tree) => tree.toggle('a'));
    expect([...view.current.open]).toEqual(['b']);
  });

  it('leaves the keys to the app when they are controlled', () => {
    const onExpandedChange = vi.fn();
    const view = mountHook(() => useTreeExpansion({ expandedKeys: ['a'], onExpandedChange }));
    view.act((tree) => tree.setExpanded('b', true));
    expect(onExpandedChange).toHaveBeenCalledWith(['a', 'b']);
    expect([...view.current.open]).toEqual(['a']);
  });

  it('opens several keys at once and says nothing when nothing changes', () => {
    const onExpandedChange = vi.fn();
    const view = mountHook(() => useTreeExpansion({ defaultExpandedKeys: ['a'], onExpandedChange }));
    view.act((tree) => tree.setMany(['a', 'b', 'c'], true));
    expect(onExpandedChange).toHaveBeenCalledTimes(1);
    expect(onExpandedChange).toHaveBeenCalledWith(['a', 'b', 'c']);
    view.act((tree) => tree.setMany(['a'], true));
    expect(onExpandedChange).toHaveBeenCalledTimes(1);
  });
});

describe('useLazyLoad', () => {
  const row = (key, extra = {}) => ({ key, item: { key }, expanded: true, loaded: false, loading: false, ...extra });

  it('asks once for each open folder whose children are missing', () => {
    const onLoad = vi.fn();
    const rows = [row('a'), row('b', { loaded: true }), row('c', { expanded: false }), row('d', { loading: true })];
    const view = mountHook(() => useLazyLoad(rows, onLoad));
    expect(onLoad.mock.calls).toEqual([[{ key: 'a' }]]);
    view.rerender(() => useLazyLoad([...rows], onLoad));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('asks again after the folder was closed and opened', () => {
    const onLoad = vi.fn();
    const view = mountHook(() => useLazyLoad([row('a')], onLoad));
    view.rerender(() => useLazyLoad([row('a', { expanded: false })], onLoad));
    view.rerender(() => useLazyLoad([row('a')], onLoad));
    expect(onLoad).toHaveBeenCalledTimes(2);
  });
});

describe('useSpringOpen', () => {
  it('opens the folder the pointer rests on after the delay', () => {
    vi.useFakeTimers();
    const open = vi.fn();
    mountHook(() => useSpringOpen('a', 600, open));
    vi.advanceTimersByTime(599);
    expect(open).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(open).toHaveBeenCalledWith('a');
  });

  it('does not open a folder the pointer left, or when the delay is zero', () => {
    vi.useFakeTimers();
    const open = vi.fn();
    const view = mountHook(() => useSpringOpen('a', 600, open));
    vi.advanceTimersByTime(300);
    view.rerender(() => useSpringOpen(null, 600, open));
    vi.advanceTimersByTime(1000);
    mountHook(() => useSpringOpen('b', 0, open));
    vi.advanceTimersByTime(1000);
    expect(open).not.toHaveBeenCalled();
  });
});
