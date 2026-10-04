/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SideNav } from '../src/composites/SideNav';
import { Tag } from '../src/primitives/Tag';

const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const CONFIG = { groups: [{ id: 'main', items: [{ id: 'home', label: 'Home', icon: null }] }] };

describe('hit areas', () => {
  it('grows the hit area of a hit-area element to the minimum, around its middle, without changing its size', () => {
    const sheet = css('src/tokens/hit-area.css');
    expect(sheet).toMatch(/\.hit-area::after \{[^}]*width: max\(100%, var\(--hit-area, var\(--hit-area-min\)\)\)/);
    expect(sheet).toContain(':where(.hit-area)');
    expect(css('src/tokens/size.css')).toContain('--hit-area-min: var(--size-24);');
    expect(css('src/tokens/index.css')).toContain("@import url('./hit-area.css');");
  });

  it('gives the Tag remove button the hit area', () => {
    const html = renderToString(h(Tag, { onRemove: () => undefined }, 'zelda'));
    expect(html).toMatch(/class="[^"]*tag__remove hit-area[^"]*"/);
  });

  it('gives the SideNav toggle a 28 px hit area', () => {
    const html = renderToString(h(SideNav, { config: CONFIG, activeId: 'home', onSelect: () => undefined }));
    expect(html).toMatch(/class="pressable side-nav__toggle hit-area"/);
    expect(css('src/composites/SideNav/SideNav.css')).toContain('--hit-area: var(--side-nav-toggle-hit);');
  });
});
