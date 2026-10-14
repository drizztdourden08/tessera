/* @layer tooling-scripts @kind test */
import swordsIcon from '@iconify-icons/lucide/swords';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';

const FOLDER = 'M1 3h5l2 2h7v8H1z';
const ITEMS = [
  { id: 'name', icon: 'database', label: 'Name' },
  { id: 'iconify', icon: swordsIcon, label: 'Iconify' },
  { id: 'path', icon: { d: FOLDER }, label: 'Path' },
  { id: 'node', icon: h('b', { className: 'own-mark' }), label: 'Node' },
  { id: 'none', label: 'None' },
];

const iconOf = (html, label) => {
  const row = html.split('role="menuitem"').find((part) => part.includes(`>${label}<`)) ?? '';
  return /dropdown__icon" aria-hidden="true">(.*?)<\/span><span[^>]*dropdown__label/.exec(row)?.[1] ?? '';
};

describe('a menu item icon', () => {
  const html = renderToString(h(DropdownMenu, { inline: true, groups: [{ id: 'g', items: ITEMS }] }));

  it('draws a name, iconify data and path data through Icon', () => {
    expect(iconOf(html, 'Name')).toMatch(/^<svg[^>]*class="icon/);
    expect(iconOf(html, 'Iconify')).toMatch(/^<svg[^>]*class="icon/);
    expect(iconOf(html, 'Path')).toContain(`d="${FOLDER}"`);
  });

  it('draws an element as it is, and keeps the column for an item with no icon', () => {
    expect(iconOf(html, 'Node')).toBe('<b class="own-mark"></b>');
    expect(iconOf(html, 'None')).toBe('');
  });
});
