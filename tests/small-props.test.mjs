/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { isPixelArt, usePixelArt } from '../src/primitives';
import { imageClass } from '../src/primitives/Image/behavior/image-class';

describe('K1 pixel art detection', { tags: ['critical'] }, () => {
  it('draws hard pixel edges on auto only once a picture of 256 px or less has loaded', () => {
    expect(imageClass({ status: 'loaded', pixelated: 'auto', natural: { width: 16, height: 16 } })).toContain('image--pixelated');
    expect(imageClass({ status: 'loaded', pixelated: 'auto', natural: { width: 1280, height: 720 } })).not.toContain('image--pixelated');
  });

  it('shares the test as isPixelArt and usePixelArt, for an img of the app', () => {
    expect(isPixelArt({ width: 256, height: 128 })).toBe(true);
    expect(isPixelArt({ width: 257, height: 16 })).toBe(false);
    expect(isPixelArt(null)).toBe(false);
    const seen = [];
    const Probe = () => {
      const art = usePixelArt();
      seen.push(art);
      return null;
    };
    renderToString(h(Probe));
    expect(seen[0].pixelArt).toBe(false);
    expect(seen[0].onLoad).toBeTypeOf('function');
  });
});
