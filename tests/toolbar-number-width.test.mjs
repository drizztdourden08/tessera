/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { contentKey } from '../src/composites/Toolbar/behavior/content-key';
import { numberColumns } from '../src/composites/Toolbar/behavior/number-columns';

const ignore = () => undefined;
const number = (id, extra = {}) => ({ kind: 'number', id, label: id, value: 1, onChange: ignore, ...extra });

describe('K1 numberColumns', { tags: ['critical'] }, () => {
  it('counts the digits of the widest of max and min, with a sign for a negative', () => {
    expect(numberColumns({ min: 0, max: 100 })).toBe(3);
    expect(numberColumns({ min: -180, max: 180 })).toBe(4);
    expect(numberColumns({ min: 1, max: 9 })).toBe(1);
  });

  it('adds the decimal places of a fractional step and the point', () => {
    expect(numberColumns({ max: 10, step: 0.5 })).toBe(4);
    expect(numberColumns({ max: 10, step: 0.25 })).toBe(5);
  });

  it('keeps a floor of four digits when no bound is set', () => {
    expect(numberColumns({})).toBe(4);
  });
});

describe('K1 numberColumns cap', { tags: ['critical'] }, () => {
  it('caps the floor at twelve digits', () => {
    expect(numberColumns({ max: 1e20, step: 0.001 })).toBe(12);
  });
});

describe('K1 contentKey for the fit measure', { tags: ['critical'] }, () => {
  const key = (extra) => contentKey({ label: 'Tools', items: [number('size', extra)] });

  it('changes when a label, a bound, a step or a suffix changes the width', () => {
    const base = key({ max: 64 });
    expect(key({ max: 64, showLabel: true })).not.toBe(base);
    expect(key({ max: 640 })).not.toBe(base);
    expect(key({ max: 64, step: 0.5 })).not.toBe(base);
    expect(key({ max: 64, suffix: 'px' })).not.toBe(base);
  });
});
