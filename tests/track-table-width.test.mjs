/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { TrackTable } from '../src/composites/TrackTable';
import { trackSize } from '../src/composites/TrackTable/behavior/track-size';
import { trackTemplates } from '../src/composites/TrackTable/behavior/track-templates';

const cell = (row) => row.name;

describe('trackSize', () => {
  it('keeps a fraction track for a column with no width', () => {
    expect(trackSize({ id: 'a', label: 'A', cell })).toBe('minmax(0, 1fr)');
    expect(trackSize({ id: 'a', label: 'A', cell, fr: 2 })).toBe('minmax(0, 2fr)');
  });

  it('turns a size or space token name into its custom property', () => {
    expect(trackSize({ id: 'a', label: 'A', cell, width: 'size-96' })).toBe('var(--size-96)');
    expect(trackSize({ id: 'a', label: 'A', cell, width: 'space-lg' })).toBe('var(--space-lg)');
  });

  it('passes a CSS length through, and width wins over fr', () => {
    expect(trackSize({ id: 'a', label: 'A', cell, width: '6rem', fr: 3 })).toBe('6rem');
  });
});

describe('TrackTable fixed width columns', () => {
  const columns = [
    { id: 'name', label: 'Name', cell, fr: 2 },
    { id: 'size', label: 'Size', cell, width: 'size-80', drop: 1 },
  ];

  it('mixes fixed and fraction tracks and drops the fixed one with its level', () => {
    const styles = trackTemplates(columns);
    expect(styles['--track-cols-0']).toBe('minmax(0, 2fr) var(--size-80)');
    expect(styles['--track-cols-1']).toBe('minmax(0, 2fr)');
  });

  it('sets the template on the table', () => {
    const html = renderToStaticMarkup(h(TrackTable, { label: 'Files', rows: [{ name: 'a' }], columns, rowKey: (row) => row.name }));
    expect(html).toContain('--track-cols-0:minmax(0, 2fr) var(--size-80)');
  });
});
