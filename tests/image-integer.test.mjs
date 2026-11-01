/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { imageClass } from '../src/primitives/Image/behavior/image-class';
import { integerScale } from '../src/primitives/Image/behavior/integer-scale';
import { integerSizeOf } from '../src/primitives/Image/behavior/integer-size-of';

const SPRITE = { width: 16, height: 16 };

describe('K1 Image fit integer', { tags: ['critical'] }, () => {
  it('picks the largest whole-number scale that fits the frame', () => {
    expect(integerScale({ width: 100, height: 100 }, SPRITE)).toBe(6);
    expect(integerScale({ width: 200, height: 70 }, SPRITE)).toBe(4);
    expect(integerScale({ width: 16, height: 16 }, SPRITE)).toBe(1);
  });

  it('shrinks by a whole divisor when the picture is larger than the frame', () => {
    expect(integerScale({ width: 100, height: 100 }, { width: 150, height: 150 })).toBe(1 / 2);
    expect(integerScale({ width: 40, height: 40 }, { width: 160, height: 160 })).toBe(1 / 4);
  });

  it('keeps a scale of one for a frame or a picture with no size yet', () => {
    expect(integerScale({ width: 0, height: 0 }, SPRITE)).toBe(1);
    expect(integerScale({ width: 100, height: 100 }, { width: 0, height: 0 })).toBe(1);
  });

  it('gives the size in pixels once the frame and the picture are known', () => {
    expect(integerSizeOf({ width: 100, height: 100 }, SPRITE)).toEqual({ width: 96, height: 96 });
    expect(integerSizeOf(null, SPRITE)).toBeUndefined();
    expect(integerSizeOf({ width: 100, height: 100 }, undefined)).toBeUndefined();
  });

  it('adds the classes of the fit and the backdrop, and none by default', () => {
    expect(imageClass({ status: 'loaded', fit: 'integer', backdrop: 'checker' })).toBe('image image--loaded image--fit-integer image--backdrop-checker');
    expect(imageClass({ status: 'loaded' })).toBe('image image--loaded');
    expect(imageClass({ status: 'loaded', backdrop: 'none' })).toBe('image image--loaded');
  });
});
