/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { mediaWidth } from '../src/composites/ListItemRow/behavior/media-width';

describe('K1 row media', { tags: ['critical'] }, () => {
  it('sizes the picture from the row height and an aspect, or a set width', () => {
    expect(mediaWidth({}, 58)).toBe(103);
    expect(mediaWidth({ aspect: 1 }, 58)).toBe(58);
    expect(mediaWidth({ width: 48, aspect: 2 }, 58)).toBe(48);
  });
});
