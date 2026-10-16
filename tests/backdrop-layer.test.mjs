/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import * as root from '../src';
import * as composites from '../src/composites';
import { Hero } from '../src/composites/Hero';
import * as primitives from '../src/primitives';
import { BackdropLayer, backdropStyle } from '../src/primitives/BackdropLayer';

const layer = (backdrop, className) => renderToString(h(BackdropLayer, { backdrop, className }));
const night = { kind: 'image', src: 'night.png', position: 'center bottom', pixelated: true };

describe('BackdropLayer', () => {
  it('is exported with backdropStyle from primitives and the package root, and Hero no longer carries its own copy', () => {
    expect(primitives.BackdropLayer).toBe(BackdropLayer);
    expect(root.BackdropLayer).toBe(BackdropLayer);
    expect(primitives.backdropStyle).toBe(backdropStyle);
    expect(root.backdropStyle).toBe(backdropStyle);
    expect('backdropStyle' in composites).toBe(false);
  });

  it('draws an image that covers by default, with its place, its colour and the pixelated look', () => {
    const html = layer({ ...night, color: '--c-bg' });
    expect(html).toContain('class="backdrop-layer backdrop-layer--image backdrop-layer--pixelated"');
    expect(html).toContain('data-fit="cover"');
    expect(html).toContain('background-image:url(&quot;night.png&quot;)');
    expect(html).toContain('background-position:center bottom');
    expect(html).toContain('background-color:var(--c-bg)');
    expect(html).toContain('aria-hidden="true"');
  });

  it('sizes a tile from tileSize and leaves a covering image to the stylesheet', () => {
    expect(backdropStyle({ kind: 'image', src: 'a.svg', fit: 'tile', tileSize: '48px' }).backgroundSize).toBe('48px');
    expect(backdropStyle({ kind: 'image', src: 'a.svg', tileSize: '48px' }).backgroundSize).toBeUndefined();
    expect(layer({ kind: 'image', src: 'a.svg', fit: 'contain' })).toContain('data-fit="contain"');
  });

  it('paints a colour, reading a name that starts with -- as a token', () => {
    expect(backdropStyle({ kind: 'color', color: '--c-tag-violet-dim' })).toEqual({ backgroundColor: 'var(--c-tag-violet-dim)' });
    expect(backdropStyle({ kind: 'color', color: '#123456' })).toEqual({ backgroundColor: '#123456' });
    expect(layer({ kind: 'color', color: '#123456' }, 'page__backdrop')).toContain('class="backdrop-layer backdrop-layer--color page__backdrop"');
  });

  it('wraps a node with no style of its own', () => {
    const html = layer({ kind: 'node', node: h('span', { className: 'scene' }) });
    expect(html).toBe('<div class="backdrop-layer backdrop-layer--node" aria-hidden="true"><span class="scene"></span></div>');
    expect(backdropStyle({ kind: 'node', node: null })).toEqual({});
  });

  it('is what Hero draws, while Hero keeps its brand gradient and its plain look', () => {
    const hero = (backdrop) => renderToString(h(Hero, { title: 'Randomizer', backdrop }));
    expect(hero({ kind: 'color', color: '--c-bg' })).toContain('class="backdrop-layer backdrop-layer--color hero__backdrop"');
    expect(hero(undefined)).toContain('class="hero__backdrop hero__backdrop--brand"');
    expect(hero(null)).not.toContain('backdrop');
  });

  it('fills its positioned parent and keeps the fit rules in its own stylesheet', () => {
    const css = readFileSync(new URL('../src/primitives/BackdropLayer/BackdropLayer.css', import.meta.url), 'utf8');
    expect(css).toMatch(/\.backdrop-layer \{\s*position: absolute;\s*inset: 0;\s*overflow: hidden;\s*pointer-events: none;\s*\}/);
    expect(css).toContain(".backdrop-layer--image[data-fit='cover'] { background-size: cover; }");
    const hero = readFileSync(new URL('../src/composites/Hero/sub-components/HeroBackdropLayer.css', import.meta.url), 'utf8');
    expect(hero).not.toContain('data-fit');
  });
});
