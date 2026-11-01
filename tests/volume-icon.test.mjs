/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { volumeStep } from '../src/primitives/VolumeIcon/behavior/volume-step';

describe('K1 VolumeIcon', { tags: ['critical'] }, () => {
  it('steps from an X to one, two, three and four waves, one per quarter of the level', () => {
    expect([0, 0.25, 0.5, 0.75, 1].map((level) => volumeStep(level))).toEqual([0, 1, 2, 3, 4]);
    expect(volumeStep(0.01)).toBe(1);
    expect(volumeStep(0.26)).toBe(2);
    expect(volumeStep(0.51)).toBe(3);
    expect(volumeStep(0.76)).toBe(4);
    expect(volumeStep(0.9, true)).toBe(0);
    expect(volumeStep(-1)).toBe(0);
    expect(volumeStep(Number.NaN)).toBe(0);
    expect(volumeStep(4)).toBe(4);
  });
});
