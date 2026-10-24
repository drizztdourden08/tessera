/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { clampPoint } from '../src/composites/marquee/clamp-point';
import { edgeScrollDelta } from '../src/composites/marquee/edge-scroll-delta';
import { hitKeys } from '../src/composites/marquee/hit-keys';
import { mergeSelection } from '../src/composites/marquee/merge-selection';
import { modifiersOf } from '../src/composites/marquee/modifiers-of';
import { passedThreshold } from '../src/composites/marquee/passed-threshold';
import { rectFromPoints } from '../src/composites/marquee/rect-from-points';
import { rectsIntersect } from '../src/composites/marquee/rects-intersect';
import { sameKeys } from '../src/composites/marquee/same-keys';

const NONE = { add: false, toggle: false };

const tile = (key, x, y) => ({ key, rect: { x, y, width: 10, height: 10 } });

describe('rectFromPoints', () => {
  it('orders the corners whichever way the drag goes', () => {
    expect(rectFromPoints({ x: 30, y: 40 }, { x: 10, y: 5 })).toEqual({ x: 10, y: 5, width: 20, height: 35 });
    expect(rectFromPoints({ x: 10, y: 5 }, { x: 30, y: 40 })).toEqual({ x: 10, y: 5, width: 20, height: 35 });
  });

  it('is empty for one point', () => {
    expect(rectFromPoints({ x: 4, y: 4 }, { x: 4, y: 4 })).toEqual({ x: 4, y: 4, width: 0, height: 0 });
  });
});

describe('rectsIntersect and hitKeys', () => {
  const area = { x: 5, y: 5, width: 20, height: 20 };

  it('counts an overlap and not a shared edge', () => {
    expect(rectsIntersect(area, { x: 20, y: 20, width: 10, height: 10 })).toBe(true);
    expect(rectsIntersect(area, { x: 25, y: 5, width: 10, height: 10 })).toBe(false);
    expect(rectsIntersect(area, { x: 100, y: 100, width: 10, height: 10 })).toBe(false);
  });

  it('counts a rectangle held whole inside the other', () => {
    expect(rectsIntersect(area, { x: 8, y: 8, width: 2, height: 2 })).toBe(true);
    expect(rectsIntersect({ x: 8, y: 8, width: 2, height: 2 }, area)).toBe(true);
  });

  it('returns the keys of the items touched, in item order', () => {
    const items = [tile('a', 0, 0), tile('b', 20, 20), tile('c', 60, 60), tile('d', 12, 0)];
    expect(hitKeys(area, items)).toEqual(['a', 'b', 'd']);
  });

  it('returns nothing for an empty area', () => {
    expect(hitKeys({ x: 100, y: 100, width: 0, height: 0 }, [tile('a', 0, 0)])).toEqual([]);
  });
});

describe('mergeSelection', () => {
  const base = ['a', 'b'];

  it('replaces the selection with no modifier', () => {
    expect(mergeSelection(base, ['c'], NONE)).toEqual(['c']);
  });

  it('adds the hits to the selection with shift', () => {
    expect(mergeSelection(base, ['b', 'c'], { add: true, toggle: false })).toEqual(['a', 'b', 'c']);
  });

  it('toggles the hits with ctrl or cmd', () => {
    expect(mergeSelection(base, ['b', 'c'], { add: false, toggle: true })).toEqual(['a', 'c']);
  });

  it('lets toggle win when both are held', () => {
    expect(mergeSelection(base, ['a'], { add: true, toggle: true })).toEqual(['b']);
  });

  it('keeps the base when nothing is hit under a modifier', () => {
    expect(mergeSelection(base, [], { add: true, toggle: false })).toEqual(base);
    expect(mergeSelection(base, [], { add: false, toggle: true })).toEqual(base);
  });
});

describe('modifiersOf', () => {
  it('reads shift as add, and ctrl or meta as toggle', () => {
    expect(modifiersOf({ shiftKey: true, ctrlKey: false, metaKey: false })).toEqual({ add: true, toggle: false });
    expect(modifiersOf({ shiftKey: false, ctrlKey: true, metaKey: false })).toEqual({ add: false, toggle: true });
    expect(modifiersOf({ shiftKey: false, ctrlKey: false, metaKey: true })).toEqual({ add: false, toggle: true });
    expect(modifiersOf({ shiftKey: false, ctrlKey: false, metaKey: false })).toEqual(NONE);
  });
});

describe('passedThreshold', () => {
  it('waits for the pointer to move far enough in any direction', () => {
    const from = { x: 10, y: 10 };
    expect(passedThreshold(from, { x: 12, y: 11 }, 4)).toBe(false);
    expect(passedThreshold(from, { x: 14, y: 10 }, 4)).toBe(true);
    expect(passedThreshold(from, { x: 7, y: 6 }, 4)).toBe(true);
  });
});

describe('edgeScrollDelta', () => {
  const bounds = { x: 0, y: 0, width: 200, height: 100 };

  it('is zero away from the edges', () => {
    expect(edgeScrollDelta({ x: 100, y: 50 }, bounds, 20, 10)).toEqual({ x: 0, y: 0 });
  });

  it('scrolls toward the edge the pointer nears, faster the closer it gets', () => {
    expect(edgeScrollDelta({ x: 190, y: 50 }, bounds, 20, 10)).toEqual({ x: 5, y: 0 });
    expect(edgeScrollDelta({ x: 100, y: 5 }, bounds, 20, 10)).toEqual({ x: 0, y: -8 });
  });

  it('caps the speed when the pointer is past the edge', () => {
    expect(edgeScrollDelta({ x: 500, y: -90 }, bounds, 20, 10)).toEqual({ x: 10, y: -10 });
  });
});

describe('clampPoint and sameKeys', () => {
  it('keeps a point inside the content', () => {
    expect(clampPoint({ x: -5, y: 900 }, 300, 400)).toEqual({ x: 0, y: 400 });
    expect(clampPoint({ x: 20, y: 30 }, 300, 400)).toEqual({ x: 20, y: 30 });
  });

  it('compares two key lists in order', () => {
    expect(sameKeys(['a', 'b'], ['a', 'b'])).toBe(true);
    expect(sameKeys(['a', 'b'], ['b', 'a'])).toBe(false);
    expect(sameKeys(['a'], ['a', 'b'])).toBe(false);
  });
});
