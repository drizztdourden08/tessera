/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { hideOrder } from '../src/composites/WindowTitleBar/behavior/hide-order';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';

const ignore = () => undefined;
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
const SAVES = { id: 'saves', icon: 'refresh-cw', label: 'Cloud saves', bar: 'status', status: 'Syncing', onSelect: ignore };

const EMPTY = { ...GROUP, id: 'empty', groups: [{ id: 'none', items: [] }] };

describe('K1 WindowTitleBar dropdown actions', { tags: ['critical'] }, () => {
  it('leaves a dropdown with no items out of the hide order and the menu', () => {
    expect(hideOrder([EMPTY], { fullscreen: false, pin: false })).toEqual([]);
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
