/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Toolbar } from '../src/composites/Toolbar';
import { choiceGroup } from '../src/composites/Toolbar/behavior/choice-group';
import { contentKey } from '../src/composites/Toolbar/behavior/content-key';
import { foldedGroups } from '../src/composites/Toolbar/behavior/folded-groups';
import { keyBadgeKeys } from '../src/composites/Toolbar/behavior/key-badge-keys';
import { panelPlacement } from '../src/composites/Toolbar/behavior/panel-placement';
import { stopIds } from '../src/composites/Toolbar/behavior/stop-ids';
import { tidySeparators } from '../src/composites/Toolbar/behavior/tidy-separators';

const noop = () => undefined;
const strip = (html) => html.replace(/<div class="toolbar__measure"[\s\S]*$/, '');
const choices = [{ value: 'pencil', label: 'Pencil', icon: 'pencil', description: 'One pixel' }, { value: 'eraser', label: 'Eraser', icon: 'eraser' }];
const group = (extra = {}) => ({ kind: 'group', id: 'ink', label: 'Ink', value: 'eraser', choices, onChange: noop, ...extra });
const toggle = (id, extra = {}) => ({ kind: 'toggle', id, label: id, icon: 'pencil', pressed: false, onChange: noop, ...extra });
const render = (items, props = {}) => strip(renderToString(h(Toolbar, { label: 'Tools', items, ...props })));
const count = (html, text) => html.split(text).length - 1;

describe('a group that folds into one menu button or a slot', () => {
  it('is one tab stop showing the current choice, with a menu, where the default group has one stop per choice', () => {
    expect(count(render([group()]), 'data-toolbar-stop="ink:pencil"')).toBe(1);
    const menu = render([group({ display: 'menu' })]);
    expect(count(menu, 'data-toolbar-stop')).toBe(1);
    expect(menu).toContain('data-toolbar-stop="ink"');
    expect(menu).toContain('aria-haspopup="menu"');
    expect(menu).toContain('aria-label="Ink"');
    expect(menu).not.toContain('toolbar__group');
    expect(stopIds([group({ display: 'slot' })], false, false)).toEqual(['ink']);
    expect(stopIds([group()], false, false)).toEqual(['ink:pencil', 'ink:eraser']);
  });

  it('shows a slot pressed with a corner mark, and a menu button never pressed', () => {
    const slot = render([group({ display: 'slot', pressed: true })]);
    expect(slot).toContain('aria-pressed="true"');
    expect(slot).toContain('data-menu="true"');
    expect(render([group({ display: 'menu', pressed: true })])).not.toContain('aria-pressed');
  });

  it('lists the choices as a radio group with icon and description, and still folds to the same group', () => {
    const built = choiceGroup(group());
    expect(built.items.map((item) => [item.label, item.kind, item.checked])).toEqual([['Pencil', 'radio', false], ['Eraser', 'radio', true]]);
    expect(built.items[0].description).toBe('One pixel');
    expect(foldedGroups([group({ display: 'slot' })])[0].items).toHaveLength(2);
  });

  it('draws nothing for a menu without choices', () => {
    expect(count(render([group({ display: 'menu', choices: [] })]), 'data-toolbar-stop')).toBe(0);
  });
});

describe('a popover item', () => {
  const popover = { kind: 'popover', id: 'palette', label: 'Palette', icon: 'palette', render: () => h('span', null, 'panel'), onFold: noop };

  it('is one tab stop that reports a dialog popup, closed until it is pressed', () => {
    const html = render([popover]);
    expect(html).toContain('data-toolbar-stop="palette"');
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('>panel<');
  });

  it('folds into More as an entry that runs onFold, or a disabled one without it', () => {
    const [entry] = foldedGroups([popover])[0].items;
    expect([entry.label, entry.onSelect, entry.disabled]).toEqual(['Palette', noop, false]);
    const [plain] = foldedGroups([{ ...popover, onFold: undefined }])[0].items;
    expect(plain.disabled).toBe(true);
  });

  it('opens beside a vertical bar and below a row', () => {
    expect(panelPlacement('horizontal', 'right')).toBe('bottom-start');
    expect(panelPlacement('vertical', 'right')).toBe('right-start');
    expect(panelPlacement('vertical', 'left')).toBe('left-start');
  });
});

