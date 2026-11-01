/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { slimThumbSpan } from '../src/primitives/ScrollArea/behavior/slim-thumb-span';

describe('K1 ScrollArea slim scrollbar', { tags: ['critical'] }, () => {
  it('gives the thumb its share of the track and its progress along it', () => {
    expect(slimThumbSpan(200, 800, 0)).toEqual({ fraction: 0.25, progress: 0, range: 600 });
    expect(slimThumbSpan(200, 800, 300)).toEqual({ fraction: 0.25, progress: 0.5, range: 600 });
    expect(slimThumbSpan(200, 800, 900)?.progress).toBe(1);
  });

  it('draws no thumb when nothing scrolls', () => {
    expect(slimThumbSpan(200, 200, 0)).toBeNull();
    expect(slimThumbSpan(0, 400, 0)).toBeNull();
  });
});
