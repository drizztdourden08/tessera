/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Slider } from '../src/primitives/Slider';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const sliderCss = read('../src/primitives/Slider/Slider.css');
const rule = (selector) => sliderCss.split(`${selector} {`)[1].split('}')[0];

describe('Slider hit area', () => {
  it('gives the thumb inputs at least the minimum hit area without changing the drawn size', () => {
    const rail = rule('.slider__rail');
    expect(rail).toContain('height: max(var(--slider-thumb), var(--hit-area-min));');
    expect(rail).toContain('margin-block: calc((var(--slider-thumb) - max(var(--slider-thumb), var(--hit-area-min))) / 2);');
    const thumbs = read('../src/theme/slider-thumb.css');
    expect(thumbs).toContain('width: var(--slider-thumb);');
    expect(thumbs).toContain('height: var(--slider-thumb);');
  });

  it('widens the vertical rail the same way', () => {
    const vertical = rule('.slider--vertical .slider__rail');
    expect(vertical).toContain('width: max(var(--slider-thumb), var(--hit-area-min));');
    expect(vertical).toContain('margin-inline: calc((var(--slider-thumb) - max(var(--slider-thumb), var(--hit-area-min))) / 2);');
  });

  it('keeps the minimum at 24 px', () => {
    expect(read('../src/tokens/size.css')).toContain('--hit-area-min: var(--size-24);');
  });
});

describe('Slider trackBackground', () => {
  const GRADIENT = 'linear-gradient(to right, #000000, #ff0000)';

  it('sets the image as a custom property on the rail, for one thumb and for a range', () => {
    const single = renderToString(h(Slider, { defaultValue: 30, trackBackground: GRADIENT }));
    expect(single).toContain(`--slider-track-background:${GRADIENT}`);
    const range = renderToString(h(Slider, { range: true, defaultValue: [10, 40], trackBackground: GRADIENT }));
    expect(range).toContain(`--slider-track-background:${GRADIENT}`);
  });

  it('leaves the property out without it, and the track reads it ahead of the fill', () => {
    expect(renderToString(h(Slider, { defaultValue: 30 }))).not.toContain('--slider-track-background');
    expect(sliderCss).toContain('background: var(--slider-track-background, linear-gradient(');
  });
});