describe('badges and the borrowed look', () => {
  it('anchors a badge with its description on the button, in a bar and in a list', () => {
    const item = toggle('pen', { badge: { glyph: '2', description: 'Two stamps' } });
    for (const layout of ['bar', 'list']) {
      const html = render([item], { layout });
      expect(html).toContain('badge-host');
      expect(html).toContain('aria-label="Two stamps"');
      expect(html).toContain('>2<');
    }
    expect(render([toggle('pen')])).not.toContain('badge-host');
  });

  it('marks a borrowed tool', () => {
    expect(render([toggle('pen', { borrowed: true })])).toContain('data-borrowed="true"');
    expect(render([toggle('pen')])).not.toContain('data-borrowed');
  });
});

describe('named separators', () => {
  const items = [toggle('a'), { kind: 'separator', id: 's', label: 'Shapes' }, toggle('b')];

  it('is a heading in a list and beside the line in a row with labels on', () => {
    expect(render(items, { layout: 'list' })).toContain('toolbar__heading');
    expect(render(items, { layout: 'list' })).toContain('>Shapes<');
    expect(render(items, { orientation: 'horizontal' })).toContain('toolbar__heading--bar');
    expect(render(items, { orientation: 'horizontal', labels: false })).not.toContain('>Shapes<');
    expect(render(items, { orientation: 'vertical' })).not.toContain('>Shapes<');
  });

  it('stays at the start of a list while a plain separator is trimmed, and heads a group in More', () => {
    const named = { kind: 'separator', id: 's', label: 'Shapes' };
    const plain = { kind: 'separator', id: 'p' };
    expect(tidySeparators([named, toggle('a')]).map((item) => item.id)).toEqual(['s', 'a']);
    expect(tidySeparators([plain, toggle('a'), named]).map((item) => item.id)).toEqual(['a']);
    expect(tidySeparators([toggle('a'), plain, plain, toggle('b')]).map((item) => item.id)).toEqual(['a', 'p', 'b']);
    const groups = foldedGroups([toggle('a'), named, toggle('b')]);
    expect(groups.map((entry) => entry.label)).toEqual([undefined, 'Shapes']);
  });

  it('is part of the content key, so a new name measures again', () => {
    const key = (label) => contentKey({ label: 'T', items: [{ kind: 'separator', id: 's', label }] });
    expect(key('A')).not.toBe(key('B'));
  });
});

describe('key badges, off by default and only in a vertical rail', () => {
  const pen = toggle('pen', { shortcut: 'P' });

  it('draws the key on the tool of a vertical bar when asked, and nowhere else', () => {
    expect(render([pen], { orientation: 'vertical', keyBadges: true })).toContain('toolbar__key-badge');
    expect(render([pen], { orientation: 'vertical' })).not.toContain('toolbar__key-badge');
    expect(render([pen], { orientation: 'horizontal', keyBadges: true })).not.toContain('toolbar__key-badge');
    expect(render([pen], { layout: 'list', keyBadges: true })).not.toContain('toolbar__key-badge');
  });

  it('skips a tool without a shortcut and a shortcut of several keys', () => {
    expect(render([toggle('pen')], { orientation: 'vertical', keyBadges: true })).not.toContain('toolbar__key-badge');
    expect(render([toggle('undo', { shortcut: 'Ctrl+Z' })], { orientation: 'vertical', keyBadges: true })).not.toContain('toolbar__key-badge');
    expect(keyBadgeKeys('P')).toEqual(['P']);
    expect(keyBadgeKeys('Ctrl+Z')).toBeUndefined();
    expect(keyBadgeKeys(undefined)).toBeUndefined();
  });
});

describe('inline options in a list', () => {
  const pressed = toggle('pen', { pressed: true, options: [{ id: 'size', items: [{ id: 'one', label: 'One pixel', kind: 'radio', checked: true }] }] });

  it('shows the options under the pressed item only when asked', () => {
    const open = render([pressed], { layout: 'list', inlineOptions: true });
    expect(open).toContain('toolbar__inline-options');
    expect(open).toContain('>One pixel<');
    expect(render([pressed], { layout: 'list' })).not.toContain('toolbar__inline-options');
    expect(render([{ ...pressed, pressed: false }], { layout: 'list', inlineOptions: true })).not.toContain('toolbar__inline-options');
    expect(render([pressed], { orientation: 'vertical', inlineOptions: true })).not.toContain('toolbar__inline-options');
  });
});

describe('open on hold', () => {
  it('opens no menu on hover when the item opens on hold', () => {
    const options = [{ id: 'g', items: [{ id: 'a', label: 'A' }] }];
    const hold = render([toggle('pen', { options, openOn: 'hold' })]);
    expect(hold).toContain('aria-haspopup="menu"');
    expect(hold).toContain('data-menu="true"');
  });
});
