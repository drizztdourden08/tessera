/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePaneSize } from '../src/composites/ResizeHandle/behavior/usePaneSize';
import { resizeKeyDown } from '../src/composites/ResizeHandle/behavior/resize-key-down';
import { resizeOptionsOf } from '../src/composites/ResizeHandle/behavior/resize-options-of';
import { useResizeDrag } from '../src/composites/ResizeHandle/behavior/useResizeDrag';
import { twoColumnsFit } from '../src/primitives/Grid/behavior/two-columns-fit';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const direction = (value) => vi.stubGlobal('getComputedStyle', () => ({ direction: value }));

afterEach(() => vi.unstubAllGlobals());

const press = (key, extra = {}) => {
  const event = { key, shiftKey: false, currentTarget: {}, defaultPrevented: false, ...extra };
  event.preventDefault = () => {
    event.defaultPrevented = true;
  };
  return event;
};

const handleWith = (extra = {}) => {
  const onResize = vi.fn();
  const onResizeEnd = vi.fn();
  const options = resizeOptionsOf({ label: 'Resize', value: 320, min: 240, max: 480, onResize, onResizeEnd, ...extra });
  const key = (name, more) => {
    const event = press(name, more);
    resizeKeyDown(event, options);
    return event;
  };
  return { options, onResize, onResizeEnd, key };
};

describe('ResizeHandle keys, as a window splitter', () => {
  it('moves by the step with the arrows, by the large step with Shift, and to the limits with Home and End', () => {
    direction('ltr');
    const { key, onResize, onResizeEnd } = handleWith();
    key('ArrowRight');
    key('ArrowLeft', { shiftKey: true });
    key('Home');
    key('End');
    expect(onResize.mock.calls).toEqual([
      [336, { from: 320, by: 'key' }], [256, { from: 320, by: 'key' }], [240, { from: 320, by: 'key' }], [480, { from: 320, by: 'key' }],
    ]);
    expect(onResizeEnd.mock.calls.map(([size]) => size)).toEqual([336, 256, 240, 480]);
  });

  it('stays inside its range and leaves keys it does not use, or that a control already took', () => {
    direction('ltr');
    const { key, onResize } = handleWith({ value: 476 });
    expect(key('ArrowRight').defaultPrevented).toBe(true);
    expect(onResize).toHaveBeenLastCalledWith(480, { from: 476, by: 'key' });
    expect(key('a').defaultPrevented).toBe(false);
    expect(key('Enter').defaultPrevented).toBe(false);
    key('ArrowLeft', { defaultPrevented: true });
    expect(onResize).toHaveBeenCalledTimes(1);
  });

  it('folds the pane with Enter when it can, and resets it with Enter or Space otherwise', () => {
    const onReset = vi.fn();
    const onCollapse = vi.fn();
    handleWith({ onReset }).key('Enter');
    handleWith({ onReset }).key(' ');
    expect(onReset).toHaveBeenCalledTimes(2);
    const folding = handleWith({ onReset, onCollapse });
    folding.key('Enter');
    folding.key(' ');
    expect(onCollapse).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(3);
  });

  it('flips the arrows for a pane at the end edge, in right to left text, and uses Up and Down when stacked', () => {
    direction('ltr');
    const end = handleWith({ edge: 'end' });
    end.key('ArrowRight');
    expect(end.onResize).toHaveBeenLastCalledWith(304, { from: 320, by: 'key' });
    direction('rtl');
    const rtl = handleWith();
    rtl.key('ArrowRight');
    expect(rtl.onResize).toHaveBeenLastCalledWith(304, { from: 320, by: 'key' });
    const stacked = handleWith({ orientation: 'vertical', edge: 'end' });
    stacked.key('ArrowRight');
    stacked.key('ArrowUp');
    expect(stacked.onResize.mock.calls).toEqual([[336, { from: 320, by: 'key' }]]);
  });
});

const handle = () => ({ focus: vi.fn(), setPointerCapture: vi.fn(), hasPointerCapture: () => true, releasePointerCapture: vi.fn() });

const pointer = (target, clientX, extra = {}) => ({
  button: 0, buttons: 1, pointerId: 1, clientX, clientY: 0, currentTarget: target, preventDefault: vi.fn(), stopPropagation: vi.fn(), ...extra,
});

const mountDrag = (extra = {}) => {
  const onResize = vi.fn();
  const onResizeEnd = vi.fn();
  const onDragChange = vi.fn();
  const options = { label: 'Resize', value: 320, min: 240, max: 480, onResize, onResizeEnd, onDragChange, ...extra };
  const view = mountHook(() => useResizeDrag(resizeOptionsOf(options)));
  return { view, onResize, onResizeEnd, onDragChange };
};

