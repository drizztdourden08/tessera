/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { closedSetRoom } from '../src/composites/field-kits/behavior/closed-set-room';
import { closedSetTier } from '../src/composites/field-kits/behavior/closed-set-tier';
import { declaredValue } from '../src/composites/field-kits/declared-value';
import { buildSchema } from '../src/data';

const ROWS = [{ weight: 2, mode: 'fast', name: 'Mira' }];
const [weight, mode] = buildSchema(ROWS, {
  options: { weight: [{ value: 1, label: 'Light' }, { value: 2, label: 'Medium' }, { value: 3, label: 'Heavy' }], mode: ['fast', 'slow'] },
});

describe('K2 SchemaConfig.options', { tags: ['critical'] }, () => {
  it('makes the field an enum with its names, and keeps the values as text in options', () => {
    expect(weight).toMatchObject({ kind: 'enum', closed: true, options: ['1', '2', '3'] });
    expect(weight.declaredOptions).toEqual([{ value: 1, label: 'Light' }, { value: 2, label: 'Medium' }, { value: 3, label: 'Heavy' }]);
  });

  it('hands a picked option back in the type it was declared in, so a number stays a number', () => {
    expect(declaredValue(weight, '2')).toBe(2);
    expect(declaredValue(mode, 'slow')).toBe('slow');
    expect(declaredValue(mode, 'typed by hand')).toBe('typed by hand');
  });

  it('still takes plain values, each its own name', () => {
    expect(mode.options).toEqual(['fast', 'slow']);
    expect(mode.declaredOptions).toEqual([{ value: 'fast', label: 'fast' }, { value: 'slow', label: 'slow' }]);
  });
});

describe('K2 the measured enum editor', { tags: ['critical'] }, () => {
  it('prefers segments for a handful, chips for the rest of a closed set and a list past that', () => {
    expect(closedSetTier(3)).toBe('segments');
    expect(closedSetTier(7)).toBe('chips');
    expect(closedSetTier(40)).toBe('list');
    expect(closedSetTier(0)).toBe('list');
  });

  it('measures the row the control sits in, never the control', () => {
    const row = { clientWidth: 320 };
    const probe = { closest: (selector) => (selector === '.field-kit__open-set' ? row : null) };
    expect(closedSetRoom(probe)).toEqual({ box: row, width: 320 });
    const box = { clientWidth: 180 };
    expect(closedSetRoom({ closest: (selector) => (selector === '.field-kit__closed-set' ? box : null) })).toEqual({ box, width: 180 });
  });
});
