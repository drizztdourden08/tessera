/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { pointsTo } from '../src/composites/CollapseToggle/behavior/points-to';

describe('K1 CollapseToggle', { tags: ['critical'] }, () => {
  it('points toward the edge of its panel to fold it and away from it to unfold it', () => {
    expect(pointsTo('start', false)).toBe('start');
    expect(pointsTo('start', true)).toBe('end');
    expect(pointsTo('end', false)).toBe('end');
    expect(pointsTo('end', true)).toBe('start');
  });
});
