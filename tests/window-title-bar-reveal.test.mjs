/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { altTap } from '../src/composites/WindowTitleBar/behavior/alt-tap';

const ignore = () => undefined;
const SEARCH = { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+K', onSelect: ignore };
const press = (keys) => keys.reduce((state, [type, key, repeat]) => {
  const tap = altTap(state.armed, { type, key, repeat });
  return { armed: tap.armed, fired: state.fired + (tap.fire ? 1 : 0) };
}, { armed: false, fired: 0 });

describe('Alt reveals the concealed bar', () => {
  it('fires on Alt pressed and released alone', () => {
    expect(press([['keydown', 'Alt'], ['keyup', 'Alt']]).fired).toBe(1);
  });

  it('ignores Alt held with another key, and the key repeat', () => {
    expect(press([['keydown', 'Alt'], ['keydown', 'f'], ['keyup', 'f'], ['keyup', 'Alt']]).fired).toBe(0);
    expect(press([['keydown', 'Alt'], ['keydown', 'Alt', true], ['keyup', 'Alt']]).fired).toBe(0);
    expect(press([['keyup', 'Alt']]).fired).toBe(0);
  });
});

describe('WindowTitleBar brand', () => {
  const brandOf = (html) => html.match(/<div class="window-title-bar__brand">(.*?)<\/div><div class="window-title-bar__brand window-title-bar__brand--mark/)?.[1] ?? '';

  it('draws the app mark once, before the name, and the instance badge after it', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'Brock', logo: 'brock.svg', instance: { name: 'Dev', logo: 'dev.svg' }, onControl: ignore }));
    const brand = brandOf(html);
    expect(brand.match(/window-title-bar__logo/g)).toHaveLength(1);
    expect(brand.indexOf('window-title-bar__logo')).toBeLessThan(brand.indexOf('window-title-bar__title'));
    expect(brand.indexOf('window-title-bar__title')).toBeLessThan(brand.indexOf('window-title-bar__instance'));
  });
});

describe('WindowTitleBar tooltips', () => {
  it('wraps each icon button in a tooltip and names the shortcut of an action', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'Brock', actions: [SEARCH], onControl: ignore }));
    expect(html).toContain('aria-keyshortcuts="Control+K"');
    expect(html.match(/tooltip-anchor window-title-bar__tip/g)).toHaveLength(6);
  });
});
