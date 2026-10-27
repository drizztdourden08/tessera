/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { rowAttrs } from '../src/composites/TrackTable/behavior/row-attrs';
import { InlineEdit } from '../src/composites/InlineEdit';
import { MarkdownEditor } from '../src/composites/MarkdownEditor';
import { TrackTable } from '../src/composites/TrackTable';
import { WindowHeader } from '../src/composites/WindowHeader';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

describe('TrackTable rows', () => {
  const columns = [{ id: 'a', label: 'A', cell: (row) => row.a }];
  const rows = [{ a: 'x' }, { a: 'y' }];
  const draw = (extra) => renderToString(h(TrackTable, { label: 'Things', rows, columns, rowKey: (row) => row.a, ...extra }));

  it('keeps plain rows plain by default', () => {
    const out = draw({});
    expect(out).not.toContain('tabindex');
    expect(out).not.toContain('data-interactive');
    expect(out).not.toContain('data-tone');
    expect(out).not.toContain('track-table__detail');
  });

  it('makes a row a focus target with onRowClick', () => {
    const out = draw({ onRowClick: () => undefined });
    expect(out.match(/tabindex="0"/g)).toHaveLength(2);
    expect(out.match(/data-interactive="yes"/g)).toHaveLength(2);
  });

  it('calls onRowClick on a click and on Enter at the row, not on Enter in a cell', () => {
    const seen = [];
    const attrs = rowAttrs({ row: { a: 'x' }, onRowClick: (row) => seen.push(row.a) });
    const row = {};
    attrs.onKeyDown({ target: row, currentTarget: row, key: 'Enter', preventDefault: () => undefined });
    attrs.onKeyDown({ target: {}, currentTarget: row, key: 'Enter', preventDefault: () => undefined });
    attrs.onKeyDown({ target: row, currentTarget: row, key: 'a', preventDefault: () => undefined });
    expect(seen).toEqual(['x']);
  });

  it('draws a full width detail row right under its row', () => {
    const out = draw({ rowDetail: (row) => (row.a === 'x' ? h('i', null, 'More') : null) });
    expect(out.match(/track-table__detail"/g)).toHaveLength(1);
    expect(out.indexOf('More')).toBeGreaterThan(out.indexOf('>x<'));
    expect(out.indexOf('More')).toBeLessThan(out.indexOf('>y<'));
    expect(out).toContain('aria-rowcount="4"');
  });

  it('sets the tone of a row and styles the same names as DataTable rowState', () => {
    const out = draw({ rowTone: (row) => (row.a === 'x' ? 'warning' : undefined) });
    expect(out.match(/data-tone="warning"/g)).toHaveLength(1);
    const css = read('src/composites/TrackTable/TrackTable.css');
    for (const tone of ['active', 'pending', 'error', 'warning', 'fresh', 'muted']) expect(css).toContain(`[data-tone='${tone}']`);
  });
});

describe('InlineEdit look', () => {
  const draw = (extra) => renderToString(h(InlineEdit, { value: 'Title', onCommit: () => undefined, ...extra }));

  it('draws the link look only when asked', () => {
    expect(draw({ look: 'link' })).toContain('inline-edit__view--link');
    expect(draw({})).not.toContain('inline-edit__view--link');
  });

  it('underlines with dashes and sets italic in the link look', () => {
    const css = read('src/composites/InlineEdit/sub-components/InlineEditView.css');
    expect(css).toMatch(/\.inline-edit__view--link \.inline-edit__text \{[^}]*font-style: italic;[^}]*underline dashed/);
  });
});

describe('WindowHeader narrow stack', () => {
  const draw = (extra) => renderToString(h(WindowHeader, { title: 'Files', onClose: () => undefined, ...extra }));

  it('keeps the close button in the row by default', () => {
    const out = draw({});
    expect(out).not.toContain('window-header__tools');
    expect(out).not.toContain('window-header--stack');
  });

  it('wraps the tools and the close button when stackNarrow is set', () => {
    const out = draw({ stackNarrow: true, actions: h('b', null, 'Go') });
    expect(out).toContain('window-header--stack');
    expect(out.indexOf('window-header__tools')).toBeLessThan(out.indexOf('window-header__close'));
    expect(out.indexOf('window-header__tools')).toBeLessThan(out.indexOf('window-header__actions'));
  });

  it('breaks at the pixel width of the window-header-narrow token', () => {
    expect(read('src/tokens/size.css')).toContain('--window-header-narrow: calc(420 * var(--size-1))');
    const css = read('src/composites/WindowHeader/WindowHeader.css');
    expect([...css.matchAll(/@container window-header \(width < (\d+)px\)/g)].map((m) => m[1])).toEqual(['420']);
  });
});

describe('MarkdownEditor toolbar end', () => {
  const draw = (extra) => renderToString(h(MarkdownEditor, { value: '', onChange: () => undefined, layout: 'tabs', ...extra }));

  it('draws the node at the end of the toolbar and nothing without it', () => {
    const out = draw({ toolbarEnd: h('button', null, 'Decide') });
    expect(out).toContain('markdown-editor__toolbar-end');
    expect(out.indexOf('Decide')).toBeGreaterThan(out.indexOf('role="toolbar"'));
    expect(draw({})).not.toContain('markdown-editor__toolbar-end');
  });
});
