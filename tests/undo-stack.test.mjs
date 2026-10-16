/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TESSERA_STRINGS } from '../src/primitives/strings/tessera-strings.constants';
import { pushUndo } from '../src/primitives/undo-stack/push-undo';
import { undoKeys } from '../src/primitives/undo-stack/undo-keys';
import { useUndo } from '../src/primitives/undo-stack/useUndo';
import { useToastUndo } from '../src/composites/Toast/behavior/useToastUndo';
import { useItemListUndo } from '../src/composites/ItemList/behavior/useItemListUndo';
import { mountHook } from './hook-harness.mjs';
import { escapeDocument } from './escape-document.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraStrings', () => ({ useTesseraStrings: () => TESSERA_STRINGS }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => page }));

const page = escapeDocument();

const CTRL = { ctrlKey: true, metaKey: false, altKey: false, shiftKey: false };
const CMD = { ctrlKey: false, metaKey: true, altKey: false, shiftKey: false };
const node = (inside = []) => ({ nodeType: 1, contains: (target) => inside.includes(target) });
const field = { nodeType: 1, offsetHeight: 20, matches: (selector) => selector.startsWith('input') };
const ctrlZ = (doc, target = null, keys = CTRL) => doc.press('z', false, target, keys);

afterEach(() => vi.useRealTimers());

describe('one undo stack per document', () => {
  it('undoes the latest step first on Ctrl+Z or Cmd+Z, one step a press, and stops listening when empty', () => {
    const doc = escapeDocument();
    const done = [];
    pushUndo(doc, { label: 'Load', undo: () => done.push('load') });
    pushUndo(doc, { label: 'Save over', undo: () => done.push('save') });
    expect(doc.count()).toBe(1);
    expect(ctrlZ(doc).defaultPrevented).toBe(true);
    expect(done).toEqual(['save']);
    ctrlZ(doc, null, CMD);
    expect(done).toEqual(['save', 'load']);
    expect(doc.count()).toBe(0);
    expect(ctrlZ(doc).defaultPrevented).toBe(false);
  });

  it('leaves the key to a text box, to a part that took it, and to Shift or Alt', () => {
    const doc = escapeDocument();
    const undo = vi.fn();
    pushUndo(doc, { label: 'Load', undo });
    expect(ctrlZ(doc, field).defaultPrevented).toBe(false);
    doc.press('z', true, null, CTRL);
    ctrlZ(doc, null, { ...CTRL, shiftKey: true });
    ctrlZ(doc, null, { ...CTRL, altKey: true });
    expect(undo).not.toHaveBeenCalled();
    ctrlZ(doc);
    expect(undo).toHaveBeenCalledTimes(1);
  });

  it('runs a step held by a region only while the key comes from inside it, and skips it for an older one outside', () => {
    const doc = escapeDocument();
    const row = { nodeType: 1 };
    const list = node([row]);
    const done = [];
    pushUndo(doc, { label: 'Load', undo: () => done.push('load') });
    pushUndo(doc, { label: 'Delete', undo: () => done.push('delete'), within: { current: list } });
    ctrlZ(doc, { nodeType: 1 });
    expect(done).toEqual(['load']);
    ctrlZ(doc, { nodeType: 1 });
    expect(done).toEqual(['load']);
    ctrlZ(doc, row);
    expect(done).toEqual(['load', 'delete']);
  });

  it('drops a step when its time is up, and a drop runs once', () => {
    vi.useFakeTimers();
    const doc = escapeDocument();
    const undo = vi.fn();
    const gone = vi.fn();
    const drop = pushUndo(doc, { label: 'Load', undo, expires: 8000 }, gone);
    vi.advanceTimersByTime(7999);
    expect(undoKeys.entries(doc)).toHaveLength(1);
    vi.advanceTimersByTime(1);
    expect(undoKeys.entries(doc)).toHaveLength(0);
    drop();
    expect(gone).toHaveBeenCalledTimes(1);
    ctrlZ(doc);
    expect(undo).not.toHaveBeenCalled();
  });
});

describe('useUndo', () => {
  it('pushes, reads the latest label, undoes from a menu and drops what it pushed when it unmounts', () => {
    const done = [];
    const view = mountHook(() => useUndo());
    view.current.push({ label: 'Load Hookshot in hand', undo: () => done.push('load') });
    view.current.push({ label: 'Save over Dark World start', undo: () => done.push('save') });
    expect(view.current.latest()).toBe('Save over Dark World start');
    expect(view.current.undo()).toBe(true);
    expect(done).toEqual(['save']);
    view.unmount();
    expect(view.current.latest()).toBeNull();
    expect(view.current.undo()).toBe(false);
    expect(page.count()).toBe(0);
  });
});

describe('a toast with undo', () => {
  it('draws Undo as its action and joins the stack while it shows; Ctrl+Z undoes it and closes it with action', () => {
    const undo = vi.fn();
    const close = vi.fn();
    const item = { id: 'loaded', message: 'Save loaded.', undo };
    const state = { live: true };
    const view = mountHook(() => useToastUndo(item, state.live, close));
    expect(view.current).toEqual({ label: 'Undo', onSelect: undo });
    ctrlZ(page);
    expect(undo).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledWith('action');
    expect(page.count()).toBe(0);
  });

  it('leaves the stack once it starts to close, and keeps its own action without undo', () => {
    const undo = vi.fn();
    const state = { live: true };
    const view = mountHook(() => useToastUndo({ id: 'loaded', message: 'Save loaded.', undo }, state.live, vi.fn()));
    expect(page.count()).toBe(1);
    state.live = false;
    view.rerender(() => useToastUndo({ id: 'loaded', message: 'Save loaded.', undo }, state.live, vi.fn()));
    expect(page.count()).toBe(0);
    const retry = { label: 'Retry', onSelect: vi.fn() };
    expect(mountHook(() => useToastUndo({ id: 'failed', message: 'Failed.', action: retry }, true, vi.fn())).current).toBe(retry);
  });
});

describe('ItemList deletes in the undo stack', () => {
  const SAVES = [{ id: 'a', name: 'Before the palace' }, { id: 'b', name: 'Hookshot in hand' }];
  const props = { title: 'Saves', items: SAVES, getId: (save) => save.id, getName: (save) => save.name };

  it('holds one step per waiting delete inside the list, named for its row, and drops it once the delete settles', () => {
    const restore = vi.fn();
    const row = { nodeType: 1 };
    const listRef = { current: node([row]) };
    const state = { pending: ['a', 'b'] };
    const view = mountHook(() => useItemListUndo(props, state.pending, restore, listRef));
    expect(undoKeys.entries(page).map((entry) => entry.step.label)).toEqual(['Undo the delete of Before the palace', 'Undo the delete of Hookshot in hand']);
    ctrlZ(page, { nodeType: 1 });
    expect(restore).not.toHaveBeenCalled();
    ctrlZ(page, row);
    expect(restore).toHaveBeenCalledWith('b');
    state.pending = ['a'];
    view.rerender(() => useItemListUndo(props, state.pending, restore, listRef));
    expect(undoKeys.entries(page)).toHaveLength(1);
    state.pending = [];
    view.rerender(() => useItemListUndo(props, state.pending, restore, listRef));
    expect(page.count()).toBe(0);
  });

  it('drops its steps when the list unmounts and takes them again on a strict remount', () => {
    const view = mountHook(() => useItemListUndo(props, ['a'], vi.fn(), { current: null }));
    view.strictRemount();
    expect(undoKeys.entries(page)).toHaveLength(1);
    view.unmount();
    expect(page.count()).toBe(0);
  });
});
