/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';

const ignore = () => undefined;
const BUG = { id: 'bug', icon: 'bug', label: 'Report a bug', onSelect: ignore };
const STRINGS = { view: 'View', pinOnTop: 'Pin window on top', fullscreen: 'Fullscreen' };
const item = (id) => ({ id, label: id, onSelect: ignore });
const MENU = [
  { id: 'screens', items: [item('home'), item('library')] },
  { id: 'tools', items: [item('tools'), { separator: true }, item('settings')] },
  { id: 'app', items: [item('about')] },
];
const base = { menu: MENU, actions: [BUG], pin: true, fullscreenButton: true, pinned: false, fullscreen: false, onControl: ignore, strings: STRINGS };
const ids = (groups) => groups.map((group) => [group.id, group.items.map((node) => node.id ?? '---')]);

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
