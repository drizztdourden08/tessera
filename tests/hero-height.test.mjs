/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Hero } from '../src/composites/Hero';

const art = { kind: 'image', src: 'crest.png', alt: '' };
const classOf = (props) => renderToString(h(Hero, { title: 'Randomizer', ...props })).match(/<section class="([^"]*)"/)?.[1];
const css = (file) => readFileSync(new URL(`../src/composites/Hero/${file}`, import.meta.url), 'utf8');

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
    expect(css('sub-components/HeroFrame.css')).toMatch(/\.hero--bare \.hero__frame,\s*\.hero--compact \.hero__frame \{\s*height: auto;\s*min-height: 0;\s*\}/);
    expect(css('Hero.css')).toContain('.hero--bare .hero__grid { align-content: start; }');
  });

  it('takes a size, and the default size adds no class, so its look is the one from before', () => {
    expect(classOf({ art, size: 'default' })).toBe('hero');
    expect(classOf({ art, size: 'compact' })).toBe('hero hero--compact');
    expect(classOf({ art, size: 'tall', className: 'home' })).toBe('hero hero--tall home');
    expect(classOf({ size: 'compact' })).toBe('hero hero--bare hero--compact');
  });

  it('fits a compact hero to its content with tight padding, and makes a tall one taller than the default', () => {
    expect(css('Hero.css')).toMatch(/\.hero--compact \.hero__grid \{\s*align-content: start;\s*gap: var\(--space-sm\) var\(--space-lg\);\s*padding: var\(--space-lg\);\s*\}/);
    const frame = css('sub-components/HeroFrame.css');
    expect(frame).toContain('height: clamp(var(--hero-h-min), 60cqh, var(--hero-h));');
    expect(frame).toContain('.hero--tall .hero__frame { height: clamp(var(--hero-h), 80cqh, var(--hero-h-tall)); }');
    expect(frame).toMatch(/@container hero \(width < 720px\)[^]*\.hero--tall \.hero__frame \{\s*height: auto;\s*min-height: clamp\(var\(--hero-h\), 80cqh, var\(--hero-h-tall\)\);/);
    const size = readFileSync(new URL('../src/tokens/size.css', import.meta.url), 'utf8');
    expect(size).toContain('--hero-h-tall: calc(560 * var(--size-1));');
  });
});
