/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { startsInside } from '../src/composites/marquee/starts-inside';

const node = (name) => ({ nodeType: 1, name });
const box = (...inside) => ({ contains: (target) => inside.includes(target) });

describe('a marquee starts only from inside its box', () => {
  it('starts from an element the box contains', () => {
    const cell = node('cell');
    expect(startsInside(box(cell), cell)).toBe(true);
  });

  it('ignores a press bubbled from a portal outside the box, such as a menu item', () => {
    const menuItem = node('menu item');
    expect(startsInside(box(node('cell')), menuItem)).toBe(false);
  });

  it('ignores a target that is not an element', () => {
    expect(startsInside(box(), null)).toBe(false);
    expect(startsInside(box(), { nodeType: 3 })).toBe(false);
  });
});
