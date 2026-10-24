/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ContextMenu } from '../src/composites/ContextMenu';
import { MENU_ROOM } from '../src/composites/ContextMenu/ContextMenu.constants';
import { eventPoint } from '../src/composites/ContextMenu/behavior/event-point';
import { keyboardPoint } from '../src/composites/ContextMenu/behavior/keyboard-point';
import { isMenuKey } from '../src/composites/ContextMenu/behavior/is-menu-key';
import { movedPastSlop } from '../src/composites/ContextMenu/behavior/moved-past-slop';
import { pointPlacement } from '../src/composites/ContextMenu/behavior/point-placement';

const VIEW = { width: 1000, height: 800 };
const GROUPS = [{ id: 'g', items: [{ id: 'a', label: 'Alpha' }] }];

describe('ContextMenu point placement', () => {
  it('opens below and to the right of the point when there is room', () => {
    expect(pointPlacement({ x: 100, y: 100 }, VIEW)).toEqual({ side: 'below', align: 'start' });
  });

  it('flips above near the bottom edge', () => {
    expect(pointPlacement({ x: 100, y: VIEW.height - 20 }, VIEW)).toEqual({ side: 'above', align: 'start' });
  });

  it('flips to the left near the right edge', () => {
    expect(pointPlacement({ x: VIEW.width - 20, y: 100 }, VIEW)).toEqual({ side: 'below', align: 'end' });
  });

  it('flips on both axes in the bottom right corner', () => {
    expect(pointPlacement({ x: VIEW.width - 5, y: VIEW.height - 5 }, VIEW)).toEqual({ side: 'above', align: 'end' });
  });

  it('stays put when the other side has even less room', () => {
    const small = { width: MENU_ROOM.width, height: MENU_ROOM.height };
    expect(pointPlacement({ x: 10, y: 10 }, small)).toEqual({ side: 'below', align: 'start' });
  });

  it('keeps below when the point sits exactly at the room limit', () => {
    expect(pointPlacement({ x: 0, y: VIEW.height - MENU_ROOM.height }, VIEW).side).toBe('below');
  });
});

describe('ContextMenu keyboard opening', () => {
  it('opens under the left edge of the focused element', () => {
    expect(keyboardPoint({ left: 40, bottom: 90 })).toEqual({ x: 40, y: 90 });
  });

  it('takes the pointer position for a real right-click', () => {
    expect(eventPoint({ x: 12, y: 34 }, { left: 40, bottom: 90 })).toEqual({ x: 12, y: 34 });
  });

  it('falls back to the element for a menu event without a position', () => {
    expect(eventPoint({ x: 0, y: 0 }, { left: 40, bottom: 90 })).toEqual({ x: 40, y: 90 });
  });

  it('knows the menu key and Shift+F10', () => {
    expect(isMenuKey({ key: 'ContextMenu', shiftKey: false })).toBe(true);
    expect(isMenuKey({ key: 'F10', shiftKey: true })).toBe(true);
    expect(isMenuKey({ key: 'F10', shiftKey: false })).toBe(false);
    expect(isMenuKey({ key: 'F10', shiftKey: true, ctrlKey: true })).toBe(false);
    expect(isMenuKey({ key: 'Enter', shiftKey: true })).toBe(false);
  });
});

describe('ContextMenu long press', () => {
  it('keeps the press while the finger stays within the slop', () => {
    expect(movedPastSlop({ x: 0, y: 0 }, { x: 6, y: 6 })).toBe(false);
  });

  it('cancels the press when the finger moves past the slop', () => {
    expect(movedPastSlop({ x: 0, y: 0 }, { x: 12, y: 0 })).toBe(true);
    expect(movedPastSlop({ x: 0, y: 0 }, { x: 8, y: 8 })).toBe(true);
  });
});

describe('ContextMenu render', () => {
  it('draws only its target while closed', () => {
    const html = renderToString(h(ContextMenu, { groups: GROUPS }, 'Target'));
    expect(html).toContain('class="context-menu"');
    expect(html).toContain('Target');
    expect(html).not.toContain('role="menu"');
  });

  it('draws nothing when controlled and closed without a target', () => {
    expect(renderToString(h(ContextMenu, { groups: GROUPS, open: false }))).toBe('');
  });
});
