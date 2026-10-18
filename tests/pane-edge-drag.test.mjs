/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { dragStep } from '../src/composites/ResizeHandle/behavior/drag-step';

const origin = (extra = {}) => ({ pointer: 100, start: 300, last: 300, pixelsPerUnit: 1, sign: 1, snap: 32, folded: null, moved: false, ...extra });
const rules = (extra = {}) => ({ min: 240, max: 480, sides: ['low', 'high'], ...extra });
const at = (from, extra) => dragStep(origin(extra), 100 + (from - (extra?.start ?? 300)), rules());

describe('dragStep, an open pane', () => {
  it('folds the low side past min minus the snap, and rebases the origin on the pointer', () => {
    const step = dragStep(origin(), -20, rules());
    expect(step.outcome).toEqual({ kind: 'fold', side: 'low' });
    expect(step.origin).toMatchObject({ folded: 'low', start: 0, last: 0, pointer: -20, moved: true, snap: 32, sign: 1 });
  });

  it('only clamps to min between min minus the snap and min, and does not fold on the exact snap line', () => {
    expect(at(215).outcome).toEqual({ kind: 'resize', to: 240, from: 300 });
    expect(at(215).origin).toMatchObject({ folded: null, last: 240, moved: true });
    expect(at(208).outcome).toEqual({ kind: 'resize', to: 240, from: 300 });
    expect(at(207).outcome).toEqual({ kind: 'fold', side: 'low' });
  });

  it('follows the pointer inside the range, from where the last step left it, and does nothing when nothing changes', () => {
    const first = at(350);
    expect(first.outcome).toEqual({ kind: 'resize', to: 350, from: 300 });
    expect(dragStep(first.origin, 150, rules())).toMatchObject({ outcome: null });
    expect(dragStep(first.origin, 160, rules()).outcome).toEqual({ kind: 'resize', to: 360, from: 350 });
    expect(dragStep(origin({ start: 240, last: 240 }), 100, rules()).outcome).toBeNull();
  });

  it('mirrors on the high side: folds past max plus the snap, clamps to max before it', () => {
    const step = dragStep(origin(), 320, rules());
    expect(step.outcome).toEqual({ kind: 'fold', side: 'high' });
    expect(step.origin).toMatchObject({ folded: 'high', start: 480, last: 480, pointer: 320, moved: true });
    expect(at(512).outcome).toEqual({ kind: 'resize', to: 480, from: 300 });
    expect(at(513).outcome).toEqual({ kind: 'fold', side: 'high' });
  });

  it('never folds a side the rules do not name', () => {
    expect(dragStep(origin(), -500, rules({ sides: [] })).outcome).toEqual({ kind: 'resize', to: 240, from: 300 });
    expect(dragStep(origin(), 900, rules({ sides: [] })).outcome).toEqual({ kind: 'resize', to: 480, from: 300 });
    expect(dragStep(origin(), -500, rules({ sides: ['high'] })).outcome).toMatchObject({ kind: 'resize', to: 240 });
    expect(dragStep(origin(), 900, rules({ sides: ['low'] })).outcome).toMatchObject({ kind: 'resize', to: 480 });
  });

  it('reads the pointer through the sign and pixelsPerUnit of the origin', () => {
    expect(dragStep(origin({ sign: -1 }), 140, rules()).outcome).toEqual({ kind: 'resize', to: 260, from: 300 });
    expect(dragStep(origin({ pixelsPerUnit: 8, start: 50, last: 50 }), 180, rules({ min: 0, max: 100 })).outcome).toEqual({ kind: 'resize', to: 60, from: 50 });
    expect(dragStep(origin({ sign: -1 }), 300, rules()).outcome).toEqual({ kind: 'fold', side: 'low' });
  });
});

describe('dragStep, a folded pane', () => {
  const low = (extra) => origin({ pointer: 0, start: 0, last: 0, folded: 'low', moved: true, ...extra });
  const high = (extra) => origin({ pointer: 0, start: 480, last: 480, folded: 'high', moved: true, ...extra });

  it('does nothing while dragged out less than the snap', () => {
    const before = low();
    const step = dragStep(before, 31, rules());
    expect(step.outcome).toBeNull();
    expect(step.origin).toBe(before);
    expect(dragStep(before, -50, rules()).outcome).toBeNull();
  });

  it('unfolds past the snap to min, and rebases the start to min with the pointer where it is', () => {
    const step = dragStep(low(), 32, rules());
    expect(step.outcome).toEqual({ kind: 'unfold', side: 'low', to: 240 });
    expect(step.origin).toMatchObject({ folded: null, start: 240, last: 240, pointer: 32, moved: true });
    expect(dragStep(step.origin, 82, rules()).outcome).toEqual({ kind: 'resize', to: 290, from: 240 });
  });

  it('mirrors on the high side: unfolds when raw is at most max minus the snap', () => {
    const before = high();
    expect(dragStep(before, -31, rules()).outcome).toBeNull();
    const step = dragStep(before, -32, rules());
    expect(step.outcome).toEqual({ kind: 'unfold', side: 'high', to: 480 });
    expect(step.origin).toMatchObject({ folded: null, start: 480, last: 480, pointer: -32 });
    expect(dragStep(before, 60, rules()).outcome).toBeNull();
  });
});
