/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HeaderAnchorNav } from '../src/composites/HeaderAnchorNav';
import { Badge } from '../src/primitives/Badge';
import { badgeText } from '../src/primitives/Badge/behavior/badge-text';
import { Card } from '../src/primitives/Card';
import { SectionHeader } from '../src/primitives/SectionHeader';
import { Tabs } from '../src/primitives/Tabs';

const badges = (html) => html.match(/class="badge /g)?.length ?? 0;

describe('hideZero', () => {
  it('turns a count that reads 0 into no text, and leaves every other count alone', () => {
    expect(badgeText(0, undefined, true)).toBe('');
    expect(badgeText('0', undefined, true)).toBe('');
    expect(badgeText(0.4, undefined, true)).toBe('');
    expect(badgeText(0, undefined)).toBe('0');
    expect(badgeText(3, undefined, true)).toBe('3');
    expect(badgeText(120, 99, true)).toBe('99+');
    expect(badgeText('10', undefined, true)).toBe('10');
  });

  it('draws no Badge at 0, and keeps the host it wraps', () => {
    expect(renderToString(h(Badge, { value: 0, hideZero: true }))).toBe('');
    expect(renderToString(h(Badge, { value: 0, variant: 'inline', hideZero: true }))).toBe('');
    expect(renderToString(h(Badge, { value: 0, hideZero: true }, h('i', null, 'bell')))).toBe('<i>bell</i>');
    expect(badges(renderToString(h(Badge, { value: 0 })))).toBe(1);
  });

  it('hides an undefined value with or without it', () => {
    expect(renderToString(h(Badge, { value: undefined }))).toBe('');
    expect(renderToString(h(Badge, { value: undefined, variant: 'inline' }))).toBe('');
  });

  it('reaches the counts of Tabs, Card, SectionHeader and HeaderAnchorNav', () => {
    const tabs = [{ id: 'a', label: 'All', badge: 4 }, { id: 'e', label: 'Errors', badge: 0 }];
    const tab = (hideZero) => renderToString(h(Tabs, { tabs, activeTab: 'a', onTabChange: () => undefined, hideZero }));
    expect(badges(tab(false))).toBe(2);
    expect(badges(tab(true))).toBe(1);

    expect(badges(renderToString(h(Card, { title: 'Saves', count: 0 }, 'body')))).toBe(1);
    expect(badges(renderToString(h(Card, { title: 'Saves', count: 0, hideZero: true }, 'body')))).toBe(0);
    expect(badges(renderToString(h(SectionHeader, { title: 'Saves', count: 0, hideZero: true })))).toBe(0);
    expect(badges(renderToString(h(SectionHeader, { title: 'Saves', count: 2, hideZero: true })))).toBe(1);

    const items = [{ id: 'a', label: 'Overview', badge: 0 }, { id: 'b', label: 'Logs', badge: 3 }];
    const nav = (hideZero) => renderToString(h(HeaderAnchorNav, { items, activeId: 'a', onSelect: () => undefined, ariaLabel: 'Sections', hideZero }));
    expect(badges(nav(false))).toBe(2);
    expect(badges(nav(true))).toBe(1);
  });
});
