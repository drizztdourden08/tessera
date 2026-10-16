/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { createToastStore } from '../src/composites/Toast/behavior/create-toast-store';

describe('toast onClose', () => {
  it('reports dismissed when the app dismisses a toast, or the reason it passes, once', () => {
    const store = createToastStore();
    const onClose = vi.fn();
    const id = store.show({ message: 'Save deleted.', onClose });
    store.dismiss(id, 'expired');
    store.dismiss(id, 'action');
    expect(onClose.mock.calls).toEqual([['expired']]);
    const other = vi.fn();
    store.dismiss(store.show({ message: 'Other.', onClose: other }));
    expect(other.mock.calls).toEqual([['dismissed']]);
  });

  it('reports replaced to the toast a joining message takes over, and keeps the new one open', () => {
    const store = createToastStore();
    const first = vi.fn();
    const second = vi.fn();
    store.show({ message: 'Save deleted.', onClose: first });
    store.show({ message: 'Save deleted.', onClose: second });
    expect(first.mock.calls).toEqual([['replaced']]);
    expect(second).not.toHaveBeenCalled();
    expect(store.read().items).toHaveLength(1);
  });

  it('closes every toast on clear with dismissed, after the queue is empty', () => {
    const store = createToastStore();
    const seen = [];
    const onClose = (reason) => seen.push([reason, store.read().items.length]);
    store.show({ message: 'One.', onClose });
    store.show({ message: 'Two.', onClose });
    store.clear();
    expect(seen).toEqual([['dismissed', 0], ['dismissed', 0]]);
  });

  it('leaves a toast with no onClose as it was', () => {
    const store = createToastStore();
    const id = store.show({ message: 'Saved.' });
    expect(() => store.dismiss(id, 'expired')).not.toThrow();
    expect(store.read().items).toHaveLength(0);
  });
});
