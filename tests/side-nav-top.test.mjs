/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SideNav } from '../src/composites/SideNav';

const entry = (id, label) => ({ id, label, icon: null });
const GROUPS = [{ id: 'play', label: 'Play', items: [entry('sessions', 'Sessions')] }];

const nav = (config, search) => renderToString(h(SideNav, { config, activeId: 'home', onSelect: () => undefined, open: true, search }));

const count = (html, text) => html.split(text).length - 1;

describe('SideNav top block', () => {
  it('holds Home and the top pages in one block ahead of the groups', () => {
    const html = nav({ home: entry('home', 'Home'), top: [entry('inbox', 'Inbox'), entry('drafts', 'Drafts')], groups: GROUPS });
    expect(count(html, 'class="side-nav__top"')).toBe(1);
    const order = ['aria-label="Home"', 'aria-label="Inbox"', 'aria-label="Drafts"', 'side-nav__groups'].map((text) => html.indexOf(text));
    expect(order.every((at) => at > 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it('draws no divider and no heading between Home and the top pages', () => {
    const html = nav({ home: entry('home', 'Home'), top: [entry('inbox', 'Inbox')], groups: GROUPS });
    const block = html.slice(html.indexOf('side-nav__top'), html.indexOf('side-nav__groups'));
    expect(block).not.toContain('side-nav__split');
    expect(block).not.toContain('side-nav__group-label');
    expect(block).not.toContain('role="group"');
  });

  it('draws one split under the search, before the whole block', () => {
    const html = nav(
      { home: entry('home', 'Home'), top: [entry('inbox', 'Inbox')], groups: GROUPS },
      { value: '', onChange: () => undefined, placeholder: 'Search' },
    );
    expect(count(html, 'side-nav__split')).toBe(1);
    expect(html.indexOf('side-nav__split')).toBeLessThan(html.indexOf('aria-label="Home"'));
  });

  it('shows the top block with pages only, and nothing without Home or pages', () => {
    expect(count(nav({ top: [entry('inbox', 'Inbox')], groups: GROUPS }), 'class="side-nav__top"')).toBe(1);
    expect(nav({ groups: GROUPS })).not.toContain('side-nav__top');
    expect(nav({ top: [], groups: GROUPS })).not.toContain('side-nav__top');
  });

  it('draws a group with an empty label with no heading and no name', () => {
    const html = nav({ groups: [{ id: 'main', label: '', items: [entry('sessions', 'Sessions')] }] });
    expect(html).not.toContain('side-nav__group-label');
    expect(html).not.toContain('aria-label=""');
    expect(html).toContain('role="group"');
  });
});
