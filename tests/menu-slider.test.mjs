/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { SLIDER_OWN_KEYS } from '../src/composites/DropdownMenu/DropdownMenu.constants';
import { MENU_ITEM_SELECTOR } from '../src/composites/DropdownMenu/behavior/menu-items-of.constants';
import { actionBar } from '../src/composites/WindowTitleBar/behavior/action-bar';
import { hideOrder } from '../src/composites/WindowTitleBar/behavior/hide-order';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { TitleBarAction } from '../src/composites/WindowTitleBar/sub-components/TitleBarAction';
import { WINDOWS_STRINGS } from '../src/primitives/strings/windows-strings.constants';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const ignore = () => undefined;
const STRINGS = { ...WINDOWS_STRINGS, mute: 'Mute', unmute: 'Unmute' };

const volume = (over = {}) => ({ id: 'volume', label: 'Volume', bar: 'volume', value: 70, muted: false, onChange: vi.fn(), onMutedChange: vi.fn(), ...over });
const rowsOf = (action) => titleBarMenu({ menu: [], actions: [action], pin: false, fullscreenButton: false, pinned: false, fullscreen: false, onControl: ignore, strings: STRINGS })[0].items;

describe('a slider row in a menu', () => {
  it('draws a labelled slider that the menu arrows reach', () => {
    const groups = [{ id: 'sound', items: [{ id: 'music', label: 'Music', kind: 'slider', value: 40, onChange: ignore }, { id: 'reset', label: 'Reset' }] }];
    const html = renderToString(h(DropdownMenu, { inline: true, groups }));
    expect(html).toContain('class="dropdown__item dropdown__slider"');
    expect(html).toContain('aria-label="Music"');
    expect(html).toContain('value="40"');
    expect(MENU_ITEM_SELECTOR).toBe('[role^="menuitem"], .dropdown__slider .slider__input');
  });

  it('keeps Left, Right, Page Up and Page Down for the value and leaves Up and Down to the menu', () => {
    expect(SLIDER_OWN_KEYS).toEqual(['ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown']);
    expect(read('src/composites/DropdownMenu/sub-components/MenuSliderItem.tsx')).toContain('if (SLIDER_OWN_KEYS.includes(event.key)) event.stopPropagation();');
  });
});

describe('a volume action on the title bar', () => {
  it('draws VolumeControl in its popover form and tucks first with the buttons', () => {
    const action = volume();
    expect(actionBar(action)).toBe('volume');
    expect(hideOrder([action], {})[0]).toBe('action:volume');
    const html = renderToString(h(TitleBarAction, { action, away: false, onMenuOpenChange: ignore }));
    expect(html).toMatch(/^<span data-bar-item="action:volume" class="window-title-bar__volume">/);
    expect(html).toContain('volume-control--popover');
    expect(html).toContain('width="14" height="14"');
    expect(html).toContain('icon-btn--sm');
  });

  it('lists a Mute or Unmute row and a slider row in the main menu', () => {
    const action = volume({ shortcut: 'Ctrl+M' });
    const [mute, level] = rowsOf(action);
    expect(mute).toMatchObject({ id: 'volume-mute', label: 'Mute', shortcut: 'Ctrl+M' });
    expect(level).toMatchObject({ id: 'volume-level', kind: 'slider', label: 'Volume', value: 70, min: 0, max: 100 });
    mute.onSelect();
    expect(action.onMutedChange).toHaveBeenCalledWith(true);
    expect(level.formatValue(70)).toBe('70%');
  });

  it('shows the slider at the bottom while muted and unmutes when it is raised', () => {
    const action = volume({ muted: true });
    const [mute, level] = rowsOf(action);
    expect(mute.label).toBe('Unmute');
    expect(level.value).toBe(0);
    level.onChange(30);
    expect(action.onMutedChange).toHaveBeenCalledWith(false);
    expect(action.onChange).toHaveBeenCalledWith(30);
  });
});
