/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { nextLeaving } from '../src/primitives/ContentSwap/behavior/next-leaving';

const SHOWN = { key: 'a', node: 'first' };
const SKIPPED = { key: 'b', node: 'second' };

describe('K1 ContentSwap next leaving layer', { tags: ['critical'] }, () => {
  it('overlap always leaves the layer that was just replaced', () => {
    expect(nextLeaving(SHOWN, SKIPPED, false)).toBe(SKIPPED);
  });

  it('out-in keeps the layer already leaving on a fast second swap', () => {
    expect(nextLeaving(SHOWN, SKIPPED, true)).toBe(SHOWN);
  });

  it('out-in leaves the replaced layer when nothing is leaving', () => {
    expect(nextLeaving(null, SKIPPED, true)).toBe(SKIPPED);
  });
});
