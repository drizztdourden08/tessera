/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Rating } from '../src/composites/Rating';
import { nextStar } from '../src/composites/Rating/behavior/next-star';
import { starFill } from '../src/composites/Rating/behavior/star-fill';

const fills = (html) => [...html.matchAll(/data-fill="([a-z]+)"/g)].map((match) => match[1]);

describe('K1 a shown rating', { tags: ['critical'] }, () => {
  it('draws the average to the nearest half star', () => {
    expect([1, 2, 3, 4, 5].map((star) => starFill(4.6, star))).toEqual(['full', 'full', 'full', 'full', 'half']);
    expect([1, 2, 3, 4, 5].map((star) => starFill(3.8, star))).toEqual(['full', 'full', 'full', 'full', 'empty']);
    expect([1, 2, 3].map((star) => starFill(2.3, star))).toEqual(['full', 'full', 'half']);
    expect(fills(renderToStaticMarkup(h(Rating, { value: 0 })))).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
  });
});

describe('K1 the picker', { tags: ['critical'] }, () => {
  it('moves one star with the arrow keys, to the ends with Home and End, and stops at the ends', () => {
    expect(nextStar('ArrowRight', 3, 5)).toBe(4);
    expect(nextStar('ArrowUp', 3, 5)).toBe(4);
    expect(nextStar('ArrowLeft', 3, 5)).toBe(2);
    expect(nextStar('ArrowDown', 3, 5)).toBe(2);
    expect(nextStar('Home', 4, 5)).toBe(1);
    expect(nextStar('End', 1, 5)).toBe(5);
    expect(nextStar('ArrowRight', 5, 5)).toBe(5);
    expect(nextStar('ArrowLeft', 1, 5)).toBe(1);
    expect(nextStar('ArrowRight', 0, 5)).toBe(1);
    expect(nextStar('Enter', 3, 5)).toBeNull();
  });
});
