/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { keyActionOf } from '../src/composites/ResizeHandle/behavior/key-action-of';
import { resizeKeyDown } from '../src/composites/ResizeHandle/behavior/resize-key-down';
import { resizeOptionsOf } from '../src/composites/ResizeHandle/behavior/resize-options-of';

afterEach(() => vi.unstubAllGlobals());

const direction = () => vi.stubGlobal('getComputedStyle', () => ({ direction: 'ltr' }));
const fold = (extra = {}) => ({ sides: ['low'], folded: null, onFold: vi.fn(), onUnfold: vi.fn(), ...extra });
const keys = (extra = {}) => ({ min: 240, max: 480, step: 16, largeStep: 64, orientation: 'horizontal', edge: 'start', canReset: false, ...extra });
const press = (key, extra = {}) => ({ key, shiftKey: false, currentTarget: {}, ...extra });

describe('keyActionOf with a fold', () => {
  it('folds the low side on the arrow that pushes past min, and only from min', () => {
    direction();
    const rulesOf = keys({ fold: fold() });
    expect(keyActionOf(press('ArrowLeft'), 240, rulesOf)).toEqual({ kind: 'fold', side: 'low' });
    expect(keyActionOf(press('ArrowLeft'), 250, rulesOf)).toEqual({ kind: 'move', to: 240 });
    expect(keyActionOf(press('ArrowRight'), 480, rulesOf)).toEqual({ kind: 'move', to: 480 });
    expect(keyActionOf(press('ArrowRight'), 240, rulesOf)).toEqual({ kind: 'move', to: 256 });
  });

  it('folds the high side at max, and reads the arrows for an end edge the other way', () => {
    direction();
    expect(keyActionOf(press('ArrowRight'), 480, keys({ fold: fold({ sides: ['high'] }) }))).toEqual({ kind: 'fold', side: 'high' });
    expect(keyActionOf(press('ArrowRight'), 240, keys({ edge: 'end', fold: fold() }))).toEqual({ kind: 'fold', side: 'low' });
    expect(keyActionOf(press('ArrowLeft', { shiftKey: true }), 300, keys({ fold: fold() }))).toEqual({ kind: 'move', to: 240 });
  });

  it('unfolds a low fold with the arrow away from it, to min, and ignores the arrow toward it', () => {
    direction();
    const rulesOf = keys({ fold: fold({ folded: 'low' }) });
    expect(keyActionOf(press('ArrowRight'), 0, rulesOf)).toEqual({ kind: 'unfold', side: 'low', to: 240 });
    expect(keyActionOf(press('ArrowLeft'), 0, rulesOf)).toBeNull();
    expect(keyActionOf(press('Home'), 0, rulesOf)).toBeNull();
  });

  it('unfolds a high fold with the arrow away from it, to max', () => {
    direction();
    const rulesOf = keys({ fold: fold({ sides: ['low', 'high'], folded: 'high' }) });
    expect(keyActionOf(press('ArrowLeft'), 480, rulesOf)).toEqual({ kind: 'unfold', side: 'high', to: 480 });
    expect(keyActionOf(press('ArrowRight'), 480, rulesOf)).toBeNull();
  });

  it('toggles the fold with Enter, and keeps Space and the limits for the reset', () => {
    direction();
    expect(keyActionOf(press('Enter'), 300, keys({ fold: fold() }))).toEqual({ kind: 'fold', side: 'low' });
    expect(keyActionOf(press('Enter'), 0, keys({ fold: fold({ folded: 'low' }) }))).toEqual({ kind: 'unfold', side: 'low', to: 240 });
    expect(keyActionOf(press(' '), 300, keys({ fold: fold(), canReset: true }))).toEqual({ kind: 'reset' });
    expect(keyActionOf(press('Enter'), 300, keys({ fold: fold({ sides: [] }) }))).toBeNull();
    expect(keyActionOf(press('Home'), 300, keys({ fold: fold() }))).toEqual({ kind: 'move', to: 240 });
  });
});

describe('keyActionOf without a fold', () => {
  it('moves clamped, resets with Enter when it can, and goes to the limits with Home and End', () => {
    direction();
    expect(keyActionOf(press('ArrowLeft'), 240, keys())).toEqual({ kind: 'move', to: 240 });
    expect(keyActionOf(press('ArrowRight', { shiftKey: true }), 460, keys())).toEqual({ kind: 'move', to: 480 });
    expect(keyActionOf(press('Enter'), 300, keys())).toBeNull();
    expect(keyActionOf(press('Enter'), 300, keys({ canReset: true }))).toEqual({ kind: 'reset' });
    expect(keyActionOf(press('Home'), 300, keys())).toEqual({ kind: 'move', to: 240 });
    expect(keyActionOf(press('End'), 300, keys())).toEqual({ kind: 'move', to: 480 });
    expect(keyActionOf(press('ArrowUp'), 300, keys())).toBeNull();
  });
});

describe('resizeKeyDown with a fold', () => {
  const handle = (extra = {}) => {
    const onResize = vi.fn();
    const options = resizeOptionsOf({ label: 'r', value: 240, min: 240, max: 480, onResize, ...extra });
    const down = (key) => {
      const event = { key, shiftKey: false, currentTarget: {}, defaultPrevented: false, preventDefault: vi.fn() };
      resizeKeyDown(event, options);
      return event;
    };
    return { onResize, down };
  };

  it('calls onFold at min, and onUnfold with the open value while folded, never a resize', () => {
    direction();
    const open = fold();
    const at240 = handle({ fold: open });
    expect(at240.down('ArrowLeft').preventDefault).toHaveBeenCalledTimes(1);
    expect(open.onFold.mock.calls).toEqual([['low']]);
    const closed = fold({ folded: 'low' });
    const folded = handle({ fold: closed, value: 300 });
    folded.down('ArrowRight');
    folded.down('Enter');
    expect(closed.onUnfold.mock.calls).toEqual([['low', 240], ['low', 240]]);
    expect(folded.down('ArrowLeft').preventDefault).not.toHaveBeenCalled();
    expect(at240.onResize).not.toHaveBeenCalled();
    expect(folded.onResize).not.toHaveBeenCalled();
  });
});
