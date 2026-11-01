/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { shortcutKeys } from '../src/primitives/Shortcut/behavior/shortcut-keys';
import { closesOnPick } from '../src/composites/DropdownMenu/behavior/closes-on-pick';
import { menuMatches } from '../src/composites/DropdownMenu/behavior/menu-matches';
import { nodeRuns } from '../src/composites/DropdownMenu/behavior/node-runs';
import { tidyGroups } from '../src/composites/DropdownMenu/behavior/tidy-groups';
import { tidyNodes } from '../src/composites/DropdownMenu/behavior/tidy-nodes';

const SEP = { separator: true };
const item = (id) => ({ id, label: id });
const ids = (nodes) => nodes.map((node) => node.id ?? '|');

describe('K1 tidyNodes', { tags: ['critical'] }, () => {
  it('drops separators at the ends and doubled ones', () => {
    expect(ids(tidyNodes([SEP, item('a'), SEP, SEP, item('b'), SEP]))).toEqual(['a', '|', 'b']);
    expect(tidyNodes([SEP, SEP])).toEqual([]);
  });
});

describe('K1 tidyGroups', { tags: ['critical'] }, () => {
  it('drops a group left with no items', () => {
    const groups = tidyGroups([{ id: 'one', items: [SEP] }, { id: 'two', items: [item('a')] }]);
    expect(groups.map((group) => group.id)).toEqual(['two']);
  });
});

describe('K1 shortcutKeys', { tags: ['critical'] }, () => {
  it('splits display text into keys and maps common names', () => {
    expect(shortcutKeys('Ctrl+Shift+P')).toEqual(['ctrl', 'shift', 'P']);
    expect(shortcutKeys('CmdOrCtrl + Q')).toEqual(['ctrl', 'Q']);
    expect(shortcutKeys('Escape')).toEqual(['esc']);
  });

  it('passes a key list through', () => {
    expect(shortcutKeys(['alt', 'F4'])).toEqual(['alt', 'F4']);
  });

  it('reads Mod by platform, punctuation names and function keys', () => {
    expect(shortcutKeys('Mod+Comma')).toEqual([expect.stringMatching(/^(ctrl|cmd)$/), ',']);
    expect(shortcutKeys('Ctrl+Plus')).toEqual(['ctrl', '+']);
    expect(shortcutKeys('f12')).toEqual(['F12']);
  });

  it('leaves out a part that is not a key', () => {
    expect(shortcutKeys('Ctrl+Banana')).toEqual(['ctrl']);
  });
});

describe('K1 closesOnPick', { tags: ['critical'] }, () => {
  it('keeps the menu open for a check or a radio item and closes it for an action', () => {
    expect(closesOnPick('check', true)).toBe(false);
    expect(closesOnPick('radio', true)).toBe(false);
    expect(closesOnPick('action', true)).toBe(true);
  });

  it('keeps every item open when closeOnSelect is false', () => {
    expect(closesOnPick('action', false)).toBe(false);
  });
});

describe('K1 nodeRuns', { tags: ['critical'] }, () => {
  it('keeps runs of radio items together', () => {
    const radio = (id) => ({ id, label: id, kind: 'radio' });
    const runs = nodeRuns([item('a'), radio('b'), radio('c'), SEP, radio('d')]);
    expect(runs.map((run) => [run.radio, run.nodes.length])).toEqual([[false, 1], [true, 2], [false, 1], [true, 1]]);
  });
});

describe('K1 menuMatches', { tags: ['critical'] }, () => {
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
