/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const TONES = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success'];

const html = (props, label = 'Download') => renderToString(h(Button, props, label));
const classOf = (props) => /class="([^"]*)"/.exec(html(props))[1].split(' ');
const textOf = (markup) => markup.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

describe('a large Button', () => {
  it('takes the lg class with the flat and the pixel look', () => {
    expect(classOf({ size: 'lg' })).toContain('btn--lg');
    expect(classOf({ size: 'lg', look: 'pixel' })).toEqual(expect.arrayContaining(['btn--lg', 'btn--pixel']));
  });

  it('is 56 px tall from the tokens, and scales the pixel step and cell up the way sm and xs scale down', () => {
    expect(read('src/tokens/size.css')).toContain('--control-h-lg: var(--size-56);');
    expect(read('src/primitives/Button/Button.css')).toMatch(/\.btn--lg \{[^}]*min-block-size: var\(--control-h-lg\);/);
    expect(read('src/theme/button-pixel.css')).toMatch(/\.btn\.btn--pixel\.btn--lg \{\s*--pixel-step: var\(--size-3\);\s*--pixel-cell: var\(--size-6\);/);
  });
});

describe('a solid Button', () => {
  it('fills a pixel button in place of the dim fill, in every variant but ghost', () => {
    for (const variant of TONES) {
      const classes = classOf({ look: 'pixel', fill: 'solid', variant });
      expect(classes, variant).toEqual(expect.arrayContaining(['btn--pixel', 'btn--solid']));
    }
    expect(classOf({ look: 'pixel', fill: 'solid', variant: 'ghost' })).not.toContain('btn--solid');
    expect(classOf({ look: 'pixel', variant: 'primary' })).not.toContain('btn--solid');
  });

  it('leaves the toned class for a flat solid button', () => {
    const classes = classOf({ fill: 'solid', variant: 'primary' });
    expect(classes).toContain('btn--solid');
    expect(classes).not.toContain('btn--toned');
  });

  it('draws with tokens only', () => {
    expect(read('src/theme/button-solid.css')).not.toMatch(/#[0-9a-f]{3,8}\b|\d+px|rgb\(|hsl\(/i);
  });
});

describe('a Button caption', () => {
  it('draws a second line under the label and reads with it as one name', () => {
    const markup = renderToString(h(Button, { caption: 'v1.4.2, Windows 64-bit' }, 'Download'));
    expect(markup).toContain('<span class="btn__stack"><span class="btn__label">Download</span> <span class="btn__caption">v1.4.2, Windows 64-bit</span></span>');
    expect(textOf(markup)).toBe('Download v1.4.2, Windows 64-bit');
  });

  it('draws no stack without a caption, and works with an icon and while loading', () => {
    expect(html({})).not.toContain('btn__stack');
    const busy = html({ caption: 'Free', icon: h('i', null, 'x'), loading: true });
    expect(busy).toContain('btn__stack');
    expect(busy).toContain('btn__spinner');
    expect(busy).toContain('aria-busy="true"');
  });
});

describe('a Button with an href', () => {
  it('renders a link with the same look, and passes target, rel and download through', () => {
    const markup = renderToString(h(Button, { href: '/get', target: '_blank', rel: 'noopener', download: 'game.zip', look: 'pixel', fill: 'solid', size: 'lg' }, 'Download'));
    expect(markup).toMatch(/^<a /);
    expect(markup).toContain('href="/get"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener"');
    expect(markup).toContain('download="game.zip"');
    expect(classOf({ href: '/get', look: 'pixel', fill: 'solid', size: 'lg' })).toEqual(expect.arrayContaining(['link', 'btn', 'btn--pixel', 'btn--solid', 'btn--lg', 'btn--link']));
  });

  it('drops the href and says it is disabled while disabled or loading', () => {
    for (const state of [{ disabled: true }, { loading: true }]) {
      const markup = html({ href: '/get', onClick: () => undefined, ...state });
      expect(markup, JSON.stringify(state)).not.toContain('href=');
      expect(markup).toContain('aria-disabled="true"');
      expect(markup).toContain('role="link"');
    }
    expect(html({ href: '/get', loading: true })).toContain('aria-busy="true"');
  });

  it('keeps a plain button a button, with its own attributes', () => {
    const markup = html({ type: 'submit' });
    expect(markup).toMatch(/^<button /);
    expect(markup).toContain('type="submit"');
    expect(html({ href: '/get', type: 'submit' })).not.toContain('type="submit"');
  });
});
