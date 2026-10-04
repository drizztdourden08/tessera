/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Hero } from '../src/composites/Hero';

const art = { kind: 'image', src: 'crest.png', alt: '' };
const classOf = (props) => renderToString(h(Hero, { title: 'Randomizer', ...props })).match(/<section class="([^"]*)"/)?.[1];

describe('the height of a Hero', () => {
  it('follows its content with no art and no backdrop', () => {
    expect(classOf({})).toBe('hero hero--bare');
    expect(classOf({ backdrop: null, art: null })).toBe('hero hero--bare');
  });

  it('keeps its full height with art or a backdrop', () => {
    expect(classOf({ art })).toBe('hero');
    expect(classOf({ backdrop: { kind: 'color', color: '--c-tag-violet-dim' } })).toBe('hero');
  });

  it('drops the fixed height and starts the grid at the top', () => {
    const css = readFileSync(new URL('../src/composites/Hero/Hero.css', import.meta.url), 'utf8');
    expect(css).toMatch(/\.hero--bare \.hero__frame \{\s*height: auto;\s*min-height: 0;\s*\}/);
    expect(css).toContain('.hero--bare .hero__grid { align-content: start; }');
  });
});
