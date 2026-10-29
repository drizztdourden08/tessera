/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Image } from '../src/primitives/Image';
import { imageClass } from '../src/primitives/Image/behavior/image-class';
import { integerScale } from '../src/primitives/Image/behavior/integer-scale';
import { integerSizeOf } from '../src/primitives/Image/behavior/integer-size-of';

const SPRITE = { width: 16, height: 16 };

describe('Image fit integer', () => {
  it('picks the largest whole-number scale that fits the frame', () => {
    expect(integerScale({ width: 100, height: 100 }, SPRITE)).toBe(6);
    expect(integerScale({ width: 200, height: 70 }, SPRITE)).toBe(4);
    expect(integerScale({ width: 16, height: 16 }, SPRITE)).toBe(1);
  });

  it('shrinks by a whole divisor when the picture is larger than the frame', () => {
    expect(integerScale({ width: 100, height: 100 }, { width: 150, height: 150 })).toBe(1 / 2);
    expect(integerScale({ width: 40, height: 40 }, { width: 160, height: 160 })).toBe(1 / 4);
  });

  it('keeps a scale of one for a frame or a picture with no size yet', () => {
    expect(integerScale({ width: 0, height: 0 }, SPRITE)).toBe(1);
    expect(integerScale({ width: 100, height: 100 }, { width: 0, height: 0 })).toBe(1);
  });

  it('gives the size in pixels once the frame and the picture are known', () => {
    expect(integerSizeOf({ width: 100, height: 100 }, SPRITE)).toEqual({ width: 96, height: 96 });
    expect(integerSizeOf(null, SPRITE)).toBeUndefined();
    expect(integerSizeOf({ width: 100, height: 100 }, undefined)).toBeUndefined();
  });

  it('adds the classes of the fit and the backdrop, and none by default', () => {
    expect(imageClass({ status: 'loaded', fit: 'integer', backdrop: 'checker' })).toBe('image image--loaded image--fit-integer image--backdrop-checker');
    expect(imageClass({ status: 'loaded' })).toBe('image image--loaded');
    expect(imageClass({ status: 'loaded', backdrop: 'none' })).toBe('image image--loaded');
  });

  it('draws the frame with the checker backdrop when asked', () => {
    const html = renderToString(h(Image, { src: 'a.png', fit: 'integer', backdrop: 'checker', alt: '' }));
    expect(html).toContain('image--backdrop-checker');
    expect(html).toContain('image--fit-integer');
    expect(renderToString(h(Image, { src: 'a.png', alt: '' }))).not.toContain('backdrop');
  });

  it('draws the checker and the centred picture with tokens only', () => {
    const css = readFileSync(new URL('../src/primitives/Image/Image.css', import.meta.url), 'utf8');
    expect(css).toContain('.image--backdrop-checker {');
    expect(css).toContain('var(--c-checker-a)');
    expect(css).toContain('var(--checker-size)');
    expect(css).toContain('.image--fit-integer > .image__img {');
  });
});
