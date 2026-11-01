/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { choiceGroup } from '../src/composites/Toolbar/behavior/choice-group';
import { contentKey } from '../src/composites/Toolbar/behavior/content-key';
import { foldedGroups } from '../src/composites/Toolbar/behavior/folded-groups';
import { panelPlacement } from '../src/composites/Toolbar/behavior/panel-placement';
import { stopIds } from '../src/composites/Toolbar/behavior/stop-ids';
import { tidySeparators } from '../src/composites/Toolbar/behavior/tidy-separators';

const noop = () => undefined;
const choices = [{ value: 'pencil', label: 'Pencil', icon: 'pencil', description: 'One pixel' }, { value: 'eraser', label: 'Eraser', icon: 'eraser' }];
const group = (extra = {}) => ({ kind: 'group', id: 'ink', label: 'Ink', value: 'eraser', choices, onChange: noop, ...extra });
const toggle = (id, extra = {}) => ({ kind: 'toggle', id, label: id, icon: 'pencil', pressed: false, onChange: noop, ...extra });

describe('K1 a group that folds into one menu button or a slot', { tags: ['critical'] }, () => {
  it('gives a slot group one stop and the default group one stop per choice', () => {
    expect(stopIds([group({ display: 'slot' })], false, false)).toEqual(['ink']);
    expect(stopIds([group()], false, false)).toEqual(['ink:pencil', 'ink:eraser']);
  });

  it('lists the choices as a radio group with icon and description, and still folds to the same group', () => {
    const built = choiceGroup(group());
    expect(built.items.map((item) => [item.label, item.kind, item.checked])).toEqual([['Pencil', 'radio', false], ['Eraser', 'radio', true]]);
    expect(built.items[0].description).toBe('One pixel');
    expect(foldedGroups([group({ display: 'slot' })])[0].items).toHaveLength(2);
  });
});

describe('K1 a popover item', { tags: ['critical'] }, () => {
  const popover = { kind: 'popover', id: 'palette', label: 'Palette', icon: 'palette', render: () => h('span', null, 'panel'), onFold: noop };

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

describe('K1 named separators', { tags: ['critical'] }, () => {
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
