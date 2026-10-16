/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { SiteHeader } from '../src/composites/SiteHeader';

const CSS = readFileSync(new URL('../src/composites/DropdownMenu/sub-components/HamburgerIcon.css', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '');
const MOTION = readFileSync(new URL('../src/tokens/motion.css', import.meta.url), 'utf8');
const REDUCED = '@media (prefers-reduced-motion: reduce)';
const OPEN = "button[aria-expanded='true'] .hamburger-icon__bar";
const groups = [{ id: 'g', items: [{ id: 'a', label: 'A' }] }];

const rulesOf = (css) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
  selector: selector.trim(),
  props: Object.fromEntries(body.split(';').map((line) => line.split(/:(.*)/s).map((part) => part.trim())).filter(([name]) => name)),
}));
const reducedStart = CSS.indexOf(REDUCED);
const RULES = rulesOf(CSS.slice(0, reducedStart));
const REDUCED_RULES = rulesOf(CSS.slice(reducedStart + REDUCED.length).replace(/^\s*\{/, ''));
const SHAPES = ['rotate', 'translate', 'opacity', 'transform'];
const shapes = (entry) => SHAPES.some((name) => name in entry.props);
const transitionNames = (transition) => transition.split(/,(?![^(]*\))/).map((part) => part.trim().split(/\s+/)[0]);
const rule = (selector) => RULES.find((entry) => entry.selector === selector)?.props ?? {};

describe('hamburger morph', () => {
  it('draws one set of three bars inside a button that carries aria-expanded', () => {
    const html = renderToString(h(DropdownMenu, { trigger: { label: 'Menu', iconOnly: true }, groups }));
    expect(html).toContain('aria-label="Menu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html.match(/hamburger-icon__bar/g)).toHaveLength(3);
    expect(html).not.toContain('hamburger-icon--open');
    expect(html).not.toContain('<svg');
  });

  it('reaches the SiteHeader links menu through the same trigger', () => {
    const links = [{ id: 'home', label: 'Home', href: '/' }, { id: 'docs', label: 'Docs', href: '/docs' }];
    const html = renderToString(h(SiteHeader, { brand: { logo: null, label: 'Site', href: '/' }, links, activeId: 'home' }));
    expect(html.match(/hamburger-icon__bar/g)?.length ?? 0).toBeGreaterThanOrEqual(3);
  });

  it('takes its open shape only from aria-expanded="true" on the button', () => {
    const shaping = RULES.filter(shapes);
    expect(shaping.length).toBe(3);
    for (const entry of shaping) expect(entry.selector.startsWith(OPEN)).toBe(true);
  });

  it('moves transform and opacity only, on the motion tokens', () => {
    const moving = RULES.filter((entry) => 'transition' in entry.props).map((entry) => entry.props.transition);
    expect(moving).toHaveLength(2);
    for (const transition of moving) {
      expect(transitionNames(transition).sort()).toEqual(['opacity', 'rotate', 'translate']);
      expect(transition).not.toMatch(/\d(m?s)\b/);
      expect(transition).toContain('var(--ease-out)');
    }
    expect(MOTION).toMatch(/--ease-out:\s+cubic-bezier\(0\.33, 1, 0\.68, 1\);/);
  });

  it('switches at once under reduced motion', () => {
    const still = REDUCED_RULES.find((entry) => entry.props.transition === 'none');
    expect(still?.selector.split(',').map((part) => part.trim())).toEqual(['.hamburger-icon__bar', OPEN]);
  });

  it('keeps the closed and open shapes of the old icons', () => {
    expect(rule('.hamburger-icon')).toMatchObject({
      '--hamburger-icon-w': 'var(--size-16)',
      '--hamburger-icon-h': 'var(--size-12)',
      '--hamburger-icon-bar': 'var(--border-width-thick)',
    });
    expect(rule(`${OPEN}:nth-child(1)`)).toEqual({
      translate: '0 calc(var(--hamburger-icon-h) / 2 - var(--hamburger-icon-bar) / 2)',
      rotate: '45deg',
    });
    expect(rule(`${OPEN}:nth-child(2)`)).toEqual({ opacity: '0' });
    expect(rule(`${OPEN}:nth-child(3)`)).toEqual({
      translate: '0 calc(var(--hamburger-icon-bar) / 2 - var(--hamburger-icon-h) / 2)',
      rotate: '-45deg',
    });
  });
});
