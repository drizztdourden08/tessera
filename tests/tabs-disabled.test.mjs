/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Tabs } from '../src/primitives/Tabs';
import { rovingIndex } from '../src/primitives/field-control/roving-index';
import { STEP_BY_KEY } from '../src/primitives/Tabs/behavior/tab-steps.constants';

const noop = () => undefined;
const TABS = [
  { id: 'general', label: 'General' },
  { id: 'controls', label: 'Controls', disabled: true, disabledReason: 'Connect a controller first.' },
  { id: 'saves', label: 'Saves' },
  { id: 'cheats', label: 'Cheats', disabled: true },
];
const ENABLED = TABS.map((tab) => tab.disabled !== true);

describe('rovingIndex', () => {
  it('steps over disabled tabs and wraps round', () => {
    expect(rovingIndex('ArrowRight', 0, ENABLED, STEP_BY_KEY)).toBe(2);
    expect(rovingIndex('ArrowRight', 2, ENABLED, STEP_BY_KEY)).toBe(0);
    expect(rovingIndex('ArrowLeft', 0, ENABLED, STEP_BY_KEY)).toBe(2);
    expect(rovingIndex('ArrowLeft', 1, ENABLED, STEP_BY_KEY)).toBe(0);
  });

  it('sends Home and End to the first and last tab that can open', () => {
    expect(rovingIndex('Home', 2, [false, true, true], STEP_BY_KEY)).toBe(1);
    expect(rovingIndex('End', 0, ENABLED, STEP_BY_KEY)).toBe(2);
  });

  it('moves nowhere when no tab can open, or for a key that does not step', () => {
    expect(rovingIndex('ArrowRight', 0, [false, false], STEP_BY_KEY)).toBeNull();
    expect(rovingIndex('Enter', 0, ENABLED, STEP_BY_KEY)).toBeNull();
  });
});

describe('a disabled tab', () => {
  const html = renderToString(h(Tabs, { tabs: TABS, activeTab: 'general', onTabChange: noop }));

  it('stays a tab marked aria-disabled, with its reason read as its description', () => {
    expect(html).toMatch(/<span class="tooltip-anchor tabs__reason"><button type="button" role="tab" aria-selected="false" aria-disabled="true" aria-description="Connect a controller first\."/);
  });

  it('without a reason gets no tooltip and no description', () => {
    const rest = html.slice(html.indexOf('Saves'));
    expect(rest).toMatch(/<button type="button" role="tab" aria-selected="false" aria-disabled="true" class="tabs__tab/);
    expect(rest).not.toContain('tooltip-anchor');
  });

  it('keeps the label as its name when only the icon shows', () => {
    const icons = renderToString(h(Tabs, { tabs: TABS, activeTab: 'general', onTabChange: noop, iconOnly: true }));
    expect(icons).toContain('aria-label="Controls"');
    expect(icons).toContain('title="General"');
    expect(icons).not.toContain('title="Controls"');
  });
});
