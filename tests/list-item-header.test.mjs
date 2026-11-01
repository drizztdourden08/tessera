/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { headerCells } from '../src/composites/ListItemRow/behavior/header-cells';

const HEADER = {
  main: 'Session',
  columns: [{ label: 'Players', align: 'end' }, { label: 'Server' }],
  action: 'Join',
};

const SHAPE = { icon: true, columns: 2, action: true };

describe('K1 ListItemList header', { tags: ['critical'] }, () => {
  it('gives one cell per track, in the order of the tracks', () => {
    const cells = headerCells(HEADER, SHAPE);
    expect(cells.map((cell) => cell.track)).toEqual(['icon', 'main', 'column', 'column', 'action']);
    expect(cells.map((cell) => cell.label)).toEqual([undefined, 'Session', 'Players', 'Server', 'Join']);
    expect(cells.map((cell) => cell.align)).toEqual(['start', 'start', 'end', 'start', 'end']);
  });

  it('draws no cell for a track the rows do not have, and an empty one for a column without a label', () => {
    const cells = headerCells({ main: 'Name' }, { icon: false, columns: 1, action: false });
    expect(cells.map((cell) => cell.track)).toEqual(['main', 'column']);
    expect(cells[1].label).toBeUndefined();
  });

  it('ignores labels past the last column of the rows', () => {
    const cells = headerCells({ columns: [{ label: 'a' }, { label: 'b' }, { label: 'c' }] }, { icon: false, columns: 1, action: false });
    expect(cells).toHaveLength(2);
  });
});
