/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Rating } from '../src/composites/Rating';
import { nextStar } from '../src/composites/Rating/behavior/next-star';
import { starFill } from '../src/composites/Rating/behavior/star-fill';

const noop = () => undefined;
const tagsWith = (html, text) => (html.match(/<[a-z0-9]+ [^>]*>/g) ?? []).filter((tag) => tag.includes(text));
const fills = (html) => [...html.matchAll(/data-fill="([a-z]+)"/g)].map((match) => match[1]);

describe('a shown rating', () => {
  it('draws the average to the nearest half star', () => {
    expect([1, 2, 3, 4, 5].map((star) => starFill(4.6, star))).toEqual(['full', 'full', 'full', 'full', 'half']);
    expect([1, 2, 3, 4, 5].map((star) => starFill(3.8, star))).toEqual(['full', 'full', 'full', 'full', 'empty']);
    expect([1, 2, 3].map((star) => starFill(2.3, star))).toEqual(['full', 'full', 'half']);
    expect(fills(renderToStaticMarkup(h(Rating, { value: 0 })))).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
  });

  it('is one image a screen reader hears as one sentence, with the number and the count beside the stars', () => {
    const html = renderToStaticMarkup(h(Rating, { value: 4.6, count: 212, showValue: true }));
    const [image] = tagsWith(html, 'role="img"');
    expect(image).toContain('aria-label="4.6 out of 5, from 212 ratings"');
    expect(html).toContain('>4.6</span>');
    expect(html).toContain('>(212)</span>');
    expect(html).not.toContain('role="radio"');
  });

  it('reads Not rated yet and fades when nobody has rated', () => {
    const html = renderToStaticMarkup(h(Rating, { value: null, count: 0, showValue: true }));
    expect(html).toContain('aria-label="Not rated yet"');
    expect(html).toContain('rating--none');
    expect(html).not.toContain('rating__value');
  });

  it('puts a label before the sentence and takes its size', () => {
    const html = renderToStaticMarkup(h(Rating, { value: 4, count: 1, label: 'Hyrule Symphony', size: 'lg' }));
    expect(html).toContain('aria-label="Hyrule Symphony: 4.0 out of 5, from 1 rating"');
    expect(html).toContain('rating--lg');
    expect(html).toContain('width="26"');
  });
});

describe('the picker', () => {
  const radios = (html) => tagsWith(html, 'role="radio"');

  it('is a labelled radio group with a radio per star and one Tab stop on the picked star', () => {
    const html = renderToStaticMarkup(h(Rating, { value: 3, onChange: noop }));
    expect(tagsWith(html, 'role="radiogroup"')[0]).toContain('aria-label="Your rating"');
    const stars = radios(html);
    expect(stars).toHaveLength(5);
    expect(stars.map((tag) => tag.includes('tabindex="0"'))).toEqual([false, false, true, false, false]);
    expect(stars.map((tag) => tag.includes('aria-checked="true"'))).toEqual([false, false, true, false, false]);
    expect(stars[0]).toContain('aria-label="1 star"');
    expect(stars[4]).toContain('aria-label="5 stars"');
  });

  it('puts the Tab stop on the first star before a pick', () => {
    const stars = radios(renderToStaticMarkup(h(Rating, { value: null, onChange: noop, label: 'Rate this pack' })));
    expect(stars.map((tag) => tag.includes('tabindex="0"'))).toEqual([true, false, false, false, false]);
    expect(stars.every((tag) => tag.includes('aria-checked="false"'))).toBe(true);
  });

  it('turns off every star and marks the group when disabled', () => {
    const html = renderToStaticMarkup(h(Rating, { value: 2, onChange: noop, disabled: true }));
    expect(tagsWith(html, 'role="radiogroup"')[0]).toContain('aria-disabled="true"');
    expect(radios(html).every((tag) => tag.includes('disabled=""'))).toBe(true);
  });

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
