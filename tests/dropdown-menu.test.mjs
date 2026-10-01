/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { menuShortcutKeys } from '../src/composites/DropdownMenu/behavior/menu-shortcut-keys';
import { tidyGroups } from '../src/composites/DropdownMenu/behavior/tidy-groups';
import { tidyNodes } from '../src/composites/DropdownMenu/behavior/tidy-nodes';

const SEP = { separator: true };
const item = (id) => ({ id, label: id });
const ids = (nodes) => nodes.map((node) => node.id ?? '|');

describe('tidyNodes', () => {
  it('drops separators at the ends and doubled ones', () => {
    expect(ids(tidyNodes([SEP, item('a'), SEP, SEP, item('b'), SEP]))).toEqual(['a', '|', 'b']);
    expect(tidyNodes([SEP, SEP])).toEqual([]);
  });
});

describe('tidyGroups', () => {
  it('drops a group left with no items', () => {
    const groups = tidyGroups([{ id: 'one', items: [SEP] }, { id: 'two', items: [item('a')] }]);
    expect(groups.map((group) => group.id)).toEqual(['two']);
  });
});

describe('menuShortcutKeys', () => {
  it('splits display text into keys and maps common names', () => {
    expect(menuShortcutKeys('Ctrl+Shift+P')).toEqual(['ctrl', 'shift', 'P']);
    expect(menuShortcutKeys('CmdOrCtrl + Q')).toEqual(['ctrl', 'Q']);
    expect(menuShortcutKeys('Escape')).toEqual(['esc']);
  });

  it('passes a key list through', () => {
    expect(menuShortcutKeys(['alt', 'F4'])).toEqual(['alt', 'F4']);
  });
});

describe('DropdownMenu', () => {
  const groups = [
    { id: 'view', label: 'View', items: [{ id: 'players', label: 'Players', checked: true }, SEP, { id: 'log', label: 'Log', description: 'Server output' }] },
    { id: 'more', items: [{ id: 'layout', label: 'Layout', children: [item('compact')] }] },
  ];

  it('draws groups, labels, checkbox items and submenu triggers with menu roles', () => {
    const html = renderToString(h(DropdownMenu, { inline: true, groups }));
    expect(html).toContain('role="menu"');
    expect(html).toContain('role="group"');
    expect(html).toContain('role="menuitemcheckbox"');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('Server output');
    expect(html.match(/role="separator"/g)).toHaveLength(2);
  });

  it('draws no hamburger when the menu has no items', () => {
    expect(renderToString(h(DropdownMenu, { trigger: 'hamburger', groups: [{ id: 'empty', items: [SEP] }] }))).toBe('');
    expect(renderToString(h(DropdownMenu, { trigger: 'hamburger', groups }))).toContain('aria-haspopup="menu"');
  });
});

describe('WindowTitleBar', () => {
  const ignore = () => undefined;

  it('draws every control by default', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'App', onControl: ignore }));
    expect(html.match(/<button/g)).toHaveLength(5);
    expect(html).toContain('Pin window on top');
  });

  it('removes the controls config turns off, but keeps close', () => {
    const controls = { fullscreen: false, pin: false, minimize: false, maximize: false };
    const html = renderToString(h(WindowTitleBar, { title: 'App', controls, onControl: ignore }));
    expect(html.match(/<button/g)).toHaveLength(1);
    expect(html).toContain('window-title-bar__control--close');
    expect(html).not.toContain('Pin window on top');
  });
});
