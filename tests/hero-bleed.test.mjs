/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Hero } from '../src/composites/Hero';

const html = (props) => renderToString(h(Hero, { title: 'Randomizer', ...props }));
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const art = read('src/composites/Hero/sub-components/HeroArtSlot.css');
const frame = read('src/composites/Hero/sub-components/HeroFrame.css');
const hero = read('src/composites/Hero/Hero.css');

describe('a full-bleed Hero', () => {
  it('takes the full size as a class and keeps the other sizes as they were', () => {
    expect(html({ size: 'full', art: { kind: 'node', node: 'x' } })).toContain('<section class="hero hero--full"');
    expect(html({ size: 'tall', art: { kind: 'node', node: 'x' } })).toContain('<section class="hero hero--tall"');
  });

  it('spans the window width and at least the window height minus a token', () => {
    expect(hero).toMatch(/\.hero--full \{\s*width: 100vw;\s*max-width: none;\s*margin-inline: calc\(50% - 50vw\);/);
    expect(frame).toContain('min-height: calc(100svh - var(--hero-full-offset));');
    expect(read('src/tokens/size.css')).toContain('--hero-full-offset:');
  });

  it('lets node art fill the area behind the content with pointer events passing through', () => {
    expect(art).toMatch(/\.hero\.hero--full \.hero__art--node \{\s*inset: 0;/);
    expect(art).toMatch(/\.hero\.hero--full \.hero__art--node > \* \{[^}]*pointer-events: none;/);
    expect(hero).toMatch(/\.hero \.hero__art \{[^}]*pointer-events: none;/);
  });
});

describe('panning image art', () => {
  const image = { kind: 'image', src: 'hills.png', alt: '' };
  const classOfArt = (extra) => html({ art: { ...image, ...extra } }).match(/<span class="([^"]*hero__art[^"]*)"/)?.[1];

  it('adds the pan class only for motion pan', () => {
    expect(classOfArt({ motion: 'pan' })).toContain('hero__art hero__art--pan');
    expect(classOfArt({ motion: 'still' })).not.toContain('hero__art--pan');
    expect(classOfArt({})).not.toContain('hero__art--pan');
  });

  it('drifts on a loop with a token duration and a layout-free property', () => {
    expect(art).toContain('animation: hero-pan var(--duration-hero-pan) var(--ease-in-out) infinite alternate;');
    expect(art).toMatch(/@keyframes hero-pan \{\s*from \{ translate: 0 0; \}\s*to \{ translate: var\(--hero-pan-run\) 0; \}\s*\}/);
    expect(read('src/tokens/motion.css')).toContain('--duration-hero-pan:');
  });

  it('stops under prefers-reduced-motion', () => {
    expect(art).toMatch(/@media \(prefers-reduced-motion: reduce\) \{\s*\.hero \.hero__art\.hero__art--pan \{\s*width: 100%;\s*animation: none;/);
  });
});
