/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { sweepSession } from '../src/composites/toggle-sweep/sweep-session';
import { useToggleSweep } from '../src/composites/toggle-sweep/useToggleSweep';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const IDS = ['a', 'b', 'c', 'd', 'e'];

describe('K1 a sweep session', { tags: ['critical'] }, () => {
  it('sets the first key at once and reports every key once', () => {
    const onSet = vi.fn();
    const session = sweepSession({ first: 'a', value: true, onSet });
    expect(onSet).toHaveBeenCalledWith('a', true);
    session.over('b');
    session.over('a');
    session.over('b');
    expect(onSet.mock.calls.map((call) => call[0])).toEqual(['a', 'b']);
    expect(session.keys()).toEqual(['a', 'b']);
  });

  it('fills the keys between two touches when the order is known', () => {
    const onSet = vi.fn();
    const session = sweepSession({ first: 'a', value: false, order: IDS, onSet });
    session.over('d');
    expect(session.keys()).toEqual(['a', 'b', 'c', 'd']);
    session.over('b');
    expect(onSet).toHaveBeenCalledTimes(4);
  });

  it('skips the keys between two touches when there is no order', () => {
    const session = sweepSession({ first: 'a', value: true, onSet: vi.fn() });
    session.over('d');
    expect(session.keys()).toEqual(['a', 'd']);
  });
});

const fakeView = (keyAt) => {
  const listeners = new Map();
  const view = {
    document: { elementFromPoint: (x) => ({ closest: () => ({ getAttribute: () => keyAt(x) }) }) },
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener: (name) => listeners.delete(name),
  };
  return { view, fire: (name, event = {}) => listeners.get(name)?.(event), listening: () => listeners.size };
};

const press = (view) => ({ button: 0, currentTarget: { ownerDocument: { defaultView: view } } });

describe('K1 useToggleSweep', { tags: ['critical'] }, () => {
  it('sets the opposite of the pressed toggle on every toggle the pointer crosses, once the drag ends it reports them', () => {
    const { view, fire } = fakeView((x) => IDS[x]);
    const onSet = vi.fn();
    const onEnd = vi.fn();
    const sweep = mountHook(() => useToggleSweep({ onSet, onEnd, order: IDS }));
    sweep.act((now) => now.bind('b', true).onPointerDown(press(view)));
    expect(sweep.current.sweeping).toBe(true);
    expect(onSet).toHaveBeenCalledWith('b', false);
    fire('pointermove', { clientX: 3, clientY: 0 });
    fire('pointermove', { clientX: 3, clientY: 0 });
    sweep.act(() => fire('pointerup'));
    expect(onSet.mock.calls).toEqual([['b', false], ['c', false], ['d', false]]);
    expect(onEnd).toHaveBeenCalledWith(['b', 'c', 'd'], false);
    expect(sweep.current.sweeping).toBe(false);
  });

  it('names the key on the element it binds', () => {
    const sweep = mountHook(() => useToggleSweep({ onSet: vi.fn() }));
    expect(sweep.current.bind('layer-2', false)['data-sweep-key']).toBe('layer-2');
  });
});

