/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Toolbar } from '../src/composites/Toolbar';
import { foldedGroups } from '../src/composites/Toolbar/behavior/folded-groups';
import { toolButtonProps } from '../src/composites/Toolbar/behavior/tool-button-props';
import { shortcutRows } from '../src/primitives/Shortcut';
import { TooltipContent } from '../src/primitives/Tooltip';

const ignore = () => undefined;
const SIZE_KEYS = [{ label: 'Smaller', keys: '[' }, { label: 'Larger', keys: ']' }];
const options = [{ id: 'size', items: [{ id: 'one', label: '1 px' }] }];
const toggle = (id, extra = {}) => ({ kind: 'toggle', id, label: id, icon: 'eraser', pressed: false, onChange: ignore, ...extra });
const button = (id, extra = {}) => ({ kind: 'button', id, label: id, icon: 'pencil', onSelect: ignore, ...extra });
const group = { kind: 'group', id: 'mirror', label: 'Mirror', value: 'off', onChange: ignore, choices: [
  { value: 'off', label: 'No mirror', icon: 'square', description: 'Draw where the pointer is.' },
  { value: 'both', label: 'Both ways', icon: 'circle', shortcut: 'M' },
] };
const number = { kind: 'number', id: 'size', label: 'Brush size', description: 'Pixels across.', value: 2, onChange: ignore, shortcut: SIZE_KEYS };

const LIST_ITEMS = [
  toggle('pencil', { description: 'Draw one pixel at a time.', shortcut: 'P', options }),
  { kind: 'separator', id: 'a' },
  group,
  number,
  button('undo', { shortcut: 'Ctrl+Z' }),
];

const list = (items = LIST_ITEMS) => renderToString(h(Toolbar, { items, label: 'Tools', layout: 'list' }));
const tags = (html, pattern) => html.match(pattern) ?? [];
const tool = { toggle: vi.fn(), hover: { onMouseEnter: ignore, onMouseLeave: ignore }, onKeyDown: ignore, open: false };

describe('Toolbar openOn click', () => {
  it('runs the item and toggles its menu on a press', () => {
    const onPress = vi.fn();
    const props = { stopId: 'p', icon: 'pencil', label: 'p', tip: null, onPress, hoverOpen: false, clickOpen: true };
    toolButtonProps(props, tool, true).onClick();
    expect(onPress).toHaveBeenCalledOnce();
    expect(tool.toggle).toHaveBeenCalledOnce();
  });

  it('leaves a press to the item, and opens nothing on a press, when the menu opens on hover', () => {
    const onPress = vi.fn();
    const props = { stopId: 'p', icon: 'pencil', label: 'p', tip: null, onPress, hoverOpen: true };
    const built = toolButtonProps(props, tool, true);
    expect(built.onClick).toBe(onPress);
    expect(built.hover).toBe(tool.hover);
  });

  it('listens for hover only when the menu opens on hover', () => {
    const base = { stopId: 'p', icon: 'pencil', label: 'p', tip: null };
    expect(toolButtonProps({ ...base, hoverOpen: false, clickOpen: true }, tool, true).hover).toEqual({});
    expect(toolButtonProps({ ...base, hoverOpen: true }, tool, true).hover).toBe(tool.hover);
  });

  it('keeps the menu marks on a tool that opens on click', () => {
    const html = renderToString(h(Toolbar, { items: [toggle('pencil', { options, openOn: 'click' })], label: 'Tools' }));
    expect(html).toMatch(/<button[^>]*aria-haspopup="menu"[^>]*aria-expanded="false"[^>]*>/);
    expect(html).toContain('data-menu="true"');
  });
});

