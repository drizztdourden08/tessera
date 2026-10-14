/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';

const ignore = () => undefined;
const MENU = [{ id: 'file', items: [{ id: 'open', label: 'Open', onSelect: ignore }] }];
const SEARCH = { id: 'search', icon: 'search', label: 'Search', onSelect: ignore };

describe('a title bar with no window controls', () => {
  const html = renderToString(h(WindowTitleBar, { title: 'Brock', menu: MENU, actions: [SEARCH], controls: false, onControl: ignore }));

  it('draws no control and no controls box, so the space they took closes up', () => {
    expect(html).not.toContain('window-title-bar__controls');
    expect(html).not.toContain('window-title-bar__control');
    expect(html).not.toContain('Pin window on top');
  });

  it('keeps the title, the menu and the actions', () => {
    expect(html).toContain('Brock');
    expect(html).toContain('aria-label="Menu"');
    expect(html).toContain('aria-label="Search"');
  });

  it('can drop close alone, and draws no box once every control is off', () => {
    const shut = renderToString(h(WindowTitleBar, { title: 'Brock', controls: { close: false }, onControl: ignore }));
    expect(shut).not.toContain('window-title-bar__control--close');
    expect(shut).toContain('window-title-bar__controls');
    const controls = { fullscreen: false, minimize: false, maximize: false, close: false };
    expect(renderToString(h(WindowTitleBar, { title: 'Brock', controls, onControl: ignore }))).not.toContain('window-title-bar__controls');
  });
});
