/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SideNav } from '../src/composites/SideNav';
import { readStoredOpen } from '../src/composites/SideNav/behavior/read-stored-open';
import { writeStoredOpen } from '../src/composites/SideNav/behavior/write-stored-open';
import { SideNavLayout } from '../src/composites/SideNavLayout';

const CONFIG = { groups: [{ id: 'main', items: [{ id: 'home', label: 'Home', icon: null }] }] };
const NAV = { config: CONFIG, activeId: 'home', onSelect: () => undefined };
const KEY = 'test.nav-open';

const memoryStorage = () => {
  const items = new Map();
  return { getItem: (key) => items.get(key) ?? null, setItem: (key, value) => items.set(key, String(value)), removeItem: (key) => items.delete(key) };
};

const navOpen = (html) => /class="side-nav [^"]*side-nav--open/.test(html);
const layout = (nav, props = {}) => renderToString(h(SideNavLayout, { nav: { ...NAV, ...nav }, ...props }, 'page'));

describe('SideNavLayout open state', () => {
  beforeEach(() => {
    globalThis.localStorage = memoryStorage();
  });

  afterEach(() => {
    delete globalThis.localStorage;
  });

  it('opens the nav with its labels by default on a wide layout', () => {
    expect(navOpen(layout({}))).toBe(true);
  });

  it('keeps a narrow layout on its strip of icons', () => {
    expect(navOpen(layout({}, { narrow: true }))).toBe(false);
  });

  it('keeps an explicit defaultOpen', () => {
    expect(navOpen(layout({ defaultOpen: false }))).toBe(false);
  });

  it('takes the controlled open value over the default', () => {
    expect(navOpen(layout({ open: false }))).toBe(false);
    expect(navOpen(renderToString(h(SideNav, { ...NAV, open: true })))).toBe(true);
  });

  it('starts from the stored choice when storageKey is set', () => {
    writeStoredOpen(KEY, false);
    expect(navOpen(layout({ storageKey: KEY }))).toBe(false);
    writeStoredOpen(KEY, true);
    expect(navOpen(renderToString(h(SideNav, { ...NAV, storageKey: KEY })))).toBe(true);
  });

  it('ignores the stored choice on a narrow layout, where the open nav floats over the page', () => {
    writeStoredOpen(KEY, true);
    expect(navOpen(layout({ storageKey: KEY }, { narrow: true }))).toBe(false);
  });
});

describe('the stored nav choice', () => {
  afterEach(() => {
    delete globalThis.localStorage;
  });

  it('reads back only a boolean', () => {
    globalThis.localStorage = memoryStorage();
    writeStoredOpen(KEY, true);
    expect(readStoredOpen(KEY)).toBe(true);
    globalThis.localStorage.setItem(KEY, '"yes"');
    expect(readStoredOpen(KEY)).toBeUndefined();
    globalThis.localStorage.setItem(KEY, '{');
    expect(readStoredOpen(KEY)).toBeUndefined();
  });

  it('does nothing without a key or without storage', () => {
    expect(readStoredOpen(undefined)).toBeUndefined();
    expect(readStoredOpen(KEY)).toBeUndefined();
    expect(() => writeStoredOpen(KEY, true)).not.toThrow();
  });
});
