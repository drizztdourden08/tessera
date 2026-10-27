/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListItemList, ListItemRow } from '../src/composites/ListItemRow';
import { headerCells } from '../src/composites/ListItemRow/behavior/header-cells';
import { listItemTracks } from '../src/composites/ListItemRow/behavior/list-item-tracks';

const HEADER = {
  main: 'Session',
  columns: [{ label: 'Players', align: 'end' }, { label: 'Server' }],
  action: 'Join',
};

const SHAPE = { icon: true, columns: 2, action: true };

const rows = () => [
  h(ListItemRow, {
    key: 'a', name: 'Friday', icon: h('i'), columns: [{ primary: '8' }, { primary: 'eu' }], action: h('button', null, 'Join'),
  }),
];

describe('ListItemList header', () => {
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

  it('renders inside the list grid, so it shares the track list of the rows', () => {
    const html = renderToString(h(ListItemList, { label: 'Sessions', header: HEADER }, rows()));
    const tracks = listItemTracks(SHAPE);
    expect(html).toContain(`grid-template-columns:${tracks}`);
    expect(html.indexOf('list-item-list__header')).toBeGreaterThan(html.indexOf('role="list"'));
    expect(html.indexOf('list-item-list__header')).toBeLessThan(html.indexOf('list-item-row'));
    expect(html.match(/list-item-list__head /g)).toHaveLength(5);
  });

  it('is a visual row hidden from assistive technology, so the list keeps only its items', () => {
    const html = renderToString(h(ListItemList, { label: 'Sessions', header: HEADER }, rows()));
    expect(html).toMatch(/<div[^>]*class="list-item-list__header row-inset"[^>]*aria-hidden="true"/);
  });

  it('draws nothing without a header', () => {
    expect(renderToString(h(ListItemList, { label: 'Sessions' }, rows()))).not.toContain('list-item-list__header');
  });
});