describe('K1 useToggleSweep commit and listeners', { tags: ['critical'] }, () => {
  it('changes nothing until the end when only onEnd is given, and lists the keys reached meanwhile', () => {
    const { view, fire } = fakeView((x) => IDS[x]);
    const onEnd = vi.fn();
    const sweep = mountHook(() => useToggleSweep({ onEnd, order: IDS }));
    sweep.act((now) => now.bind('a', false).onPointerDown(press(view)));
    expect(sweep.current.touched).toEqual(['a']);
    expect(sweep.current.value).toBe(true);
    sweep.act(() => fire('pointermove', { clientX: 2, clientY: 0 }));
    expect(sweep.current.touched).toEqual(['a', 'b', 'c']);
    expect(onEnd).not.toHaveBeenCalled();
    sweep.act(() => fire('pointerup'));
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledWith(['a', 'b', 'c'], true);
    expect(sweep.current.touched).toEqual([]);
    expect(sweep.current.value).toBeNull();
  });

  it('listens to the window only while a sweep runs', () => {
    const { view, fire, listening } = fakeView(() => null);
    const sweep = mountHook(() => useToggleSweep({ onSet: vi.fn() }));
    expect(listening()).toBe(0);
    sweep.act((now) => now.bind('a', false).onPointerDown(press(view)));
    expect(listening()).toBe(3);
    sweep.act(() => fire('pointercancel'));
    expect(listening()).toBe(0);
  });

  it('ignores a press that is not the main button', () => {
    const { view } = fakeView(() => null);
    const onSet = vi.fn();
    const sweep = mountHook(() => useToggleSweep({ onSet }));
    sweep.act((now) => now.bind('a', false).onPointerDown({ ...press(view), button: 2 }));
    expect(onSet).not.toHaveBeenCalled();
    expect(sweep.current.sweeping).toBe(false);
  });

  const clickEvent = (detail) => ({ detail, preventDefault: vi.fn(), stopPropagation: vi.fn() });

  it('takes the click of a pointer after a press that started a sweep', () => {
    const { view } = fakeView(() => null);
    const sweep = mountHook(() => useToggleSweep({ onSet: vi.fn() }));
    sweep.act((now) => now.bind('a', false).onPointerDown(press(view)));
    const pointer = clickEvent(1);
    sweep.current.bind('a', false).onClickCapture(pointer);
    expect(pointer.preventDefault).toHaveBeenCalled();
    expect(pointer.stopPropagation).toHaveBeenCalled();
  });

  it('lets the click of a pointer through when no press started a sweep', () => {
    const sweep = mountHook(() => useToggleSweep({ onSet: vi.fn() }));
    const pointer = clickEvent(1);
    sweep.current.bind('a', false).onClickCapture(pointer);
    expect(pointer.preventDefault).not.toHaveBeenCalled();
    expect(pointer.stopPropagation).not.toHaveBeenCalled();
  });

  it('lets the click of a key through even after a sweep press', () => {
    const { view } = fakeView(() => null);
    const sweep = mountHook(() => useToggleSweep({ onSet: vi.fn() }));
    sweep.act((now) => now.bind('a', false).onPointerDown(press(view)));
    const key = clickEvent(0);
    sweep.current.bind('a', false).onClickCapture(key);
    expect(key.preventDefault).not.toHaveBeenCalled();
  });
});

describe('K1 useToggleSweep start options', { tags: ['critical'] }, () => {
  it('starts no sweep and leaves the click alone when startWhen says no', () => {
    const { view } = fakeView(() => null);
    const onSet = vi.fn();
    const sweep = mountHook(() => useToggleSweep({ onSet, startWhen: (event) => !event.ctrlKey }));
    sweep.act((now) => now.bind('a', false).onPointerDown({ ...press(view), ctrlKey: true }));
    expect(onSet).not.toHaveBeenCalled();
    expect(sweep.current.sweeping).toBe(false);
    const pointer = { detail: 1, preventDefault: vi.fn(), stopPropagation: vi.fn() };
    sweep.current.bind('a', false).onClickCapture(pointer);
    expect(pointer.preventDefault).not.toHaveBeenCalled();
  });

  it('starts a sweep when startWhen says yes', () => {
    const { view } = fakeView(() => null);
    const sweep = mountHook(() => useToggleSweep({ onSet: vi.fn(), startWhen: (event) => !event.ctrlKey }));
    sweep.act((now) => now.bind('a', false).onPointerDown({ ...press(view), ctrlKey: false }));
    expect(sweep.current.sweeping).toBe(true);
  });

  it('sets every key expandStart returns together with the pressed one', () => {
    const { view } = fakeView(() => null);
    const onSet = vi.fn();
    const sweep = mountHook(() => useToggleSweep({ onSet, expandStart: (key) => (key === 'b' ? ['b', 'c', 'e'] : [key]) }));
    sweep.act((now) => now.bind('b', false).onPointerDown(press(view)));
    expect(onSet.mock.calls).toEqual([['b', true], ['c', true], ['e', true]]);
    expect(sweep.current.touched).toEqual(['b', 'c', 'e']);
  });
});
