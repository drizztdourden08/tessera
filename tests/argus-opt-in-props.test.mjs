/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { TrackTable } from '../src/composites/TrackTable';
import { trackTemplates } from '../src/composites/TrackTable/behavior/track-templates';
import { Drawer } from '../src/composites/Drawer';
import { WindowHeader } from '../src/composites/WindowHeader';
import { Card } from '../src/primitives/Card';
import { Flex } from '../src/primitives/Flex';
import { FoldText } from '../src/primitives/FoldText/FoldText';

const PATH = 'C:/Users/mira/projects/tessera/src/primitives/FoldText/FoldText.tsx';
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

describe('container prop', () => {
  it('is off by default on Card and Flex', () => {
    expect(renderToStaticMarkup(h(Card, null, 'x'))).not.toContain('container');
    expect(renderToStaticMarkup(h(Flex, null, 'x'))).not.toContain('container');
  });

  it('adds one modifier class on each, both making an inline size container', () => {
    expect(renderToStaticMarkup(h(Card, { container: true }, 'x'))).toContain('card--container');
    expect(renderToStaticMarkup(h(Flex, { container: true }, 'x'))).toContain('flex--container');
    expect(read('src/primitives/Card/Card.css')).toMatch(/\.card--container \{\s*container-type: inline-size;/);
    expect(read('src/primitives/Flex/Flex.css')).toContain('.flex--container { container-type: inline-size; }');
  });
});

describe('FoldText hug', () => {
  it('fills by default and hugs its text when asked', () => {
    const fill = renderToStaticMarkup(h(FoldText, { truncate: 'middle' }, PATH));
    const hug = renderToStaticMarkup(h(FoldText, { truncate: 'middle', hug: true }, PATH));
    expect(fill).toContain('fold-text--fill');
    expect(fill).not.toContain('fold-text__sizer');
    expect(hug).not.toContain('fold-text--fill');
    expect(hug).toContain('fold-text__text--hug');
    expect(hug).toContain(`fold-text__sizer">${PATH}<`);
  });
});

describe('header tools in the eyebrow row', () => {
  const actions = h('button', { 'aria-label': 'Pin record' }, 'Pin');

  it('keeps the tools in the title row by default', () => {
    const html = renderToStaticMarkup(h(WindowHeader, { eyebrow: 'INC-1', title: 'T', actions }));
    expect(html).not.toContain('window-header__eyebrow-row');
    expect(html.indexOf('window-header__title"')).toBeLessThan(html.indexOf('window-header__actions'));
  });

  it('moves them next to the eyebrow, and keeps the close button', () => {
    const html = renderToStaticMarkup(h(WindowHeader, { eyebrow: 'INC-1', title: 'T', actions, actionsRow: 'eyebrow', onClose: () => {} }));
    expect(html.indexOf('window-header__eyebrow-row')).toBeLessThan(html.indexOf('window-header__actions'));
    expect(html.indexOf('window-header__actions')).toBeLessThan(html.indexOf('window-header__title"'));
    expect(html).toContain('window-header__close');
  });

  it('falls back to the title row without an eyebrow', () => {
    const html = renderToStaticMarkup(h(WindowHeader, { title: 'T', actions, actionsRow: 'eyebrow' }));
    expect(html).not.toContain('window-header__eyebrow-row');
    expect(html).toContain('window-header__actions');
  });

  it('is passed through by Drawer as headerActionsRow', () => {
    const html = renderToStaticMarkup(h(Drawer, { open: true, onClose: () => {}, eyebrow: 'INC-1', title: 'T', headerActions: actions, headerActionsRow: 'eyebrow' }, 'Body'));
    expect(html).toContain('window-header__eyebrow-row');
  });
});

describe('TrackTable hideBelow', () => {
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
    const out = renderToStaticMarkup(h(TrackTable, { label: 'Things', rows: [{ a: 'x', b: 'y', c: 'z' }], columns: cols, rowKey: (row) => row.a }));
    expect(out).toContain('data-hide="1120"');
    expect(out).toContain('data-hide="768"');
    expect(out).toContain('data-drop="1"');
  });
});
