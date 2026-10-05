/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it } from 'vitest';
import { Toast, ToastStack, toast } from '../src/composites/Toast';
import { createToastStore } from '../src/composites/Toast/behavior/create-toast-store';

const noop = () => undefined;

afterEach(() => toast.clear());

describe('one toast queue for the whole app', () => {
  it('collapses the same message into one toast with a count', () => {
    const store = createToastStore();
    const first = store.show({ variant: 'danger', message: 'Settings could not be saved.' });
    store.show({ variant: 'success', message: 'Save state written to slot 3.' });
    const again = store.show({ variant: 'danger', message: 'Settings could not be saved.' });
    expect(again).toBe(first);
    expect(store.read().items.map((item) => [item.message, item.count])).toEqual([
      ['Settings could not be saved.', 2],
      ['Save state written to slot 3.', 1],
    ]);
  });

  it('keeps a message raised in another variant apart, and an id joins toasts by itself', () => {
    const store = createToastStore();
    store.show({ variant: 'info', message: 'Synced.' });
    store.show({ variant: 'success', message: 'Synced.' });
    store.show({ id: 'sync', message: 'Synced 1 file.' });
    store.show({ id: 'sync', message: 'Synced 2 files.' });
    expect(store.read().items.map((item) => item.message)).toEqual(['Synced.', 'Synced.', 'Synced 2 files.']);
    expect(store.read().items[2].count).toBe(2);
  });

  it('gives a toast five seconds unless it asks for another time, and dismisses by id', () => {
    const store = createToastStore();
    const id = store.show({ message: 'Saved.' });
    store.show({ message: 'Kept.', duration: 0 });
    expect(store.read().items.map((item) => item.duration)).toEqual([5000, 0]);
    store.dismiss(id);
    expect(store.read().items.map((item) => item.message)).toEqual(['Kept.']);
  });

  it('lets one stack draw at a time: the newest mounted, then the one before it', () => {
    const store = createToastStore();
    const [a, b] = [store.mint(), store.mint()];
    expect(a).not.toBe(b);
    const releaseA = store.claim(a);
    const releaseB = store.claim(b);
    expect(store.read().owner).toBe(b);
    releaseB();
    expect(store.read().owner).toBe(a);
    releaseA();
    expect(store.read().owner).toBeNull();
  });

  it('tells every listener and stops when it unsubscribes', () => {
    const store = createToastStore();
    let calls = 0;
    const stop = store.subscribe(() => { calls += 1; });
    store.show({ message: 'One.' });
    stop();
    store.show({ message: 'Two.' });
    expect(calls).toBe(1);
  });

  it('draws nothing before a stack claims the queue, so a server render shows no second stack', () => {
    toast({ message: 'Saved.' });
    expect(renderToString(h(ToastStack))).toBe('');
  });

  it('shows the count of a repeated toast and names it for a pointer', () => {
    const html = renderToString(h(Toast, { item: { id: 't', message: 'Saved.', variant: 'success', count: 3 }, onDismiss: noop }));
    expect(html).toContain('toast__count" title="Shown 3 times">×3</span>');
    expect(renderToString(h(Toast, { item: { id: 't', message: 'Saved.' }, onDismiss: noop }))).not.toContain('toast__count');
  });
});
