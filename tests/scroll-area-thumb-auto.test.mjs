/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { slimThumbIdleMs } from '../src/primitives/ScrollArea/behavior/slim-thumb-idle-ms';
import { slimThumbSpan } from '../src/primitives/ScrollArea/behavior/slim-thumb-span';

const nodeWith = (value) => ({ ownerDocument: { defaultView: { getComputedStyle: () => ({ getPropertyValue: () => value }) } } });

describe('K1 ScrollArea thumb auto', { tags: ['critical'] }, () => {
  it('reads the idle delay from the duration token in seconds or milliseconds', () => {
    expect(slimThumbIdleMs(nodeWith(' 0.9s'))).toBe(900);
    expect(slimThumbIdleMs(nodeWith('600ms'))).toBe(600);
    expect(slimThumbIdleMs(nodeWith(''))).toBe(0);
  });

  it('draws no thumb when the content fits, even by a pixel of slack', () => {
    expect(slimThumbSpan(200, 200, 0)).toBeNull();
    expect(slimThumbSpan(200, 201, 0)).toBeNull();
  });
});
