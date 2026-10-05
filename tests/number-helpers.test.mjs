/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { formatNumber as formatSlot } from '../src/composites/DynamicInput/behavior/format-number';
import { stepValue } from '../src/primitives/NumberInput/behavior/step-value';
import { clampNumber } from '../src/primitives/value-rule/clamp-number';
import { formatDecimal } from '../src/primitives/value-rule/format-decimal';
import { formatNumber } from '../src/primitives/value-rule/format-number';

describe('clampNumber', () => {
  it('keeps a number inside its bounds, either bound left out', () => {
    expect(clampNumber(5, 0, 10)).toBe(5);
    expect(clampNumber(-3, 0, 10)).toBe(0);
    expect(clampNumber(12, 0, 10)).toBe(10);
    expect(clampNumber(12, undefined, 10)).toBe(10);
    expect(clampNumber(-12, 0)).toBe(0);
    expect(clampNumber(7)).toBe(7);
  });

  it('lets the lower bound win when the bounds cross', () => {
    expect(clampNumber(5, 8, 2)).toBe(8);
  });

  it('steps a NumberInput inside its bounds', () => {
    expect(stepValue(9, 1, { step: 2, min: 0, max: 10 })).toBe(10);
    expect(stepValue(0.1, 1, { step: 0.2 })).toBe(0.3);
    expect(stepValue('', -1, { min: 3 })).toBe(3);
  });
});

describe('formatDecimal', () => {
  it('writes a number with its places, grouping, padding and sign', () => {
    expect(formatDecimal(1234.5, { minDecimals: 2, maxDecimals: 2, grouping: true })).toBe('1,234.50');
    expect(formatDecimal(7, { minDecimals: 0, maxDecimals: 0, grouping: false, pad: 3 })).toBe('007');
    expect(formatDecimal(3, { minDecimals: 0, maxDecimals: 1, grouping: false, sign: true })).toBe('+3');
  });

  it('is what the value rules and DynamicInput slots write', () => {
    expect(formatNumber(-0.001, { minDecimals: 0, maxDecimals: 1, grouping: false, sign: true })).toBe('0');
    expect(formatNumber(1500, { minDecimals: 1, maxDecimals: 1, grouping: true, sign: false })).toBe('1,500.0');
    expect(formatSlot(-1234.567, { type: 'decimal', places: 2, group: true }, true)).toBe('-1,234.57');
    expect(formatSlot(5, { type: 'number', pad: 2 }, false)).toBe('05');
  });
});
