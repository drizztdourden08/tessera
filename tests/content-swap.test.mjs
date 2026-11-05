/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { leaveTime } from '../src/primitives/ContentSwap/behavior/leave-time';
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

const styled = (animationDuration, animationDelay) => ({
  ownerDocument: { defaultView: { getComputedStyle: () => ({ animationDuration, animationDelay }) } },
});

describe('K1 ContentSwap leave time', { tags: ['critical'] }, () => {
  it('is zero when no animation is styled, so the new layer shows at once', () => {
    expect(leaveTime(styled('', ''))).toBe(0);
    expect(leaveTime(styled('0s', '0s'))).toBe(0);
    expect(leaveTime({ ownerDocument: { defaultView: null } })).toBe(0);
  });

  it('adds the longest duration and delay, in seconds or milliseconds', () => {
    expect(leaveTime(styled('0.3s, 120ms', '50ms'))).toBe(350);
  });
});
