/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useItemListCount } from '../src/composites/ItemList/behavior/useItemListCount';
import { useListDetailCount } from '../src/composites/ListDetail/behavior/useListDetailCount';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

describe('ListDetail heading count when the filter narrows the list', () => {
  it('reads shown of total once the filter narrows the list', () => {
    const view = mountHook(() => useListDetailCount('Servers', 4));
    expect(view.current.heading).toBe('Servers · 4');
    view.act((current) => current.onCount(1, 4));
    expect(view.current.heading).toBe('Servers · 1 of 4');
    view.act((current) => current.onCount(4, 4));
    expect(view.current.heading).toBe('Servers · 4');
  });

  it('follows a total that changes, such as after a delete', () => {
    const view = mountHook(() => useListDetailCount('Servers', 4));
    view.act((current) => current.onCount(3, 3));
    expect(view.current.heading).toBe('Servers · 3');
  });
});

describe('ItemList onCount', () => {
  it('reports the shown and total counts, again only when they change', () => {
    const onCount = vi.fn();
    let shown = 4;
    const view = mountHook(() => useItemListCount(onCount, shown, 4));
    expect(onCount).toHaveBeenLastCalledWith(4, 4);
    shown = 2;
    view.rerender(() => useItemListCount(onCount, shown, 4));
    expect(onCount).toHaveBeenLastCalledWith(2, 4);
    view.rerender(() => useItemListCount(onCount, shown, 4));
    expect(onCount).toHaveBeenCalledTimes(2);
  });
});
