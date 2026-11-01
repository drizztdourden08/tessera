/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { pixelatedOf } from '../src/primitives/Image/behavior/pixelated-of';
import { viewerKey } from '../src/composites/MediaViewer/behavior/viewer-key';
import { zoomLevels } from '../src/composites/MediaViewer/behavior/zoom-levels';

vi.mock('../src/primitives/Portal/Portal', () => ({ Portal: ({ children }) => children }));
vi.mock('../src/composites/DialogShell/behavior/useDialogFocus', () => ({ useDialogFocus: vi.fn() }));
vi.mock('../src/composites/DialogShell/behavior/useDialogEscape', () => ({ useDialogEscape: vi.fn() }));

describe('K1 zoom steps', { tags: ['critical'] }, () => {
  it('sit around Fit, from 100% to 1600%', () => {
    expect(zoomLevels(null)).toEqual(['fit']);
    expect(zoomLevels(0.4)).toEqual(['fit', 1, 2, 4, 8, 16]);
    expect(zoomLevels(4.77)).toEqual([1, 2, 4, 'fit', 8, 16]);
    expect(zoomLevels(4)).toEqual([1, 2, 'fit', 8, 16]);
  });
});

describe('K1 sharp pixels', { tags: ['critical'] }, () => {
  it('turn on by themselves for a picture of 256 pixels or less, or when asked', () => {
    expect(pixelatedOf('auto', { width: 240, height: 120 })).toBe(true);
    expect(pixelatedOf('auto', { width: 1280, height: 720 })).toBe(false);
    expect(pixelatedOf('auto', null)).toBe(false);
    expect(pixelatedOf(true, { width: 1280, height: 720 })).toBe(true);
    expect(pixelatedOf(false, { width: 16, height: 16 })).toBe(false);
  });
});

describe('K1 the keys of the viewer', { tags: ['critical'] }, () => {
  const zoom = () => ({ zoomIn: vi.fn(), zoomOut: vi.fn(), fit: vi.fn() });
  const press = (key, extra = {}) => ({ key, defaultPrevented: false, target: { closest: () => null }, preventDefault: vi.fn(), ...extra });

  it('zoom with plus, equals and minus, and go back to Fit with 0', () => {
    const state = zoom();
    ['+', '=', '-', '0'].forEach((key) => viewerKey(press(key), state, vi.fn()));
    expect(state.zoomIn).toHaveBeenCalledTimes(2);
    expect(state.zoomOut).toHaveBeenCalledOnce();
    expect(state.fit).toHaveBeenCalledOnce();
  });

  it('move through the set with Left and Right', () => {
    const step = vi.fn();
    const event = press('ArrowLeft');
    viewerKey(event, null, step);
    viewerKey(press('ArrowRight'), null, step);
    expect(step.mock.calls).toEqual([[-1], [1]]);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });

  it('leave alone a key a control took, a shortcut, a video or a slider, and zoom keys on a video', () => {
    const step = vi.fn();
    const state = zoom();
    viewerKey(press('ArrowLeft', { defaultPrevented: true }), state, step);
    viewerKey(press('ArrowLeft', { ctrlKey: true }), state, step);
    viewerKey(press('ArrowLeft', { target: { closest: (selector) => (selector.includes('video') ? {} : null) } }), state, step);
    viewerKey(press('+'), null, step);
    expect(step).not.toHaveBeenCalled();
    expect(state.zoomIn).not.toHaveBeenCalled();
  });
});
