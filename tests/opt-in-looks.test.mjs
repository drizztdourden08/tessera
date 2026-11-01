/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { rowAttrs } from '../src/composites/TrackTable/behavior/row-attrs';

describe('K1 TrackTable rows', { tags: ['critical'] }, () => {
  it('calls onRowClick on a click and on Enter at the row, not on Enter in a cell', () => {
    const seen = [];
    const attrs = rowAttrs({ row: { a: 'x' }, onRowClick: (row) => seen.push(row.a) });
    const row = {};
    attrs.onKeyDown({ target: row, currentTarget: row, key: 'Enter', preventDefault: () => undefined });
    attrs.onKeyDown({ target: {}, currentTarget: row, key: 'Enter', preventDefault: () => undefined });
    attrs.onKeyDown({ target: row, currentTarget: row, key: 'a', preventDefault: () => undefined });
    expect(seen).toEqual(['x']);
  });
});
