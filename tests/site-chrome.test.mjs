/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { SiteFooter } from '../src/composites/SiteFooter';
import { SiteHeader } from '../src/composites/SiteHeader';
import { goTo } from '../src/composites/SiteHeader/behavior/go-to';
import { NAVIGATION_STRINGS } from '../src/primitives/strings/navigation-strings.constants';

const BRAND = { logo: h('svg', { 'data-logo': '' }), title: 'Hookshop', label: 'Hookshop home', href: '/' };
const LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'browse', label: 'Browse', href: '/browse' },
  { id: 'discord', label: 'Discord', href: 'https://discord.com', external: true },
];
const PROFILE = {
  id: 'profile',
  icon: 'user',
  label: 'Ganon Fan',
  bar: 'dropdown',
  groups: [{ id: 'person', items: [{ id: 'sign-out', label: 'Sign out', onSelect: () => undefined }] }],
};
const header = (props) => renderToString(h(SiteHeader, { brand: BRAND, ...props }));

describe('SiteHeader', () => {
  it('draws a header landmark with the logo and the title as one link home', () => {
    const html = header({ className: 'mine' });
    expect(html).toMatch(/^<header class="[^"]*site-header mine">/);
    expect(html).toMatch(/<a [^>]*aria-label="Hookshop home"[^>]*href="\/"|<a [^>]*href="\/"[^>]*aria-label="Hookshop home"/);
    expect(html).toContain('<span class="text-el text-el--span site-header__title" aria-hidden="true">Hookshop</span>');
    expect(html).not.toContain('site-header__links');
    expect(html).not.toContain('site-header__menu');
  });

  it('leaves the title out when brand has none', () => {
    expect(header({ brand: { ...BRAND, title: undefined } })).not.toContain('site-header__title');
  });

  it('lists the links in a named nav, marks the page shown and adds the fold menu', () => {
    const html = header({ links: LINKS, activeId: 'browse' });
    expect(html).toContain(`<nav class="site-header__links" aria-label="${NAVIGATION_STRINGS.siteLinks}">`);
    expect(html).toMatch(/href="\/browse"[^>]*aria-current="page"|aria-current="page"[^>]*href="\/browse"/);
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('site-header__menu');
    expect(html).toContain(`aria-label="${NAVIGATION_STRINGS.menu}"`);
    expect(header({ links: LINKS, label: 'Store' })).toContain('aria-label="Store"');
  });

  it('draws the profile with the title bar dropdown action and keeps actions before it', () => {
    const html = header({ profile: PROFILE, actions: h('button', { id: 'sign-in' }, 'Sign in') });
    expect(html).toContain('window-title-bar__dropdown');
    expect(html).toContain('aria-label="Ganon Fan"');
    expect(html).toContain('aria-haspopup="menu"');
    expect(html.indexOf('id="sign-in"')).toBeLessThan(html.indexOf('window-title-bar__dropdown'));
  });
});

describe('goTo', () => {
  it('hands a local link to navigate, opens an external one in a new tab, and assigns the location without a router', () => {
    const navigate = vi.fn();
    goTo(LINKS[1], navigate);
    expect(navigate).toHaveBeenCalledWith('/browse');
    const open = vi.fn();
    const assign = vi.fn();
    vi.stubGlobal('window', { open, location: { assign } });
    goTo(LINKS[2], navigate);
    expect(open).toHaveBeenCalledWith('https://discord.com', '_blank', 'noopener');
    goTo(LINKS[0]);
    expect(assign).toHaveBeenCalledWith('/');
    expect(navigate).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
  });
});

describe('SiteFooter', () => {
  it('draws a footer with the logo, the note and the links in a named nav', () => {
    const html = renderToString(h(SiteFooter, { logo: h('svg', { 'data-logo': '' }), note: 'Made by players.', links: LINKS }));
    expect(html).toMatch(/^<footer class="[^"]*site-footer">/);
    expect(html).toContain('<svg data-logo=""></svg>');
    expect(html).toContain('site-footer__note">Made by players.</span>');
    expect(html).toContain(`<nav class="site-footer__links" aria-label="${NAVIGATION_STRINGS.siteFooterLinks}">`);
    expect(html.match(/class="link site-footer__link"/g)).toHaveLength(3);
    expect(html).toContain('target="_blank"');
  });

  it('leaves out the note and the nav when they are not given', () => {
    const html = renderToString(h(SiteFooter, {}));
    expect(html).not.toContain('site-footer__note');
    expect(html).not.toContain('<nav');
  });
});
