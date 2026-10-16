/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowTitleBar } from '../src/composites';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { BOTH, ids, ignore, MENU_INPUT } from './title-bar-menu-fixture.mjs';

const base = { ...MENU_INPUT, view: false, tucked: BOTH };
const labels = (groups) => groups.flatMap((group) => group.items).filter((node) => node.id?.startsWith('window-title-bar-')).map((node) => node.label);
const DEFAULT = [
  ['screens', ['home', 'library']],
  ['tools', ['tools', '---', 'settings']],
  ['window-title-bar', ['window-title-bar-pin', 'window-title-bar-fullscreen', 'bug']],
  ['app', ['about']],
];

describe('WindowTitleBar tucked rows: defaults', () => {
  it('keeps the rows first in the bar group with no overrides, empty ones or an unknown group', () => {
    expect(ids(titleBarMenu(base))).toEqual(DEFAULT);
    expect(ids(titleBarMenu({ ...base, tuckedRows: {} }))).toEqual(DEFAULT);
    expect(ids(titleBarMenu({ ...base, tuckedRows: { pin: {}, fullscreen: { group: 'missing' } } }))).toEqual(DEFAULT);
  });

  it('changes nothing while View is shown, since View holds both', () => {
    const rows = { pin: { label: 'Keep on top', group: 'screens', hidden: false }, fullscreen: { hidden: true } };
    const shown = titleBarMenu({ ...base, view: undefined, tuckedRows: rows });
    expect(ids(shown)).toEqual(ids(titleBarMenu({ ...base, view: undefined })));
    expect(shown[2].items[0].children.map((node) => node.label)).toEqual(['Pin window on top', 'Fullscreen']);
  });
});

describe('WindowTitleBar tucked rows: labels', () => {
  it('renames a row in both states, and activeLabel names the on state', () => {
    const rows = { pin: { label: 'Keep on top' }, fullscreen: { label: 'Fill the screen', activeLabel: 'Leave full screen' } };
    expect(labels(titleBarMenu({ ...base, tuckedRows: rows }))).toEqual(['Keep on top', 'Fill the screen']);
    expect(labels(titleBarMenu({ ...base, tuckedRows: rows, pinned: true, fullscreen: true }))).toEqual(['Keep on top', 'Leave full screen']);
  });

  it('falls back to the strings for a state with no label of its own', () => {
    const rows = { pin: { activeLabel: 'Stop keeping on top' } };
    expect(labels(titleBarMenu({ ...base, tuckedRows: rows }))).toEqual(['Pin window on top', 'Fullscreen']);
    expect(labels(titleBarMenu({ ...base, tuckedRows: rows, pinned: true }))).toEqual(['Stop keeping on top', 'Fullscreen']);
  });

  it('keeps the icon that says what a pick does', () => {
    const rows = { pin: { label: 'Keep on top' } };
    const icons = (state) => titleBarMenu({ ...base, ...state, tuckedRows: rows })[2].items.slice(0, 2).map((node) => node.icon);
    expect(icons({})).toEqual(['pin', 'maximize-2']);
    expect(icons({ pinned: true, fullscreen: true })).toEqual(['pin-off', 'minimize-2']);
  });

  it('leaves the bar buttons named by the strings', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'App', view: false, tucked: { pin: { label: 'Keep on top' } }, onControl: ignore }));
    expect(html).toContain('aria-label="Pin window on top"');
    expect(html).not.toContain('Keep on top');
  });
});

describe('WindowTitleBar tucked rows: places', () => {
  it('moves a row into a host group at a position counted with separators', () => {
    const groups = titleBarMenu({ ...base, tuckedRows: { pin: { group: 'tools', position: 2 }, fullscreen: { group: 'app', position: 'end' } } });
    expect(ids(groups)).toEqual([
      ['screens', ['home', 'library']],
      ['tools', ['tools', '---', 'window-title-bar-pin', 'settings']],
      ['window-title-bar', ['bug']],
      ['app', ['about', 'window-title-bar-fullscreen']],
    ]);
  });

  it('places a row within the bar group, and keeps the pin first when both share a place', () => {
    expect(ids(titleBarMenu({ ...base, tuckedRows: { pin: { position: 'end' } } }))[2]).toEqual(['window-title-bar', ['window-title-bar-fullscreen', 'bug', 'window-title-bar-pin']]);
    const both = { pin: { group: 'screens', position: 'end' }, fullscreen: { group: 'screens', position: 'end' } };
    expect(ids(titleBarMenu({ ...base, tuckedRows: both }))[0]).toEqual(['screens', ['home', 'library', 'window-title-bar-pin', 'window-title-bar-fullscreen']]);
  });

  it('counts a position among the group items before either row goes in, and clamps it', () => {
    const rows = { pin: { group: 'screens', position: 1 }, fullscreen: { group: 'screens', position: 9 } };
    expect(ids(titleBarMenu({ ...base, tuckedRows: rows }))[0]).toEqual(['screens', ['home', 'window-title-bar-pin', 'library', 'window-title-bar-fullscreen']]);
  });

  it('drops the bar group once both rows move out and it holds nothing else', () => {
    const groups = titleBarMenu({ ...base, actions: [], tuckedRows: { pin: { group: 'app' }, fullscreen: { group: 'app' } } });
    expect(ids(groups)).toEqual([['screens', ['home', 'library']], ['tools', ['tools', '---', 'settings']], ['app', ['window-title-bar-pin', 'window-title-bar-fullscreen', 'about']]]);
  });
});

describe('WindowTitleBar tucked rows: hidden', () => {
  it('removes a hidden row from the menu while the bar still tucks the button', () => {
    expect(ids(titleBarMenu({ ...base, tuckedRows: { pin: { hidden: true } } }))[2]).toEqual(['window-title-bar', ['window-title-bar-fullscreen', 'bug']]);
  });

  it('drops the bar group when every row in it is hidden and there are no actions', () => {
    const groups = titleBarMenu({ ...base, actions: [], tuckedRows: { pin: { hidden: true }, fullscreen: { hidden: true } } });
    expect(groups.map((group) => group.id)).toEqual(['screens', 'tools', 'app']);
  });

  it('still calls onControl with the control of a renamed and moved row', () => {
    const heard = [];
    const groups = titleBarMenu({ ...base, onControl: (control) => heard.push(control), tuckedRows: { pin: { label: 'Keep on top', group: 'screens' } } });
    groups[0].items[0].onSelect();
    expect(heard).toEqual(['pin']);
  });
});
