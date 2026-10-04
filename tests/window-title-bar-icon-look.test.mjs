/* @layer tooling-scripts @kind test */
import { createElement, isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { TitleBarActionIcon } from '../src/composites/WindowTitleBar/sub-components/TitleBarActionIcon';

const SEARCH = { id: 'search', icon: 'search', label: 'Search', tone: 'primary', effect: 'twinkle', onSelect: () => undefined };
const BUG = { id: 'bug', icon: 'bug', label: 'Report a bug', tone: 'danger', effect: 'ping', onSelect: () => undefined };
const PLAIN = { id: 'plain', icon: 'flag', label: 'Plain', onSelect: () => undefined };
const STRINGS = { view: 'View', pinOnTop: 'Pin on top', fullscreen: 'Fullscreen' };

const menuIcon = (action) => {
  const groups = titleBarMenu({ menu: [], actions: [action], pin: false, fullscreenButton: false, pinned: false, fullscreen: false, onControl: () => undefined, strings: STRINGS });
  return groups.flatMap((group) => group.items).find((item) => item.id === action.id)?.icon;
};

describe('title bar action icons', () => {
  it('colour the icon by tone and draw its effect', () => {
    const search = renderToStaticMarkup(createElement(TitleBarActionIcon, { action: SEARCH, size: 14 }));
    expect(search).toContain('window-title-bar__icon--primary');
    expect(renderToStaticMarkup(createElement(TitleBarActionIcon, { action: BUG, size: 14 }))).toContain('window-title-bar__icon--danger');
    expect(renderToStaticMarkup(createElement(TitleBarActionIcon, { action: PLAIN, size: 14 }))).not.toContain('window-title-bar__icon--');
  });

  it('keep the tone and effect when the action folds into the main menu', () => {
    expect(isValidElement(menuIcon(SEARCH))).toBe(true);
    expect(isValidElement(menuIcon(BUG))).toBe(true);
    expect(menuIcon(PLAIN)).toBe('flag');
  });
});
