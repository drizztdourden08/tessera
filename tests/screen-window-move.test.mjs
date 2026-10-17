/* @layer tooling-scripts @kind test */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { keyStep } from '../src/composites/ScreenLayer/behavior/key-step';
import { moveBounds } from '../src/composites/ScreenLayer/behavior/move-bounds';
import { movedRect } from '../src/composites/ScreenLayer/behavior/moved-rect';
import { useLayerEscape } from '../src/composites/ScreenLayer/behavior/useLayerEscape';
import { useLayerMove } from '../src/composites/ScreenLayer/behavior/useLayerMove';
import { MOVE_MIN } from '../src/composites/ScreenLayer/ScreenLayer.constants';
import { storedRect } from '../src/composites/ScreenWindow/behavior/stored-rect';
import { useWindowLock } from '../src/composites/ScreenWindow/behavior/useWindowLock';
import { resizeRect } from '../src/composites/rect-drag/resize-rect';
import { mountHook } from './hook-harness.mjs';
import { escapeDocument } from './escape-document.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const ROOM = { x: 0, y: 0, width: 1000, height: 640 };
const at = (x, y, width, height) => ({ left: x, top: y, right: x + width, bottom: y + height, width, height });

const fakeFrame = (rect, parts = []) => {
  const room = { clientWidth: ROOM.width, clientHeight: ROOM.height, ownerDocument: { defaultView: {} }, getBoundingClientRect: () => at(0, 0, ROOM.width, ROOM.height) };
  return {
    parentElement: room,
    ownerDocument: { defaultView: {} },
    getBoundingClientRect: () => at(rect.x, rect.y, rect.width, rect.height),
    querySelectorAll: () => parts.map((part) => ({ getBoundingClientRect: () => at(part.x, part.y, part.width, part.height) })),
  };
};

const key = (name, shiftKey = false) => ({ key: name, shiftKey, preventDefault: vi.fn() });

describe('moving the window', () => {
  it('steps 16 px with the arrow keys and 64 px with Shift', () => {
    expect(keyStep('ArrowRight', false)).toEqual({ x: 16, y: 0 });
    expect(keyStep('ArrowUp', true)).toEqual({ x: 0, y: -64 });
    expect(keyStep('Enter', false)).toBeNull();
  });

  it('keeps the window and what hangs off it inside the screen', () => {
    const frame = fakeFrame({ x: 100, y: 100, width: 600, height: 400 }, [
      { x: 300, y: 82, width: 300, height: 37 },
      { x: 652, y: 92, width: 56, height: 24 },
    ]);
    const bounds = moveBounds(frame);
    expect(bounds).toEqual({ x: 0, y: 18, width: 992, height: 622 });
    expect(movedRect({ x: 100, y: 100, width: 600, height: 400 }, { x: -500, y: -500 }, bounds)).toEqual({ x: 0, y: 18, width: 600, height: 400 });
    expect(movedRect({ x: 100, y: 100, width: 600, height: 400 }, { x: 900, y: 900 }, bounds)).toEqual({ x: 392, y: 240, width: 600, height: 400 });
  });

  it('resizes from an edge down to the minimum size and never past the screen', () => {
    const limits = { bounds: ROOM, min: MOVE_MIN };
    const start = { x: 100, y: 100, width: 600, height: 400 };
    expect(resizeRect(start, 'se', { x: -900, y: -900 }, limits)).toEqual({ x: 100, y: 100, ...MOVE_MIN });
    expect(resizeRect(start, 'nw', { x: -900, y: -900 }, limits)).toEqual({ x: 0, y: 0, width: 700, height: 500 });
  });

  it('commits an arrow key move from the snapped spot, and leaves the window snapped while locked', () => {
    const onChange = vi.fn();
    const frame = fakeFrame({ x: 100, y: 100, width: 600, height: 400 });
    const view = mountHook(() => useLayerMove({ rect: null, onChange }, frame));
    expect(view.current.placed).toBeNull();
    const press = key('ArrowLeft', true);
    view.current.onBandKeyDown(press);
    expect(press.preventDefault).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ x: 36, y: 100, width: 600, height: 400 });
    view.rerender(() => useLayerMove(undefined, frame));
    expect(view.current.placed).toBeNull();
  });

  it('draws a saved rect clamped into the screen', () => {
    const frame = fakeFrame({ x: 100, y: 100, width: 600, height: 400 });
    const view = mountHook(() => useLayerMove({ rect: { x: 800, y: 500, width: 600, height: 400 }, onChange: vi.fn() }, frame));
    expect(view.current.placed).toEqual({ x: 400, y: 240, width: 600, height: 400 });
  });
});

