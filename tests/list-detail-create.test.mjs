/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useListDetailGuard } from '../src/composites/ListDetail/behavior/useListDetailGuard';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const LIST = { title: 'Presets', items: [{ id: 'p1', name: 'Keysanity' }], getId: (preset) => preset.id, getName: (preset) => preset.name };
const form = () => h('input');

const mount = (props = {}, list = { create: form }) => {
  const calls = { onSelect: vi.fn(), onDiscard: vi.fn(), onSave: vi.fn(() => true) };
  const run = () => useListDetailGuard({ list: { ...LIST, ...list }, selectedId: 'p1', detail: null, dirty: true, ...calls, ...props });
  return { calls, view: mountHook(run), run };
};

const pressNew = (view) => view.act((current) => current.items.onCreateOpenChange(true));

describe('ListDetail guards the create form, each answer', () => {
  it('asks before New opens the form while the editor holds unsaved edits', () => {
    const { view } = mount();
    pressNew(view);
    expect(view.current.guard.pending).toEqual({ kind: 'create' });
    expect(view.current.items.createOpen).toBe(false);
  });

  it('opens the form after Discard, and throws the edits away first', () => {
    const { view, calls } = mount();
    pressNew(view);
    view.act((current) => current.guard.discard());
    expect(calls.onDiscard).toHaveBeenCalledTimes(1);
    expect(view.current.guard.pending).toBeNull();
    expect(view.current.items.createOpen).toBe(true);
    expect(calls.onSelect).not.toHaveBeenCalled();
  });

  it('opens the form after a save that worked', async () => {
    const { view, calls, run } = mount();
    pressNew(view);
    view.act((current) => current.guard.save());
    await vi.waitFor(() => expect(calls.onSave).toHaveBeenCalled());
    await Promise.resolve();
    view.rerender(run);
    expect(view.current.items.createOpen).toBe(true);
  });

  it('keeps the form shut after a save that failed', async () => {
    const { view, run } = mount({ onSave: () => Promise.reject(new Error('disk full')) });
    pressNew(view);
    view.act((current) => current.guard.save());
    await new Promise((done) => setTimeout(done, 0));
    view.rerender(run);
    expect(view.current.guard.pending).toBeNull();
    expect(view.current.items.createOpen).toBe(false);
  });

  it('keeps the form shut after Keep editing', () => {
    const { view, calls } = mount();
    pressNew(view);
    view.act((current) => current.guard.stay());
    expect(view.current.guard.pending).toBeNull();
    expect(view.current.items.createOpen).toBe(false);
    expect(calls.onDiscard).not.toHaveBeenCalled();
  });
});

describe('ListDetail asks only while edits are unsaved, and only for its own New', () => {
  it('opens the form at once with nothing unsaved, and closes it without asking', () => {
    const { view } = mount({ dirty: false });
    pressNew(view);
    expect(view.current.items.createOpen).toBe(true);
    const dirty = mount();
    pressNew(dirty.view);
    dirty.view.act((current) => current.guard.discard());
    dirty.view.act((current) => current.items.onCreateOpenChange(false));
    expect(dirty.view.current.guard.pending).toBeNull();
    expect(dirty.view.current.items.createOpen).toBe(false);
  });

  it('passes the request to the app that holds createOpen only after the answer', () => {
    const onCreateOpenChange = vi.fn();
    const { view } = mount({}, { create: form, createOpen: false, onCreateOpenChange });
    pressNew(view);
    expect(onCreateOpenChange).not.toHaveBeenCalled();
    view.act((current) => current.guard.discard());
    expect(onCreateOpenChange).toHaveBeenCalledWith(true);
    expect(view.current.items.createOpen).toBe(false);
  });

  it('guards onCreate the same way, and adds no New without onCreate or create', () => {
    const onCreate = vi.fn();
    const { view } = mount({}, { onCreate });
    view.act((current) => current.items.onCreate());
    expect(onCreate).not.toHaveBeenCalled();
    view.act((current) => current.guard.discard());
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(mount({}, {}).view.current.items.onCreate).toBeUndefined();
  });
});
