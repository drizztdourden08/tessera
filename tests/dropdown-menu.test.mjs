/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { menuShortcutKeys } from '../src/composites/DropdownMenu/behavior/menu-shortcut-keys';
import { closesOnPick } from '../src/composites/DropdownMenu/behavior/closes-on-pick';
import { menuMatches } from '../src/composites/DropdownMenu/behavior/menu-matches';
import { nodeRuns } from '../src/composites/DropdownMenu/behavior/node-runs';
import { mascotFor } from '../src/brand/ChosenMascot/behavior/mascot-for';
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

  it('reads Mod by platform, punctuation names and function keys', () => {
    expect(menuShortcutKeys('Mod+Comma')).toEqual([expect.stringMatching(/^(ctrl|cmd)$/), ',']);
    expect(menuShortcutKeys('Ctrl+Plus')).toEqual(['ctrl', '+']);
    expect(menuShortcutKeys('f12')).toEqual(['F12']);
  });

  it('leaves out a part that is not a key', () => {
    expect(menuShortcutKeys('Ctrl+Banana')).toEqual(['ctrl']);
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

  it('draws no trigger when the menu has no items', () => {
    const trigger = { label: 'Menu', iconOnly: true };
    expect(renderToString(h(DropdownMenu, { trigger, groups: [{ id: 'empty', items: [SEP] }] }))).toBe('');
    expect(renderToString(h(DropdownMenu, { trigger, groups }))).toContain('aria-haspopup="menu"');
  });

  it('draws the trigger as an IconButton or a Button in the menu variant', () => {
    const icon = renderToString(h(DropdownMenu, { trigger: { label: 'Menu', iconOnly: true }, variant: 'danger', groups }));
    expect(icon).toContain('icon-btn--danger');
    expect(icon).toContain('aria-label="Menu"');
    expect(icon).toContain('hamburger-icon');
    const text = renderToString(h(DropdownMenu, { trigger: { label: 'View', icon: 'eye', iconSide: 'end' }, size: 'md', groups }));
    expect(text).toContain('btn--md');
    expect(text.indexOf('View')).toBeLessThan(text.indexOf('dropdown-trigger__end'));
  });

  it('draws radio items in a group of their own and reserves the mark column', () => {
    const radios = [{ id: 'a', label: 'A', kind: 'radio', checked: true }, { id: 'b', label: 'B', kind: 'radio', checked: false }];
    const html = renderToString(h(DropdownMenu, { inline: true, groups: [{ id: 'g', items: [item('plain'), ...radios] }] }));
    expect(html.match(/role="menuitemradio"/g)).toHaveLength(2);
    expect(html.match(/dropdown__radio-ring/g)).toHaveLength(2);
    expect(html.match(/dropdown__radio-dot/g)).toHaveLength(1);
    expect(html.match(/dropdown__mark dropdown__mark--radio dropdown__mark--off/g)).toHaveLength(1);
    expect(html.match(/class="[^"]*dropdown__mark /g)).toHaveLength(3);
  });

  it('gives every item the mark and icon slots, sub-menu rows too, and shows a dim check on an unchecked item', () => {
    const view = [
      { id: 'pin', icon: 'pin', label: 'Pin', checked: false },
      { id: 'full', icon: 'maximize-2', label: 'Fullscreen' },
      { id: 'group', label: 'Group', children: [{ id: 'none', label: 'None', kind: 'radio', checked: true }] },
    ];
    const html = renderToString(h(DropdownMenu, { inline: true, groups: [{ id: 'view', items: view }] }));
    expect(html.match(/class="[^"]*dropdown__mark /g)).toHaveLength(3);
    expect(html.match(/class="[^"]*dropdown__icon"/g)).toHaveLength(3);
    expect(html).toMatch(/dropdown__mark--check dropdown__mark--off"[^>]*><svg/);
  });
});

describe('closesOnPick', () => {
  it('keeps the menu open for a check or a radio item and closes it for an action', () => {
    expect(closesOnPick('check', true)).toBe(false);
    expect(closesOnPick('radio', true)).toBe(false);
    expect(closesOnPick('action', true)).toBe(true);
  });

  it('keeps every item open when closeOnSelect is false', () => {
    expect(closesOnPick('action', false)).toBe(false);
  });
});

describe('nodeRuns', () => {
  it('keeps runs of radio items together', () => {
    const radio = (id) => ({ id, label: id, kind: 'radio' });
    const runs = nodeRuns([item('a'), radio('b'), radio('c'), SEP, radio('d')]);
    expect(runs.map((run) => [run.radio, run.nodes.length])).toEqual([[false, 1], [true, 2], [false, 1], [true, 1]]);
  });
});

describe('menuMatches', () => {
  const groups = [
    { id: 'file', label: 'File', items: [item('Open'), { id: 'export', label: 'Export', children: [item('JSON file'), { id: 'more', label: 'More', children: [item('Copy')] }] }] },
  ];

  it('finds items at every level with their path, and leaves out sub-menu parents', () => {
    expect(menuMatches(groups, 'co').map((match) => [match.item.label, match.path.join('/')])).toEqual([['Copy', 'File/Export/More']]);
    expect(menuMatches(groups, 'export').map((match) => match.item.label)).toEqual(['JSON file', 'Copy']);
  });

  it('needs every word and returns nothing for an empty query', () => {
    expect(menuMatches(groups, 'json export')).toHaveLength(1);
    expect(menuMatches(groups, '  ')).toEqual([]);
  });
});

describe('mascotFor', () => {
  it('takes a name as it is and picks by brand, then palette, for auto', () => {
    expect(mascotFor('sentri')).toBe('sentri');
    expect(mascotFor('auto', 'rotp')).toBe('sentri');
    expect(mascotFor('auto', undefined, 'rotp')).toBe('sentri');
    expect(mascotFor('auto', 'tessera', 'archipelia')).toBe('pelago');
    expect(mascotFor('auto', 'tessera', 'tessera')).toBeNull();
  });
});
