/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { cellControlEvent } from '../src/primitives/dom/cell-control-event';
import { guardCellControl } from '../src/primitives/dom/guard-cell-control';

const node = (tag, parent = null, attrs = {}) => {
  const self = {
    tag,
    parent,
    attrs,
    contains: (other) => {
      for (let at = other; at; at = at.parent) if (at === self) return true;
      return false;
    },
    closest: (selector) => {
      const wanted = selector.split(',').map((part) => part.trim());
      for (let at = self; at; at = at.parent) {
        if (wanted.some((part) => part === at.tag || (part.startsWith('[') && part.slice(1, -1).split('=')[0] in at.attrs))) return at;
      }
      return null;
    },
  };
  return self;
};

const table = () => {
  const row = node('div');
  const cell = node('div', row);
  return { row, cell, text: node('span', cell), button: node('button', cell), icon: node('svg', node('button', cell)) };
};

describe('cellControlEvent', () => {
  it('is true for a button, a link and a marked element inside a cell', () => {
    const { row, button, cell } = table();
    expect(cellControlEvent({ target: button, currentTarget: row })).toBe(true);
    expect(cellControlEvent({ target: node('a', cell), currentTarget: row })).toBe(true);
    expect(cellControlEvent({ target: node('span', cell, { 'data-cell-control': '' }), currentTarget: row })).toBe(true);
  });

  it('is true for the content of a control, such as the icon of a button', () => {
    const { row, icon } = table();
    expect(cellControlEvent({ target: icon, currentTarget: row })).toBe(true);
  });

  it('is false for a plain cell, its text and the row itself', () => {
    const { row, cell, text } = table();
    expect(cellControlEvent({ target: cell, currentTarget: row })).toBe(false);
    expect(cellControlEvent({ target: text, currentTarget: row })).toBe(false);
    expect(cellControlEvent({ target: row, currentTarget: row })).toBe(false);
  });

  it('is true for an event that comes from a portal outside the row', () => {
    const { row } = table();
    expect(cellControlEvent({ target: node('div'), currentTarget: row })).toBe(true);
  });
});

describe('guardCellControl', () => {
  it('runs the row click for a plain cell', () => {
    const { row, text } = table();
    const onClick = vi.fn();
    guardCellControl(onClick)({ target: text, currentTarget: row });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('skips the row click when the target is a button in a cell', () => {
    const { row, button } = table();
    const onClick = vi.fn();
    guardCellControl(onClick)({ target: button, currentTarget: row });
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps no handler when the table has none', () => {
    expect(guardCellControl(undefined)).toBeUndefined();
  });
});
