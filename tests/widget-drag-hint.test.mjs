/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { besidePointer } from '../src/composites/DockLayout/behavior/beside-pointer';

const AREA = { x: 0, y: 0, width: 800, height: 600 };
const SIZE = { width: 200, height: 24 };

describe('K1 a drag hint beside the pointer', { tags: ['critical'] }, () => {
  it('sits just below and after the pointer', () => {
    expect(besidePointer({ x: 100, y: 100 }, SIZE, AREA, 12)).toEqual({ left: 112, top: 112 });
  });

  it('flips to the other side of the pointer near the right and bottom edges', () => {
    expect(besidePointer({ x: 700, y: 590 }, SIZE, AREA, 12)).toEqual({ left: 488, top: 554 });
  });

  it('stays inside the area when it cannot fit on either side', () => {
    expect(besidePointer({ x: 50, y: 5 }, { width: 900, height: 24 }, AREA, 12)).toEqual({ left: 0, top: 17 });
  });
});
