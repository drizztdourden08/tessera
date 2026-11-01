/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { trackTemplates } from '../src/composites/TrackTable/behavior/track-templates';

describe('K1 TrackTable hideBelow', { tags: ['critical'] }, () => {
  it('removes the grid track of a column hidden below a named step', () => {
    const cols = [
      { id: 'a', label: 'A', fr: 2, cell: (row) => row.a },
      { id: 'b', label: 'B', hideBelow: 1120, cell: (row) => row.b },
      { id: 'c', label: 'C', hideBelow: 896, cell: (row) => row.c },
      { id: 'd', label: 'D', drop: 1, cell: (row) => row.c },
    ];
    const style = trackTemplates(cols);
    expect(style['--track-cols-0'].split(' minmax').length).toBe(4);
    const tracks = (key) => style[key].split(' minmax').length;
    expect([1280, 1120, 896, 768].map((step) => tracks(`--track-cols-${step}`))).toEqual([4, 3, 2, 1]);
  });
});
