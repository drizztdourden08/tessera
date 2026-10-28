/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { choiceCellProps } from '../src/composites/ChoiceGrid/behavior/choice-cell-props';
import { choiceGroups } from '../src/composites/ChoiceGrid/behavior/choice-groups';
import { choiceTabStop } from '../src/composites/ChoiceGrid/behavior/choice-tab-stop';
import { nextChoiceIndex } from '../src/composites/ChoiceGrid/behavior/next-choice-index';
import { ChoiceGrid } from '../src/composites/ChoiceGrid';

const cell = (value, extra = {}) => ({ value, label: `Cell ${value}`, ...extra });
const row = ['a', 'b', 'c', 'd', 'e', 'f'].map((value) => cell(value));
const flat = choiceGroups(row, undefined);
const sections = choiceGroups(undefined, [
  { id: 'one', label: 'One', cells: ['a', 'b', 'c', 'd', 'e'].map((value) => cell(value)) },
  { id: 'two', label: 'Two', cells: ['f', 'g', 'h'].map((value) => cell(value)) },
]);

const indices = (groups) => groups.map((group) => group.entries.map((entry) => entry.index));

describe('choice groups', () => {
  it('makes one group of a flat list and numbers every cell once', () => {
    expect(flat).toHaveLength(1);
    expect(flat[0].entries.map((entry) => entry.index)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('numbers cells across sections and keeps the position inside each', () => {
    expect(indices(sections)).toEqual([[0, 1, 2, 3, 4], [5, 6, 7]]);
    expect(sections[1].entries.map((entry) => entry.position)).toEqual([0, 1, 2]);
  });

  it('makes no group for nothing', () => {
    expect(choiceGroups(undefined, undefined)[0].entries).toEqual([]);
  });
});

describe('arrow keys', () => {
  it('steps one cell with the horizontal arrows and wraps at the ends', () => {
    expect(nextChoiceIndex('ArrowRight', 0, flat, undefined)).toBe(1);
    expect(nextChoiceIndex('ArrowLeft', 0, flat, undefined)).toBe(5);
    expect(nextChoiceIndex('ArrowRight', 5, flat, undefined)).toBe(0);
  });

  it('jumps to the first and last cell with Home and End', () => {
    expect(nextChoiceIndex('Home', 3, flat, undefined)).toBe(0);
    expect(nextChoiceIndex('End', 3, flat, undefined)).toBe(5);
  });

  it('steps by one with Up and Down in a single row', () => {
    expect(nextChoiceIndex('ArrowDown', 2, flat, undefined)).toBe(3);
    expect(nextChoiceIndex('ArrowUp', 2, flat, undefined)).toBe(1);
  });

  it('steps by a row with Up and Down when columns is set', () => {
    expect(nextChoiceIndex('ArrowDown', 1, flat, 3)).toBe(4);
    expect(nextChoiceIndex('ArrowUp', 4, flat, 3)).toBe(1);
  });

  it('crosses into the next section on the same column, and back', () => {
    expect(nextChoiceIndex('ArrowDown', 3, sections, 3)).toBe(5);
    expect(nextChoiceIndex('ArrowDown', 4, sections, 3)).toBe(6);
    expect(nextChoiceIndex('ArrowUp', 6, sections, 3)).toBe(4);
    expect(nextChoiceIndex('ArrowUp', 5, sections, 3)).toBe(3);
  });

  it('wraps from the last row to the first, and from the first to the last', () => {
    expect(nextChoiceIndex('ArrowDown', 7, sections, 3)).toBe(2);
    expect(nextChoiceIndex('ArrowUp', 2, sections, 3)).toBe(7);
  });

  it('moves to the next section when the cell below is missing in a short last row', () => {
    expect(nextChoiceIndex('ArrowDown', 2, sections, 3)).toBe(7);
  });

  it('skips cells that are disabled', () => {
    const gaps = choiceGroups([cell('a'), cell('b', { disabled: true }), cell('c')], undefined);
    expect(nextChoiceIndex('ArrowRight', 0, gaps, undefined)).toBe(2);
    expect(nextChoiceIndex('Home', 2, choiceGroups([cell('a', { disabled: true }), cell('b')], undefined), undefined)).toBe(1);
  });

  it('ignores a key that does not move', () => {
    expect(nextChoiceIndex('a', 0, flat, undefined)).toBeNull();
  });
});

describe('the Tab stop', () => {
  const entries = flat[0].entries;

  it('is the focused cell, then the selected one, then the first open one', () => {
    expect(choiceTabStop(entries, 4, 2)).toBe(4);
    expect(choiceTabStop(entries, null, 2)).toBe(2);
    expect(choiceTabStop(entries, null, -1)).toBe(0);
  });

  it('passes over disabled cells', () => {
    const blocked = choiceGroups([cell('a', { disabled: true }), cell('b')], undefined)[0].entries;
    expect(choiceTabStop(blocked, null, 0)).toBe(1);
  });

  it('is none when every cell is disabled', () => {
    expect(choiceTabStop(choiceGroups([cell('a', { disabled: true })], undefined)[0].entries, null, -1)).toBeNull();
  });
});

describe('cell props', () => {
  const entry = flat[0].entries[2];
  const base = { entry, role: 'radiogroup', selected: true, stop: true, pickOnRelease: false, pick: () => undefined, focus: () => undefined };

  it('names a radio with aria-checked and an option with aria-selected', () => {
    expect(choiceCellProps(base)).toMatchObject({ role: 'radio', 'aria-checked': true, 'aria-label': 'Cell c', tabIndex: 0, 'data-choice-index': 2 });
    const option = choiceCellProps({ ...base, role: 'listbox', selected: false, stop: false });
    expect(option).toMatchObject({ role: 'option', 'aria-selected': false, tabIndex: -1 });
    expect(option).not.toHaveProperty('aria-checked');
  });

  it('picks on click, but in release mode only on a key press', () => {
    const picked = [];
    const props = choiceCellProps({ ...base, pick: (index) => picked.push(index) });
    props.onClick({ detail: 1 });
    expect(picked).toEqual([2]);
    const release = choiceCellProps({ ...base, pickOnRelease: true, pick: (index) => picked.push(index) });
    release.onClick({ detail: 1 });
    expect(picked).toEqual([2]);
    release.onClick({ detail: 0 });
    expect(picked).toEqual([2, 2]);
  });
});

describe('ChoiceGrid markup', () => {
  const render = (props) => renderToStaticMarkup(h(ChoiceGrid, { label: 'Brush', onChange: () => undefined, cells: row, ...props }));

  it('is one radio group with one Tab stop on the selected cell', () => {
    const markup = render({ value: 'c' });
    expect(markup).toContain('role="radiogroup"');
    expect(markup).toContain('aria-label="Brush"');
    expect(markup.match(/tabindex="0"/g)).toHaveLength(1);
    expect(markup.match(/tabindex="-1"/g)).toHaveLength(5);
    expect(markup).toContain('aria-checked="true"');
  });

  it('is a listbox on request', () => {
    const markup = render({ value: 'a', role: 'listbox' });
    expect(markup).toContain('role="listbox"');
    expect(markup).toContain('role="option"');
    expect(markup).toContain('aria-selected="true"');
  });

  it('puts the first cell on the Tab stop when nothing is selected', () => {
    expect(render({}).indexOf('tabindex="0"')).toBeLessThan(render({}).indexOf('tabindex="-1"'));
  });

  it('names a section by its heading and lays a grid on columns', () => {
    const markup = render({ cells: undefined, columns: 4, sections: [{ id: 'one', label: 'Round', cells: row }] });
    expect(markup).toContain('role="group"');
    expect(markup).toContain('Round');
    expect(markup).toContain('data-columns="4"');
  });

  it('draws the footer outside the group', () => {
    const markup = render({ footer: h('span', null, 'Add brush') });
    expect(markup.indexOf('Add brush')).toBeGreaterThan(markup.lastIndexOf('</button>'));
    expect(markup).toContain('choice-grid__footer');
  });

  it('lets renderCell draw the cell and hands it the props to spread', () => {
    const markup = render({ value: 'b', renderCell: (c, state) => h('i', { ...state.props, key: c.value }, state.selected ? 'on' : 'off') });
    expect(markup).toContain('<i ');
    expect(markup).toContain('>on</i>');
    expect(markup).not.toContain('choice-grid__cell"');
  });
});
