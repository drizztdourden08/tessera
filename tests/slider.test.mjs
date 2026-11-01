/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { grabThumb } from '../src/primitives/Slider/behavior/grab-thumb';
import { nearestThumb } from '../src/primitives/Slider/behavior/nearest-thumb';
import { railPoint } from '../src/primitives/Slider/behavior/rail-point';
import { readoutChars } from '../src/primitives/Slider/behavior/readout-chars';
import { snapValue } from '../src/primitives/Slider/behavior/snap-value';
import { trackFraction } from '../src/primitives/Slider/behavior/track-fraction';

const scale = (min, max, step = 1, extra = {}) => ({ min, max, step, ...extra });

describe('K1 a press on the bare track in range mode', { tags: ['critical'] }, () => {
  it('picks the nearer thumb, and the side pressed when both thumbs sit on one value', () => {
    expect(nearestThumb(10, 20, 60)).toBe('low');
    expect(nearestThumb(70, 20, 60)).toBe('high');
    expect(nearestThumb(30, 20, 60)).toBe('low');
    expect(nearestThumb(55, 20, 60)).toBe('high');
    expect(nearestThumb(40, 50, 50)).toBe('low');
    expect(nearestThumb(60, 50, 50)).toBe('high');
  });

  it('reads the press between the thumb centres and snaps it to a step', () => {
    const rect = { left: 100, width: 216, height: 16 };
    expect(trackFraction(108, rect)).toBe(0);
    expect(trackFraction(208, rect)).toBe(0.5);
    expect(trackFraction(400, rect)).toBe(1);
    expect(snapValue(37, scale(0, 100, 5))).toBe(35);
    expect(snapValue(0.234, scale(0, 1, 0.1))).toBe(0.2);
  });
});

describe('K1 dragging a range thumb', { tags: ['critical'] }, () => {
  it('grabs the thumb under the pointer, both when they sit together, and nothing on the bare track', () => {
    expect(grabThumb(21, 20, 60, 2)).toBe('low');
    expect(grabThumb(59, 20, 60, 2)).toBe('high');
    expect(grabThumb(40, 20, 60, 2)).toBeNull();
    expect(grabThumb(50.5, 50, 50, 2)).toBe('both');
    expect(grabThumb(50.8, 50, 52, 2)).toBe('low');
  });

  it('turns a pointer x into a value and the thumb reach in value units', () => {
    expect(railPoint(208, { left: 100, width: 216, height: 16 }, scale(0, 100))).toEqual({ at: 50, reach: 4 });
  });
});

describe('K1 the readout width', { tags: ['critical'] }, () => {
  it('counts the longest value, or both ends and the dash in range mode', () => {
    expect(readoutChars(scale(0, 100), false)).toBe(3);
    expect(readoutChars(scale(0, 100, 1, { formatValue: (v) => `${v}%` }), true)).toBe(9);
    expect(readoutChars(scale(-5, 5, 0.5), false)).toBe(4);
    expect(readoutChars(scale(0, 2, 1, { stops: ['Off', 'Medium', 'On'] }), false)).toBe(6);
  });
});
