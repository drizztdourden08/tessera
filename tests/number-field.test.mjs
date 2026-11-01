/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { ladderStep } from '../src/composites/NumberField/behavior/ladder-step';
import { presetOf } from '../src/composites/NumberField/behavior/preset-of';
import { stepNumber } from '../src/composites/NumberField/behavior/step-number';

const ZOOM = [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];
const config = { step: 1, fineStep: 0.1, fine: false };

describe('K1 stepNumber', { tags: ['critical'] }, () => {
  it('steps by the step, or by the fine step while Shift is down, and clamps', () => {
    expect(stepNumber(10, 1, config)).toBe(11);
    expect(stepNumber(10, -3, config)).toBe(7);
    expect(stepNumber(10, 1, { ...config, fine: true })).toBe(10.1);
    expect(stepNumber(0.3, 1, { ...config, fine: true })).toBe(0.4);
    expect(stepNumber(99, 5, { ...config, max: 100 })).toBe(100);
    expect(stepNumber(1, -5, { ...config, min: 0 })).toBe(0);
  });

  it('starts from the minimum, or zero, when the value is not a number', () => {
    expect(stepNumber(Number.NaN, 1, { ...config, min: 5 })).toBe(6);
    expect(stepNumber(Number.NaN, 1, config)).toBe(1);
  });

  it('goes through the stops of a ladder, and a fine step leaves the ladder', () => {
    expect(stepNumber(100, 1, { ...config, ladder: ZOOM })).toBe(200);
    expect(stepNumber(100, -1, { ...config, ladder: ZOOM })).toBe(50);
    expect(stepNumber(100, 1, { ...config, fine: true, fineStep: 1, ladder: ZOOM })).toBe(101);
  });
});

describe('K1 ladderStep, the ZoomField recipe from 25 to 12800 percent', { tags: ['critical'] }, () => {
  it('runs the whole zoom ladder up and down and stops at the ends', () => {
    expect(ladderStep(25, 1, ZOOM)).toBe(50);
    expect(ladderStep(25, 9, ZOOM)).toBe(12800);
    expect(ladderStep(12800, 1, ZOOM)).toBe(12800);
    expect(ladderStep(25, -1, ZOOM)).toBe(25);
    expect(ladderStep(12800, -9, ZOOM)).toBe(25);
  });

  it('moves a value between two stops to the next one in the direction of the step', () => {
    expect(ladderStep(150, 1, ZOOM)).toBe(200);
    expect(ladderStep(150, -1, ZOOM)).toBe(100);
    expect(ladderStep(10, 1, ZOOM)).toBe(25);
  });

  it('takes a ladder in any order, and does nothing without stops', () => {
    expect(ladderStep(100, 1, [400, 25, 100, 200])).toBe(200);
    expect(ladderStep(7, 1, [])).toBe(7);
    expect(ladderStep(7, 0, ZOOM)).toBe(7);
  });
});

describe('K1 presetOf', { tags: ['critical'] }, () => {
  it('turns a plain number into a preset and keeps a labelled one', () => {
    expect(presetOf(50)).toEqual({ value: 50 });
    expect(presetOf({ value: 100, label: 'Actual size' })).toEqual({ value: 100, label: 'Actual size' });
  });
});
