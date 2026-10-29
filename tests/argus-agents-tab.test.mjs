/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { trackTemplates } from '../src/composites/TrackTable/behavior/track-templates';
import { TrackTable } from '../src/composites/TrackTable';
import { Card } from '../src/primitives/Card';
import { IconButton } from '../src/primitives/IconButton';
import { Status } from '../src/primitives/Status';
import { Tag } from '../src/primitives/Tag';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

describe('Status dot size and halo', () => {
  it('adds the lg and halo classes only when asked', () => {
    const out = renderToString(h(Status, { tone: 'success', dot: true, dotSize: 'lg', halo: true }, 'Up'));
    expect(out).toContain('status--dot-lg');
    expect(out).toContain('status--halo');
    const plain = renderToString(h(Status, { tone: 'success', dot: true }, 'Up'));
    expect(plain).not.toContain('status--dot-lg');
    expect(plain).not.toContain('status--halo');
  });

  it('draws the dot for a halo even without dot', () => {
    expect(renderToString(h(Status, { tone: 'info', halo: true }, 'Up'))).toContain('status__dot');
  });

  it('rings the dot in the soft tone colour', () => {
    expect(read('src/primitives/Status/Status.css')).toMatch(/\.status--halo \.status__dot \{\s*box-shadow: 0 0 0 var\(--size-3\) var\(--status-edge\);/);
  });
});

describe('Tag dot', () => {
  it('leads with a dot when asked and not otherwise', () => {
    expect(renderToString(h(Tag, { dot: true }, 'Lab'))).toContain('tag__dot');
    expect(renderToString(h(Tag, {}, 'Lab'))).not.toContain('tag__dot');
  });

  it('draws one dot only on a category tag', () => {
    const out = renderToString(h(Tag, { variant: 'category', color: 'teal', dot: true }, 'Lab'));
    expect(out.match(/tag__dot/g)).toHaveLength(1);
  });

  it('keeps the dot attribute off the element', () => {
    expect(renderToString(h(Tag, { dot: true }, 'Lab'))).not.toContain('dot="');
  });
});

describe('IconButton tones', () => {
  it('adds a class for each tone', () => {
    for (const tone of ['danger', 'info', 'accent']) {
      expect(renderToString(h(IconButton, { label: 'Help', tone }, 'i'))).toContain(`icon-btn--tone-${tone}`);
    }
  });
});

describe('Card free header', () => {
  it('draws the header content in place of the title row', () => {
    const out = renderToString(h(Card, { header: h('span', null, 'Free row') }, 'Body'));
    expect(out).toContain('card__header card__header--neutral card__header--free');
    expect(out).toContain('Free row');
    expect(out).toContain('card--headed');
  });

  it('keeps the tone on a free header', () => {
    expect(renderToString(h(Card, { header: 'x', tone: 'info' }, 'Body'))).toContain('card__header--info');
  });
});

describe('TrackTable', () => {
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

  it('draws a named table with a header and a row per item', () => {
    const rows = [{ a: 'x', b: 'y', c: 'z' }];
    const out = renderToString(h(TrackTable, { label: 'Things', rows, columns, rowKey: (row) => row.a }));
    expect(out).toContain('role="table"');
    expect(out).toContain('aria-label="Things"');
    expect(out).toContain('data-drop="1"');
    expect(out.match(/role="row"/g)).toHaveLength(2);
  });

  it('leaves the header out with head false', () => {
    const out = renderToString(h(TrackTable, { label: 'Things', rows: [], columns, rowKey: (row) => row.a, head: false, empty: 'None' }));
    expect(out).not.toContain('columnheader');
    expect(out).toContain('None');
  });

  it('breaks at the pixel widths of the track-drop tokens', () => {
    const tokens = read('src/tokens/size.css');
    expect(tokens).toContain('--track-drop-1: var(--size-768)');
    expect(tokens).toContain('--track-drop-2: var(--size-640)');
    expect(tokens).toContain('--track-drop-3: calc(480 * var(--size-1))');
    const css = read('src/composites/TrackTable/TrackTable.css');
    expect([...css.matchAll(/@container track-table \(width < (\d+)px\)/g)].map((m) => m[1])).toEqual(['1280', '1120', '896', '768', '640', '480']);
  });

  it('writes a token for every hide step and matches its container rule', () => {
    const tokens = read('src/tokens/size.css');
    const css = read('src/composites/TrackTable/TrackTable.css');
    const names = { 1280: 'hide-1280', 1120: 'hide-1120', 896: 'hide-896', 768: 'drop-1', 640: 'drop-2', 480: 'drop-3' };
    for (const [step, name] of Object.entries(names)) {
      const value = [`var(--size-${step})`, `calc(${step} * var(--size-1))`].find((candidate) => tokens.includes(`--track-${name}: ${candidate};`));
      expect(value).toBeDefined();
      expect(css).toContain(`@container track-table (width < ${step}px)`);
      expect(css).toContain(`[data-hide="${step}"]`);
    }
  });
});
