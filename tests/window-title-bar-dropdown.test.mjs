/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { hideOrder } from '../src/composites/WindowTitleBar/behavior/hide-order';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';

const ignore = () => undefined;
const CONTROLS = { fullscreen: false, pin: false };
const STRINGS = { view: 'View', pinOnTop: 'Pin window on top', fullscreen: 'Fullscreen' };
const BUG = { id: 'bug', icon: 'bug', label: 'Report a bug', onSelect: ignore };
const GROUP = {
  id: 'group',
  icon: 'group',
  label: 'Window group',
  bar: 'dropdown',
  groups: [
    { id: 'pick', label: 'Group', items: [{ id: 'none', label: 'No group', kind: 'radio', checked: true, onSelect: ignore }, { id: 'one', label: 'Group 1', kind: 'radio', onSelect: ignore }] },
    { id: 'sync', items: [{ id: 'sync', label: 'Sync with main window', kind: 'check', checked: true, onSelect: ignore }] },
  ],
};
const EMPTY = { ...GROUP, id: 'empty', groups: [{ id: 'none', items: [] }] };
const SAVES = { id: 'saves', icon: 'refresh-cw', label: 'Cloud saves', bar: 'status', status: 'Syncing', onSelect: ignore };

describe('WindowTitleBar dropdown actions', () => {
  it('draws a dropdown action as a bar item button that opens a menu, named by its label', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'App', controls: CONTROLS, actions: [GROUP], onControl: ignore }));
    expect(html).toContain('data-bar-item="action:group"');
    expect(html).toMatch(/<button[^>]*aria-label="Window group"[^>]*aria-haspopup="menu"/);
    expect(html).toContain('icon-btn--ghost');
  });

  it('draws nothing for a dropdown with no items, in the bar or the menu', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'App', controls: CONTROLS, actions: [EMPTY], onControl: ignore }));
    expect(html).not.toContain('action:empty');
    expect(hideOrder([EMPTY], CONTROLS)).toEqual([]);
    expect(titleBarMenu({ menu: [], actions: [EMPTY], pin: false, fullscreenButton: false, pinned: false, fullscreen: false, onControl: ignore, strings: STRINGS })).toEqual([]);
  });

  it('hides a dropdown with the buttons, last first, before the pin and the status texts', () => {
    expect(hideOrder([GROUP, BUG, SAVES], {})).toEqual(['action:bug', 'action:group', 'control:pin', 'action:saves', 'control:fullscreen']);
  });

  it('becomes a sub-menu of the main menu with the same items, a separator between its groups', () => {
    const [own] = titleBarMenu({ menu: [], actions: [GROUP], pin: false, fullscreenButton: false, pinned: false, fullscreen: false, onControl: ignore, strings: STRINGS });
    const [sub] = own.items;
    expect([sub.id, sub.label, sub.icon]).toEqual(['group', 'Window group', 'group']);
    expect(sub.children.map((node) => node.label ?? 'separator')).toEqual(['No group', 'Group 1', 'separator', 'Sync with main window']);
    expect(sub.children[0].checked).toBe(true);
  });
});

describe('WindowTitleBar status pulse', () => {
  it('adds a pulsing dot to the status text with pulse, and none without', () => {
    const still = renderToString(h(WindowTitleBar, { title: 'App', controls: CONTROLS, actions: [SAVES], onControl: ignore }));
    expect(still).not.toContain('status--pulse');
    expect(still).not.toContain('status__dot');
    const pulsing = renderToString(h(WindowTitleBar, { title: 'App', controls: CONTROLS, actions: [{ ...SAVES, pulse: true }], onControl: ignore }));
    expect(pulsing).toContain('status--dot status--pulse');
    expect(pulsing).toContain('status__dot');
    expect(pulsing).toContain('emphasis--pulse');
  });
});