describe('the window lock', () => {
  beforeEach(() => {
    const store = new Map();
    vi.stubGlobal('localStorage', { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('starts locked and snapped, unlocks, and snaps back on lock while it keeps the moved rect', () => {
    const onLockChange = vi.fn();
    const onRectChange = vi.fn();
    const props = { title: 'Data', onClose: vi.fn(), children: null, titleRow: false, movable: true, onLockChange, onRectChange };
    const view = mountHook(() => useWindowLock(props, true));
    expect(view.current.shown).toBe(true);
    expect(view.current.locked).toBe(true);
    expect(view.current.move).toBeUndefined();
    view.act((lock) => lock.toggle());
    expect(onLockChange).toHaveBeenLastCalledWith(false);
    expect(view.current.move?.rect).toBeNull();
    view.act((lock) => lock.move.onChange({ x: 10, y: 20, width: 600, height: 400 }));
    expect(onRectChange).toHaveBeenCalledWith({ x: 10, y: 20, width: 600, height: 400 });
    view.act((lock) => lock.toggle());
    expect(view.current.move).toBeUndefined();
    view.act((lock) => lock.toggle());
    expect(view.current.move?.rect).toEqual({ x: 10, y: 20, width: 600, height: 400 });
  });

  it('remembers the lock and the rect under storageKey', () => {
    const props = { title: 'Data', onClose: vi.fn(), children: null, movable: true, storageKey: 'hub' };
    const first = mountHook(() => useWindowLock(props, true));
    first.act((lock) => lock.toggle());
    first.act((lock) => lock.move.onChange({ x: 5, y: 6, width: 700, height: 500 }));
    expect(globalThis.localStorage.getItem('hub:locked')).toBe('false');
    expect(storedRect(JSON.parse(globalThis.localStorage.getItem('hub:rect')))).toEqual({ x: 5, y: 6, width: 700, height: 500 });
    const again = mountHook(() => useWindowLock(props, true));
    expect(again.current.locked).toBe(false);
    expect(again.current.move?.rect).toEqual({ x: 5, y: 6, width: 700, height: 500 });
  });

  it('follows a controlled locked prop and shows no lock with a title row', () => {
    const props = { title: 'Data', onClose: vi.fn(), children: null, movable: true, locked: false };
    expect(mountHook(() => useWindowLock(props, true)).current.locked).toBe(false);
    expect(mountHook(() => useWindowLock(props, false)).current.shown).toBe(false);
    expect(mountHook(() => useWindowLock(props, false)).current.move).toBeUndefined();
  });

  it('reads back only a whole rect', () => {
    expect(storedRect({ x: 1, y: 2, width: 3 })).toBeUndefined();
    expect(storedRect('x')).toBeUndefined();
    expect(storedRect({ x: 1, y: 2, width: 3, height: Number.NaN })).toBeUndefined();
  });
});

describe('Escape on a window with no title row', () => {
  it('still closes the window', () => {
    const page = escapeDocument();
    const onClose = vi.fn();
    mountHook(() => useLayerEscape({ ownerDocument: page, contains: () => true }, onClose));
    page.press('Escape');
    expect(onClose).toHaveBeenCalledOnce();
  });
});
