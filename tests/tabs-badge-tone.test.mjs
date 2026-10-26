/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Tabs } from '../src/primitives/Tabs';
import { tabBadgeColor } from '../src/primitives/Tabs/behavior/tab-badge-color';

const noop = () => undefined;
const badgeClassOf = (tab, activeTab = '') => {
  const html = renderToString(h(Tabs, { tabs: [{ id: 'jobs', label: 'Jobs', badge: 3, ...tab }], activeTab, onTabChange: noop }));
  return html.match(/class="(badge [^"]*)"/)?.[1];
};

describe('tabBadgeColor', () => {
  it('keeps today look without a tone: primary when active, tame otherwise', () => {
    expect(tabBadgeColor(undefined, true)).toBe('primary');
    expect(tabBadgeColor(undefined, false)).toBe('tame');
  });

  it('maps each tone to the Badge colour, active or not', () => {
    expect(tabBadgeColor('neutral', true)).toBe('tame');
    expect(tabBadgeColor('warn', false)).toBe('warning');
    expect(tabBadgeColor('danger', false)).toBe('danger');
    expect(tabBadgeColor('success', true)).toBe('success');
    expect(tabBadgeColor('info', false)).toBe('info');
  });
});

describe('Tabs badgeTitle', () => {
  const render = (tab, props = {}) => renderToString(h(Tabs, { tabs: [{ id: 'jobs', label: 'Jobs', badge: 3, ...tab }], activeTab: '', onTabChange: noop, ...props }));

  it('describes the tab with the title and wraps it in a Tooltip', () => {
    const html = render({ badgeTitle: '3 jobs running' });
    expect(html).toContain('aria-description="3 jobs running"');
    expect(html).toContain('class="tooltip-anchor tabs__reason"');
  });

  it('adds nothing without a title, or without a badge to explain', () => {
    expect(render({})).not.toContain('aria-description');
    expect(render({})).not.toContain('tooltip-anchor');
    expect(render({ badge: undefined, badgeTitle: '3 jobs running' })).not.toContain('aria-description');
  });

  it('follows the disabled reason, and keeps the label as the name when only the icon shows', () => {
    expect(render({ badgeTitle: 'Two failed', disabled: true, disabledReason: 'Locked.' })).toContain('aria-description="Locked. Two failed"');
    const icons = render({ badgeTitle: 'Two failed', icon: 'x' }, { iconOnly: true });
    expect(icons).toContain('aria-label="Jobs"');
    expect(icons).toContain('aria-description="Two failed"');
  });
});

describe('Tabs badgeTone', () => {
  it('draws the badge with the tone class of the Badge primitive', () => {
    expect(badgeClassOf({ badgeTone: 'warn' })).toBe('badge badge--inline badge--warning badge--round');
    expect(badgeClassOf({ badgeTone: 'danger' }, 'jobs')).toBe('badge badge--inline badge--danger badge--round');
    expect(badgeClassOf({ badgeTone: 'info' })).toContain('badge--info');
  });

  it('keeps the default badge when no tone is given', () => {
    expect(badgeClassOf({})).toContain('badge--tame');
    expect(badgeClassOf({}, 'jobs')).toContain('badge--primary');
  });
});
