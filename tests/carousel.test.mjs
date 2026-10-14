/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Carousel } from '../src/composites/Carousel';
import { REVIEW_MASK_ATTRIBUTE } from '../src/primitives/dom/review-mask.constants';

const SLIDES = ['Hyrule Symphony', 'Dark World Remix', 'Link in Red'].map((name) => ({ id: name, label: name, content: h('p', null, name) }));
const tagsWith = (html, text) => (html.match(/<[a-z0-9]+ [^>]*>/g) ?? []).filter((tag) => tag.includes(text));

describe('a carousel', () => {
  const html = renderToStaticMarkup(h(Carousel, { slides: SLIDES, label: 'Featured', defaultIndex: 1 }));

  it('is a region named by its label, with the carousel role description', () => {
    const [box] = tagsWith(html, 'aria-roledescription="carousel"');
    expect(box).toMatch(/^<section /);
    expect(box).toContain('aria-label="Featured"');
  });

  it('names each slide by its place and label, and makes the hidden ones inert', () => {
    const slides = tagsWith(html, 'aria-roledescription="slide"');
    expect(slides).toHaveLength(3);
    expect(slides[0]).toContain('aria-label="1 of 3: Hyrule Symphony"');
    expect(slides.map((tag) => tag.includes('data-active'))).toEqual([false, true, false]);
    expect(slides.map((tag) => tag.includes('inert'))).toEqual([true, false, true]);
  });

  it('is a polite live region when it does not turn by itself', () => {
    expect(tagsWith(html, 'carousel__viewport')[0]).toContain('aria-live="polite"');
  });

  it('has arrows and a dot per slide, the shown one marked current, and no stop button', () => {
    expect(html).toContain('aria-label="Previous slide"');
    expect(html).toContain('aria-label="Next slide"');
    const dots = tagsWith(html, 'carousel__dot"');
    expect(dots.map((tag) => tag.includes('aria-current="true"'))).toEqual([false, true, false]);
    expect(dots[2]).toContain('aria-label="Show Link in Red"');
    expect(tagsWith(html, 'role="group" aria-label="Slides"')).toHaveLength(1);
    expect(html).not.toContain('Stop turning');
    expect(html).not.toContain(REVIEW_MASK_ATTRIBUTE);
  });

  it('shows a stop button with turnEvery, and masks the slides and the dots for the review', () => {
    const turning = renderToStaticMarkup(h(Carousel, { slides: SLIDES, label: 'Featured', turnEvery: 8000 }));
    expect(turning).toContain('aria-label="Stop turning"');
    expect(tagsWith(turning, 'carousel__viewport')[0]).toContain(REVIEW_MASK_ATTRIBUTE);
    expect(tagsWith(turning, 'carousel__dots')[0]).toContain(REVIEW_MASK_ATTRIBUTE);
  });

  it('draws one slide alone with no arrows or dots', () => {
    const one = renderToStaticMarkup(h(Carousel, { slides: SLIDES.slice(0, 1), label: 'Tips', turnEvery: 8000 }));
    expect(one).not.toContain('carousel__bar');
    expect(one).not.toContain(REVIEW_MASK_ATTRIBUTE);
  });
});
