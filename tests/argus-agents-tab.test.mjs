/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { trackTemplates } from '../src/composites/TrackTable/behavior/track-templates';

describe('K1 TrackTable', { tags: ['critical'] }, () => {
  const columns = [
    { id: 'a', label: 'A', fr: 2, cell: (row) => row.a },
    { id: 'b', label: 'B', drop: 1, cell: (row) => row.b },
    { id: 'c', label: 'C', fr: 0.5, drop: 3, cell: (row) => row.c },
  ];

  it('shares the width in fr tracks and removes dropped columns per level', () => {
    const style = trackTemplates(columns);
    expect(style['--track-cols-0']).toBe('minmax(0, 2fr) minmax(0, 1fr) minmax(0, 0.5fr)');
    expect(style['--track-cols-768']).toBe('minmax(0, 2fr) minmax(0, 0.5fr)');
    expect(style['--track-cols-480']).toBe('minmax(0, 2fr)');
  });
});
