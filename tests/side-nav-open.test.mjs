/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SideNav } from '../src/composites/SideNav';
import { storedOpen } from '../src/composites/SideNav/behavior/stored-open';
import { readStored } from '../src/primitives/dom/read-stored';
import { writeStored } from '../src/primitives/dom/write-stored';
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

describe('S2 SideNavLayout open state', { tags: ['standard'] }, () => {
  beforeEach(() => {
    globalThis.localStorage = memoryStorage();
  });

  afterEach(() => {
    delete globalThis.localStorage;
  });

  it('starts from the stored choice when storageKey is set', () => {
    writeStored(KEY, false);
    expect(navOpen(layout({ storageKey: KEY }))).toBe(false);
    writeStored(KEY, true);
    expect(navOpen(renderToString(h(SideNav, { ...NAV, storageKey: KEY })))).toBe(true);
  });

  it('ignores the stored choice on a narrow layout, where the open nav floats over the page', () => {
    writeStored(KEY, true);
    expect(navOpen(layout({ storageKey: KEY }, { narrow: true }))).toBe(false);
  });
});

describe('K3 the stored nav choice', { tags: ['critical'] }, () => {
  afterEach(() => {
    delete globalThis.localStorage;
  });

  it('reads back only a boolean', () => {
    globalThis.localStorage = memoryStorage();
    writeStored(KEY, true);
    expect(readStored(KEY, storedOpen)).toBe(true);
    globalThis.localStorage.setItem(KEY, '"yes"');
    expect(readStored(KEY, storedOpen)).toBeUndefined();
    globalThis.localStorage.setItem(KEY, '{');
    expect(readStored(KEY, storedOpen)).toBeUndefined();
  });

  it('does nothing without a key or without storage', () => {
    expect(readStored(undefined, storedOpen)).toBeUndefined();
    expect(readStored(KEY, storedOpen)).toBeUndefined();
    expect(() => writeStored(KEY, true)).not.toThrow();
  });
});
