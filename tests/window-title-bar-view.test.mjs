/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { BOTH, ids, ignore, MENU_INPUT as base } from './title-bar-menu-fixture.mjs';

const ownGroup = (groups) => groups.find((group) => group.id === 'window-title-bar');
const rows = (nodes) => nodes.map((node) => [node.id, node.label, node.icon, node.checked]);

describe('WindowTitleBar view', () => {
  it('keeps View first in the bar group above the last host group when view is absent or empty', () => {
    const today = [['screens', ['home', 'library']], ['tools', ['tools', '---', 'settings']], ['window-title-bar', ['window-title-bar-view', 'bug']], ['app', ['about']]];
    expect(ids(titleBarMenu(base))).toEqual(today);
    expect(ids(titleBarMenu({ ...base, view: {} }))).toEqual(today);
    expect(ids(titleBarMenu({ ...base, view: { group: 'missing' } }))).toEqual(today);
  });

  it('hides View with view false, and drops the bar group when nothing else is in it', () => {
    expect(ids(titleBarMenu({ ...base, view: false }))[2]).toEqual(['window-title-bar', ['bug']]);
    expect(titleBarMenu({ ...base, actions: [], view: false }).map((group) => group.id)).toEqual(['screens', 'tools', 'app']);
  });

  it('places View at a position of its own group, counting separators and clamping the index', () => {
    expect(ids(titleBarMenu({ ...base, view: { position: 'end' } }))[2]).toEqual(['window-title-bar', ['bug', 'window-title-bar-view']]);
    expect(ids(titleBarMenu({ ...base, view: { group: 'tools', position: 2 } }))[1]).toEqual(['tools', ['tools', '---', 'window-title-bar-view', 'settings']]);
    expect(ids(titleBarMenu({ ...base, view: { group: 'screens', position: 9 } }))[0]).toEqual(['screens', ['home', 'library', 'window-title-bar-view']]);
    expect(ids(titleBarMenu({ ...base, view: { group: 'app', position: -3 } }))[3]).toEqual(['app', ['window-title-bar-view', 'about']]);
  });

  it('moves View into a host group and out of the bar group', () => {
    const groups = titleBarMenu({ ...base, actions: [], view: { group: 'screens' } });
    expect(ids(groups)).toEqual([['screens', ['window-title-bar-view', 'home', 'library']], ['tools', ['tools', '---', 'settings']], ['app', ['about']]]);
    expect(groups[0].items[0].children.map((node) => node.id)).toEqual(['pin', 'fullscreen']);
  });

  it('still draws the pin on the bar with View hidden', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'App', view: false, onControl: ignore }));
    expect(html.match(/<button/g)).toHaveLength(5);
    expect(html).toContain('aria-label="Pin window on top"');
  });
});

describe('WindowTitleBar tucked controls', () => {
  it('lists a tucked pin and full screen first in the bar group when View is hidden', () => {
    const groups = titleBarMenu({ ...base, view: false, tucked: ['action:bug', ...BOTH] });
    expect(groups.map((group) => group.id)).toEqual(['screens', 'tools', 'window-title-bar', 'app']);
    expect(ownGroup(groups).items.map((node) => node.id)).toEqual(['window-title-bar-pin', 'window-title-bar-fullscreen', 'bug']);
  });

  it('lists only what is tucked, and nothing while the bar holds both', () => {
    expect(ownGroup(titleBarMenu({ ...base, view: false, tucked: ['control:pin'] })).items.map((node) => node.id)).toEqual(['window-title-bar-pin', 'bug']);
    expect(ownGroup(titleBarMenu({ ...base, view: false, tucked: ['action:bug'] })).items.map((node) => node.id)).toEqual(['bug']);
    expect(ownGroup(titleBarMenu({ ...base, actions: [], view: false, tucked: [] }))).toBeUndefined();
  });

  it('builds the bar group for tucked controls alone, and leaves out a control turned off', () => {
    const groups = titleBarMenu({ ...base, actions: [], pin: false, view: false, tucked: BOTH });
    expect(ownGroup(groups).items.map((node) => node.id)).toEqual(['window-title-bar-fullscreen']);
  });

  it('adds no entries while View is shown, since View holds them', () => {
    const idsWith = (view) => titleBarMenu({ ...base, view, tucked: BOTH }).flatMap((group) => group.items).map((node) => node.id);
    for (const view of [undefined, {}, { group: 'screens' }]) {
      expect(idsWith(view)).not.toContain('window-title-bar-pin');
      expect(idsWith(view)).not.toContain('window-title-bar-fullscreen');
    }
  });
});

describe('WindowTitleBar control entries', () => {
  const view = (state) => ownGroup(titleBarMenu({ ...base, ...state })).items[0].children;
  const tucked = (state) => ownGroup(titleBarMenu({ ...base, ...state, view: false, tucked: BOTH })).items.slice(0, 2);

  it('draws no check mark: the label and icon say what a pick does', () => {
    expect(rows(view({}))).toEqual([['pin', 'Pin window on top', 'pin', undefined], ['fullscreen', 'Fullscreen', 'maximize-2', undefined]]);
    expect(rows(view({ pinned: true, fullscreen: true }))).toEqual([['pin', 'Unpin window', 'pin-off', undefined], ['fullscreen', 'Exit fullscreen', 'minimize-2', undefined]]);
    expect(view({}).every((item) => item.kind === undefined)).toBe(true);
  });

  it('gives the main menu entries the same labels and icons as View', () => {
    expect(tucked({ pinned: true }).map((item) => [item.label, item.icon, item.checked])).toEqual([['Unpin window', 'pin-off', undefined], ['Fullscreen', 'maximize-2', undefined]]);
  });

  it('calls onControl with the control picked', () => {
    const heard = [];
    const entries = tucked({ onControl: (control) => heard.push(control) });
    entries.forEach((item) => item.onSelect());
    expect(heard).toEqual(['pin', 'fullscreen']);
  });
});
