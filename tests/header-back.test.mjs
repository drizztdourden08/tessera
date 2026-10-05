/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ContentHeader } from '../src/composites/ContentHeader';
import { backFits } from '../src/composites/ContentHeader/behavior/back-fits';
import { ContentHeaderBack } from '../src/composites/ContentHeader/sub-components/ContentHeaderBack';
import { ScreenPage } from '../src/composites/ScreenPage';
import { ScreenWindow } from '../src/composites/ScreenWindow';
import { SettingsPage } from '../src/composites/SettingsPage';
import { WindowHeader } from '../src/composites/WindowHeader';

const ignore = () => undefined;
const BACK = { label: 'Settings', onSelect: ignore };

const BACK_CLASS = /content-header__back(?!drop)/;

const before = (html, first, second) => html.search(first) > -1 && html.search(first) < html.indexOf(second);

describe('WindowHeader back', () => {
  it('draws a Back button before the title and outside the heading, only with back', () => {
    const html = renderToString(h(WindowHeader, { title: 'Save files', back: { onSelect: ignore }, onClose: ignore }));
    expect(html).toContain('aria-label="Back"');
    expect(before(html, 'window-header__back', '<h3')).toBe(true);
    expect(html).not.toMatch(/<h3[^>]*>[^<]*<button/);
    expect(renderToString(h(WindowHeader, { title: 'Save files' }))).not.toContain('window-header__back');
  });

  it('names the page it goes back to, as ContentHeader does', () => {
    expect(renderToString(h(WindowHeader, { title: 'Save files', back: { label: 'profiles', onSelect: ignore } }))).toContain('aria-label="Back to profiles"');
  });

  it('is passed on by ScreenWindow to its title bar', () => {
    const html = renderToString(h(ScreenWindow, { title: 'Sessions', back: { onSelect: ignore }, onClose: ignore }, 'body'));
    expect(html).toContain('window-header__back');
  });
});

describe('ContentHeader back', () => {
  it('draws Back to and the page name before the icon, outside the heading', () => {
    const html = renderToString(h(ContentHeader, { title: 'Startup', icon: 'i', back: BACK }));
    expect(html).toContain('Back to Settings');
    expect(before(html, BACK_CLASS, 'content-header__icon')).toBe(true);
    expect(html).not.toMatch(/<h2[^>]*>[^<]*<button/);
    expect(renderToString(h(ContentHeader, { title: 'Startup' }))).not.toMatch(BACK_CLASS);
  });

  it('is passed on by ScreenPage, SettingsPage and a ScreenWindow header', () => {
    expect(renderToString(h(ScreenPage, { icon: 'i', title: 'Friday async', back: { label: 'Sessions', onSelect: ignore } }, 'body'))).toContain('Back to Sessions');
    expect(renderToString(h(SettingsPage, { icon: 'i', title: 'Startup', back: BACK }, 'body'))).toContain('Back to Settings');
    expect(renderToString(h(ScreenWindow, { title: 'Players', header: {}, back: BACK, onClose: ignore }, 'body'))).toContain('Back to Settings');
  });

  it('reads Back alone when back has no label', () => {
    expect(renderToString(h(ContentHeader, { title: 'Startup', back: { onSelect: ignore } }))).toContain('>Back</span>');
  });
});

describe('header button size', () => {
  const buttons = (html) => [...html.matchAll(/<button[^>]*class="([^"]*)"[^>]*aria-label="(Back[^"]*|Close)"|<button[^>]*class="([^"]*content-header__back[^"]*)"/g)]
    .map((match) => (match[1] ?? match[3]).split(' ').find((name) => /^(icon-)?btn--(xs|sm|md)$/.test(name)));

  it('draws every back and close button of a header at md, as tall as a md Button', () => {
    const drawn = [
      renderToString(h(WindowHeader, { title: 'Save files', back: { onSelect: ignore }, onClose: ignore })),
      renderToString(h(ContentHeaderBack, { back: BACK, folded: false })),
      renderToString(h(ContentHeaderBack, { back: BACK, folded: true })),
      renderToString(h(ScreenWindow, { title: 'Players', header: {}, back: BACK, onClose: ignore }, 'body')),
    ].flatMap(buttons);
    expect(drawn).toEqual(['icon-btn--md', 'icon-btn--md', 'btn--md', 'icon-btn--md', 'btn--md', 'icon-btn--md']);
  });
});

describe('backFits', () => {
  const part = (className, width, scrollWidth = width) => ({ className, offsetWidth: width, scrollWidth, classList: { contains: (name) => className === name } });
  const header = (clientWidth, children) => {
    const styles = new Map(children.map((child) => [child, { position: child.className === 'content-header__backdrop' ? 'absolute' : 'static' }]));
    const view = { getComputedStyle: (element) => styles.get(element) ?? { columnGap: '12px', paddingLeft: '24px', paddingRight: '24px' } };
    return { clientWidth, children, ownerDocument: { defaultView: view } };
  };
  const parts = (backWidth) => [
    part('content-header__backdrop', 999),
    part('content-header__back', backWidth),
    part('content-header__icon', 24),
    part('content-header__title', 60, 100),
  ];

  it('counts the back button at its full width, the title at its natural width, and skips the backdrop', () => {
    expect(backFits(header(48 + 134 + 24 + 100 + 24, parts(28)), 134)).toBe(true);
    expect(backFits(header(48 + 134 + 24 + 100 + 23, parts(28)), 134)).toBe(false);
  });
});