describe('ResizeHandle drag', () => {
  it('follows the pointer from where the drag started, inside the range, and commits once on release', () => {
    direction('ltr');
    const { view, onResize, onResizeEnd, onDragChange } = mountDrag();
    const target = handle();
    view.act((drag) => drag.onPointerDown(pointer(target, 100)));
    expect(view.current.dragging).toBe(true);
    view.act((drag) => drag.onPointerMove(pointer(target, 130)));
    view.act((drag) => drag.onPointerMove(pointer(target, 400)));
    view.act((drag) => drag.onPointerUp(pointer(target, 400)));
    expect(onResize.mock.calls).toEqual([[350, { from: 320, by: 'drag' }], [480, { from: 350, by: 'drag' }]]);
    expect(onResizeEnd).toHaveBeenCalledWith(480);
    expect(onDragChange.mock.calls).toEqual([[true], [false]]);
    expect(view.current.dragging).toBe(false);
  });

  it('shrinks a pane at the end edge as the pointer moves toward it', () => {
    direction('ltr');
    const { view, onResize } = mountDrag({ edge: 'end' });
    const target = handle();
    view.act((drag) => drag.onPointerDown(pointer(target, 100)));
    view.act((drag) => drag.onPointerMove(pointer(target, 140)));
    expect(onResize).toHaveBeenLastCalledWith(280, { from: 320, by: 'drag' });
  });

  it('starts from the measured size and scales the pointer by pixelsPerUnit', () => {
    direction('ltr');
    const { view, onResize } = mountDrag({ value: undefined, min: 0, max: 100, measure: () => 50, pixelsPerUnit: () => 8 });
    const target = handle();
    view.act((drag) => drag.onPointerDown(pointer(target, 0)));
    view.act((drag) => drag.onPointerMove(pointer(target, 80)));
    expect(onResize).toHaveBeenLastCalledWith(60, { from: 50, by: 'drag' });
  });

  it('ignores a right press, and a release with no move commits nothing', () => {
    const { view, onResizeEnd, onDragChange } = mountDrag();
    const target = handle();
    view.act((drag) => drag.onPointerDown(pointer(target, 0, { button: 2 })));
    expect(onDragChange).not.toHaveBeenCalled();
    direction('ltr');
    view.act((drag) => drag.onPointerDown(pointer(target, 0)));
    view.act((drag) => drag.onPointerUp(pointer(target, 0)));
    expect(onResizeEnd).not.toHaveBeenCalled();
  });
});

describe('usePaneSize', () => {
  it('keeps a whole number of pixels inside its limits, stores it when a change ends, and resets to the start', () => {
    const stored = new Map();
    vi.stubGlobal('localStorage', { getItem: (name) => stored.get(name) ?? null, setItem: (name, value) => stored.set(name, value) });
    const view = mountHook(() => usePaneSize({ initial: 320, min: 240, max: 480, storageKey: 'hud.outline' }));
    expect(view.current.handle).toMatchObject({ value: 320, min: 240, max: 480 });
    view.act((pane) => pane.handle.onResize(999.4));
    expect(view.current.size).toBe(480);
    view.act((pane) => pane.handle.onResizeEnd(333.4));
    expect(stored.get('hud.outline')).toBe('333');
    view.act((pane) => pane.handle.onDragChange(true));
    expect(view.current.dragging).toBe(true);
    view.act((pane) => pane.handle.onReset());
    expect(view.current.size).toBe(320);
    expect(stored.get('hud.outline')).toBe('320');
  });

  it('starts at a stored size, kept inside its limits, and only from a number', () => {
    const saved = { a: '999', b: '"wide"' };
    vi.stubGlobal('localStorage', { getItem: (name) => saved[name] ?? null });
    expect(mountHook(() => usePaneSize({ initial: 320, min: 240, max: 480, storageKey: 'a' })).current.size).toBe(480);
    expect(mountHook(() => usePaneSize({ initial: 320, min: 240, max: 480, storageKey: 'b' })).current.size).toBe(320);
  });
});

const grid = (dataset, clientWidth, columnGap = '16px') => {
  vi.stubGlobal('getComputedStyle', () => ({ paddingInlineStart: '0px', paddingInlineEnd: '0px', columnGap }));
  return { dataset, clientWidth };
};

describe('Grid.Cell span 2', () => {
  it('spans two columns only once two fit, at any column width', () => {
    expect(twoColumnsFit(grid({ minCol: '288' }, 591))).toBe(false);
    expect(twoColumnsFit(grid({ minCol: '288' }, 592))).toBe(true);
    expect(twoColumnsFit(grid({ minCol: '160' }, 335))).toBe(false);
    expect(twoColumnsFit(grid({ minCol: '160' }, 336))).toBe(true);
    expect(twoColumnsFit(grid({ minCol: '400' }, 800, '0px'))).toBe(true);
  });

  it('follows a fixed column count, and spans in a grid with no template', () => {
    expect(twoColumnsFit(grid({ columns: '1' }, 900))).toBe(false);
    expect(twoColumnsFit(grid({ columns: '3' }, 200))).toBe(true);
    expect(twoColumnsFit(grid({}, 200))).toBe(true);
  });
});
