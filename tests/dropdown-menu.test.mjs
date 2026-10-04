/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { menuShortcutKeys } from '../src/composites/DropdownMenu/behavior/menu-shortcut-keys';
import { menuMatches } from '../src/composites/DropdownMenu/behavior/menu-matches';
import { nodeRuns } from '../src/composites/DropdownMenu/behavior/node-runs';
import { safeAreaStyle } from '../src/composites/DropdownMenu/behavior/safe-area-style';
import { subMenuJoin } from '../src/composites/DropdownMenu/behavior/sub-menu-join';
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
    expect(html).toContain('dropdown__radio-dot');
    expect(html.match(/dropdown__mark /g)).toHaveLength(3);
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

describe('subMenuJoin', () => {
  const corners = { topLeft: 6, topRight: 6, bottomLeft: 6, bottomRight: 6 };
  const base = {
    row: { top: 130, bottom: 160, left: 11, right: 209 },
    parent: { top: 100, bottom: 400, left: 10, right: 210 },
    parentCorners: corners,
    width: 150, height: 100, lead: 5, line: 1, ring: 2, radius: 6, gap: 6, viewWidth: 1000, viewHeight: 800,
  };
  const full = { corner: 6, fillet: 3 };

  it('sets the sub-menu a gap away with its first item on the row, and runs the tunnel along the row', () => {
    const join = subMenuJoin(base);
    expect(join).toMatchObject({ side: 'right', left: 216, top: 125, edgeOffset: 7, tunnelTop: 5, tunnelBottom: 35 });
    expect(join.parentEnds).toEqual({ top: full, bottom: full });
    expect(join.ownEnds.bottom).toEqual(full);
  });

  it('shares the room between a corner and its fillet when the row sits near a menu end', () => {
    const near = subMenuJoin(base).ownEnds.top;
    expect(near.corner).toBeCloseTo(8 / 3);
    expect(near.fillet).toBeCloseTo(4 / 3);
    expect(subMenuJoin({ ...base, parent: { ...base.parent, top: 125 } }).parentEnds.top.fillet).toBeCloseTo(4 / 3);
    expect(subMenuJoin({ ...base, parent: { ...base.parent, top: 129 } }).parentEnds.top).toEqual({ corner: 0, fillet: 0 });
  });

  it('moves up to stay on screen and keeps the tunnel on the row', () => {
    const join = subMenuJoin({ ...base, viewHeight: 200 });
    expect(join).toMatchObject({ top: 92, tunnelTop: 38, tunnelBottom: 68 });
    expect(join.ownEnds).toEqual({ top: full, bottom: full });
  });

  it('opens on the left without room on the right', () => {
    const nearEdge = { ...base, row: { ...base.row, left: 401, right: 599 }, parent: { ...base.parent, left: 400, right: 600 }, viewWidth: 700 };
    expect(subMenuJoin(nearEdge)).toMatchObject({ side: 'left', left: 244, edgeOffset: 7 });
  });
});

describe('safeAreaStyle', () => {
  const join = subMenuJoin({
    row: { top: 130, bottom: 160, left: 11, right: 209 },
    parent: { top: 100, bottom: 400, left: 10, right: 210 },
    parentCorners: { topLeft: 6, topRight: 6, bottomLeft: 6, bottomRight: 6 },
    width: 150, height: 100, lead: 5, line: 1, ring: 2, radius: 6, gap: 6, viewWidth: 1000, viewHeight: 800,
  });

  const row = { top: 5, bottom: 35, edge: -7 };

  it('spans from the pointer to the sub-menu edge and leaves the row itself to the row', () => {
    expect(safeAreaStyle(join, row, -50, 20)).toEqual({
      left: '-50px', top: '0px', width: '50px', height: '100px',
      clipPath: 'polygon(37.5px 5px, 50px 0px, 50px 100px, 9.38px 35px, 43px 35px, 43px 5px)',
    });
  });

  it('is a plain triangle from the tunnel, and is gone once the pointer is over the sub-menu', () => {
    expect(safeAreaStyle(join, row, -4, 20)).toMatchObject({ left: '-4px', clipPath: 'polygon(0px 20px, 4px 0px, 4px 100px)' });
    expect(safeAreaStyle(join, row, 2, 20)).toBeNull();
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
