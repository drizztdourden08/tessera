/* @layer tooling-scripts @kind test */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ControlMenu, ControlMenuRow } from '../src/composites/ControlMenu';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { SiteHeader } from '../src/composites/SiteHeader';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';

const SRC = fileURLToPath(new URL('../src', import.meta.url));
const ICON_CSS = 'composites/DropdownMenu/sub-components/HamburgerIcon.css';
const MORPH_CSS = 'composites/WindowTitleBar/sub-components/WindowTitleBarStart.css';
const read = (path) => readFileSync(join(SRC, path), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const MOTION = readFileSync(join(SRC, 'tokens/motion.css'), 'utf8');
const REDUCED = '@media (prefers-reduced-motion: reduce)';
const MENU = '.window-title-bar__menu .hamburger-icon__bar';
const OPEN = ".window-title-bar__menu[aria-expanded='true'] .hamburger-icon__bar";
const ignore = () => undefined;
const groups = [{ id: 'g', items: [{ id: 'a', label: 'A', onSelect: ignore }] }];

const rulesOf = (css) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
  selector: selector.trim(),
  props: Object.fromEntries(body.split(';').map((line) => line.split(/:(.*)/s).map((part) => part.trim())).filter(([name]) => name)),
}));
const MORPH = read(MORPH_CSS);
const reducedStart = MORPH.indexOf(REDUCED);
const RULES = rulesOf(MORPH.slice(0, reducedStart));
const REDUCED_RULES = rulesOf(MORPH.slice(reducedStart + REDUCED.length).replace(/^\s*\{/, ''));
const SHAPES = ['rotate', 'translate', 'opacity', 'transform', 'transition'];
const moves = (entry) => SHAPES.some((name) => name in entry.props);
const transitionNames = (transition) => transition.split(/,(?![^(]*\))/).map((part) => part.trim().split(/\s+/)[0]);
const rule = (selector) => RULES.find((entry) => entry.selector === selector)?.props ?? {};
const triggerOf = (html) => html.match(/<button[^>]*aria-haspopup="menu"[^>]*>/)?.[0] ?? '';

const cssFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  if (entry.isDirectory()) return cssFiles(join(dir, entry.name));
  return entry.name.endsWith('.css') ? [relative(SRC, join(dir, entry.name)).split(sep).join('/')] : [];
});
const movesBar = (entry) => entry.selector.includes('hamburger-icon__bar') && moves(entry);
const movesBars = (file) => rulesOf(read(file)).some(movesBar);

describe('hamburger morph', () => {
  it('marks the title bar main menu button, and no other menu button', () => {
    const bar = renderToString(h(WindowTitleBar, { title: 'App', menu: groups, controls: false, onControl: ignore }));
    expect(triggerOf(bar)).toContain('window-title-bar__menu');
    expect(bar.match(/hamburger-icon__bar/g)).toHaveLength(3);
    const links = [{ id: 'home', label: 'Home', href: '/' }, { id: 'docs', label: 'Docs', href: '/docs' }];
    const others = [
      renderToString(h(DropdownMenu, { trigger: { label: 'Menu', iconOnly: true }, groups })),
      renderToString(h(SiteHeader, { brand: { logo: null, label: 'Site', href: '/' }, links, activeId: 'home' })),
      renderToString(h(ControlMenu, { trigger: { label: 'View', iconOnly: true } }, h(ControlMenuRow, { label: 'Zoom' }, 'control'))),
    ];
    for (const html of others) {
      expect(html).toContain('hamburger-icon__bar');
      expect(html).not.toContain('window-title-bar__menu');
    }
  });

  it('draws the hamburger with one closed shape and no motion of its own', () => {
    const icon = rulesOf(read(ICON_CSS));
    expect(icon.filter(moves)).toEqual([]);
    expect(read(ICON_CSS)).not.toContain('aria-expanded');
    expect(icon.find((entry) => entry.selector === '.hamburger-icon')?.props).toMatchObject({
      '--hamburger-icon-w': 'var(--size-16)',
      '--hamburger-icon-h': 'var(--size-12)',
      '--hamburger-icon-bar': 'var(--border-width-thick)',
    });
  });

  it('moves the bars only in the title bar main menu', () => {
    const elsewhere = cssFiles(SRC).filter((file) => file !== MORPH_CSS).filter(movesBars);
    expect(elsewhere).toEqual([]);
    for (const entry of RULES) expect(entry.selector.startsWith(MENU) || entry.selector.startsWith(OPEN)).toBe(true);
  });

  it('moves translate, rotate and opacity only, on the motion tokens', () => {
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
    expect(still?.selector.split(',').map((part) => part.trim())).toEqual([MENU, OPEN]);
  });

  it('keeps the open shape of the title bar main menu', () => {
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