describe('Toolbar two shortcuts', () => {
  const draw = (shortcut) => renderToString(h(TooltipContent, { name: 'Brush size', shortcut }));

  it('reads a labelled list as one row for each shortcut', () => {
    expect(shortcutRows(SIZE_KEYS)).toEqual([{ label: 'Smaller', keys: ['['] }, { label: 'Larger', keys: [']'] }]);
    expect(shortcutRows('Ctrl+Z')).toEqual([{ keys: ['ctrl', 'Z'] }]);
    expect(shortcutRows(['ctrl', 'Z'])).toEqual([{ keys: ['ctrl', 'Z'] }]);
  });

  it('draws two labelled rows in the hint', () => {
    const html = draw(SIZE_KEYS);
    expect(tags(html, /class="tooltip-content__row"/g)).toHaveLength(2);
    expect(tags(html, /<kbd class="shortcut shortcut--xs/g)).toHaveLength(2);
    expect(html.indexOf('Smaller')).toBeGreaterThan(-1);
    expect(html.indexOf('Smaller')).toBeLessThan(html.indexOf('Larger'));
  });

  it('keeps the single form as one row without a label', () => {
    const html = draw('Ctrl+Z');
    expect(tags(html, /class="tooltip-content__row"/g)).toHaveLength(1);
    expect(tags(html, /<kbd class="shortcut shortcut--xs/g)).toHaveLength(1);
  });

  it('sets every shortcut as aria-keyshortcuts', () => {
    const html = renderToString(h(Toolbar, { items: [button('size', { shortcut: SIZE_KEYS })], label: 'Tools' }));
    expect(html).toContain('aria-keyshortcuts="[ ]"');
  });

  it('folds a labelled list into the first shortcut of the menu item', () => {
    const [entry] = foldedGroups([button('size', { shortcut: SIZE_KEYS })])[0].items;
    expect(entry.shortcut).toBe('[');
    expect(foldedGroups([button('undo', { shortcut: 'Ctrl+Z' })])[0].items[0].shortcut).toBe('Ctrl+Z');
  });
});

describe('Toolbar list layout', () => {
  it('is a vertical toolbar that says it is a list', () => {
    const html = list();
    expect(html).toContain('role="toolbar"');
    expect(html).toContain('aria-orientation="vertical"');
    expect(html).toContain('data-layout="list"');
  });

  it('draws a row for each tool with its name, description and shortcut, and never folds', () => {
    const html = list();
    const rows = tags(html, /<button[^>]*toolbar__row[^>]*>.*?<\/button>/g);
    expect(rows).toHaveLength(4);
    expect(rows[0]).toContain('toolbar__row-text');
    expect(rows[0]).toContain('Draw one pixel at a time.');
    expect(rows[0]).toContain('<kbd');
    expect(html).not.toContain('toolbar__measure');
    expect(html).not.toContain('More');
  });

  it('keeps the shortcut off the label and sets it as aria-keyshortcuts', () => {
    const [pencil] = tags(list(), /<button[^>]*data-toolbar-stop="pencil"[^>]*>/g);
    expect(pencil).toContain('aria-keyshortcuts="P"');
    expect(pencil).toContain('aria-haspopup="menu"');
  });

  it('draws a group as a labelled set of rows', () => {
    const html = list();
    expect(html).toMatch(/role="group"[^>]*aria-label="Mirror"|aria-label="Mirror"[^>]*role="group"/);
    expect(html).toContain('toolbar__set');
    const rows = tags(html, /<button[^>]*data-toolbar-stop="mirror:[a-z]+"[^>]*>.*?<\/button>/g);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toContain('Draw where the pointer is.');
    expect(rows[0]).toContain('aria-pressed="true"');
    expect(rows[1]).toContain('<kbd');
  });

  it('draws a number as a row with its field and both shortcuts', () => {
    const html = list();
    const row = html.slice(html.indexOf('toolbar__field-row'), html.indexOf('data-toolbar-stop="size"'));
    expect(row).toContain('Brush size');
    expect(row).toContain('Pixels across.');
    expect(tags(row, /<kbd class="shortcut shortcut--xs/g)).toHaveLength(2);
    expect(html).toMatch(/<input[^>]*data-toolbar-stop="size"/);
  });

  it('keeps one tab stop, and a stop for each tool, choice and number in order', () => {
    const stops = tags(list(), /<(?:button|input)[^>]*data-toolbar-stop="[^"]*"[^>]*>/g);
    expect(stops.map((tag) => /data-toolbar-stop="([^"]*)"/.exec(tag)?.[1])).toEqual(['pencil', 'mirror:off', 'mirror:both', 'size', 'undo']);
    expect(stops.map((tag) => /tabindex="(-?\d)"/.exec(tag)?.[1])).toEqual(['0', '-1', '-1', '-1', '-1']);
  });

  it('draws a separator across the list', () => {
    expect(list()).toMatch(/divider--horizontal/);
  });
});
