/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SideNav } from '../src/composites/SideNav';
import { hasBadge } from '../src/composites/SideNav/behavior/has-badge';

const nav = (badge, open = true) => renderToString(h(SideNav, {
  config: { groups: [{ id: 'main', items: [{ id: 'inbox', label: 'Inbox', icon: null, badge }] }] },
  activeId: 'inbox',
  onSelect: () => undefined,
  open,
}));

describe('SideNavItem badge', () => {
  it('draws a count pill at the row end and a dot over the icon', () => {
    const html = nav(12);
    expect(html).toContain('side-nav__badge');
    expect(html).toContain('badge--inline');
    expect(html).toContain('>12<');
    expect(html).toContain('badge--dot');
    expect(html.indexOf('side-nav__label')).toBeLessThan(html.indexOf('side-nav__badge"'));
    expect(html.indexOf('side-nav__badge"')).toBeLessThan(html.indexOf('side-nav__chevron'));
  });

  it('takes text and shows a custom node as given', () => {
    expect(nav('9+')).toContain('>9+<');
    const custom = nav(h('i', { className: 'mine' }, 'new'));
    expect(custom).toContain('<i class="mine">new</i>');
    expect(custom).toContain('badge--dot');
  });

  it('draws nothing without a badge', () => {
    for (const none of [undefined, null, false, '']) {
      const html = nav(none);
      expect(html).not.toContain('side-nav__badge');
      expect(html).not.toContain('badge--dot');
    }
  });

  it('keeps the pill out of the accessible name and leaves the label alone', () => {
    const html = nav(3);
    expect(html).toContain('aria-label="Inbox"');
    expect(html).toMatch(/side-nav__badge" aria-hidden="true"/);
  });

  it('counts only a shown node as a badge', () => {
    expect(hasBadge(0)).toBe(true);
    expect(hasBadge('1')).toBe(true);
    expect(hasBadge(undefined)).toBe(false);
    expect(hasBadge(null)).toBe(false);
    expect(hasBadge(false)).toBe(false);
    expect(hasBadge(true)).toBe(false);
    expect(hasBadge('')).toBe(false);
  });
});
