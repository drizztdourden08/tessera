/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { buildSchema } from '../src/data';
import { DataTable, groupUid } from '../src/composites/DataTable';
import { detailKeyDown } from '../src/composites/DataTable/behavior/detail-key-down';
import { detailRange } from '../src/composites/DataTable/behavior/detail-range';
import { detailShift } from '../src/composites/DataTable/behavior/detail-shift';
import { flatRects } from '../src/composites/DataTable/behavior/flat-rects';

const ROWS = [
  { id: 'r1', name: 'Echo', team: 'red' },
  { id: 'r2', name: 'Delta', team: 'red' },
  { id: 'r3', name: 'Foxtrot', team: 'blue' },
];
const SCHEMA = buildSchema(ROWS, { kinds: { name: 'string', team: 'string' }, hidden: ['id'] });

const BASE = {
  rows: ROWS,
  schema: SCHEMA,
  getRowId: (row) => row.id,
  renderDetail: (row) => h('span', { className: 'confirm' }, `Delete ${row.name}?`),
};

const draw = (extra) => renderToString(h(DataTable, { ...BASE, ...extra }));

const at = (html, text) => html.indexOf(text);

const rowAt = (html, id) => at(html, `data-marquee-key="${id}"`);

describe('detail row', () => {
  it('draws one detail row directly below the row it belongs to', () => {
    const html = draw({ detailRowId: 'r2' });
    expect((html.match(/data-table__detail"/g) ?? []).length).toBe(1);
    expect(html).toContain('Delete Delta?');
    expect(rowAt(html, 'r2')).toBeLessThan(at(html, 'Delete Delta?'));
    expect(at(html, 'Delete Delta?')).toBeLessThan(rowAt(html, 'r3'));
  });

  it('is a row with one cell that spans the columns', () => {
    const html = draw({ detailRowId: 'r1', selectable: true, selectedIds: new Set() });
    expect(html).toMatch(/class="data-table__detail"[^>]*role="row"/);
    expect(html).toMatch(/class="data-table__detail-cell" role="gridcell" aria-colspan="\d+"/);
    const span = Number(/aria-colspan="(\d+)"/.exec(html)[1]);
    const withoutSelect = Number(/aria-colspan="(\d+)"/.exec(draw({ detailRowId: 'r1' }))[1]);
    expect(span).toBe(withoutSelect + 1);
  });

  it('draws nothing without an id, with a null id, an unknown id or no renderDetail', () => {
    expect(draw({})).not.toContain('data-table__detail"');
    expect(draw({ detailRowId: null })).not.toContain('data-table__detail"');
    expect(draw({ detailRowId: 'missing' })).not.toContain('data-table__detail"');
    expect(draw({ detailRowId: 'r1', renderDetail: undefined })).not.toContain('data-table__detail"');
  });

  it('follows its row inside a group and disappears when the group is closed', () => {
    const groups = (...keys) => ({ fallbackGroupBy: ['team'], expanded: new Set(keys.map((key) => groupUid('', 'team', key))) });
    const open = draw({ detailRowId: 'r3', ...groups('red', 'blue') });
    expect(rowAt(open, 'r3')).toBeGreaterThan(-1);
    expect(rowAt(open, 'r3')).toBeLessThan(at(open, 'Delete Foxtrot?'));
    expect(draw({ detailRowId: 'r3', ...groups('red') })).not.toContain('Delete Foxtrot?');
    expect(draw({ detailRowId: 'r1', ...groups('red') })).toContain('Delete Echo?');
  });

  it('follows its row when the table is sorted', () => {
    const html = draw({ detailRowId: 'r1', sort: [{ path: 'name', dir: 'asc' }] });
    expect(rowAt(html, 'r2')).toBeLessThan(rowAt(html, 'r1'));
    expect(rowAt(html, 'r1')).toBeLessThan(at(html, 'Delete Echo?'));
    expect(at(html, 'Delete Echo?')).toBeLessThan(rowAt(html, 'r3'));
  });
});

const MANY = Array.from({ length: 300 }, (_, index) => ({ id: `row-${index}`, name: `Row ${index}` }));
const MANY_SCHEMA = buildSchema(MANY, { kinds: { name: 'string' }, hidden: ['id'] });

const drawMany = (extra) => renderToString(h(DataTable, {
  rows: MANY, schema: MANY_SCHEMA, getRowId: (row) => row.id, virtualizeFrom: 100, renderDetail: (row) => h('i', null, `D-${row.id}`), ...extra,
}));

describe('detail row in a long table', () => {
  it('is drawn after its row, placed under it, among the rows in view', () => {
    const html = drawMany({ detailRowId: 'row-2' });
    expect(html).toMatch(/data-table__detail"[^>]*style="--dt-index:2"[^>]*data-dt-index="2"/);
    expect(rowAt(html, 'row-2')).toBeLessThan(at(html, 'D-row-2'));
    expect(at(html, 'D-row-2')).toBeLessThan(rowAt(html, 'row-3'));
    expect(html).toContain('--dt-detail-at:2');
  });

  it('marks no detail when nothing is open', () => {
    const html = drawMany({});
    expect(html).toContain('--dt-detail-at:-1');
    expect(html).toContain('--dt-detail-h:0px');
    expect(html).not.toContain('data-table__detail"');
  });
});

const METRICS = { top: 0, viewport: 400, rowHeight: 40 };
const range = (metrics, detail, overscan = 0) => detailRange({ metrics, overscan, count: 100, detail });

describe('virtual heights with a detail', () => {
  it('keeps the plain window when there is no detail', () => {
    expect(range(METRICS, { at: -1, height: 0 })).toEqual({ start: 0, end: 10 });
    expect(range(METRICS, { at: 3, height: 0 })).toEqual({ start: 0, end: 10 });
  });

  it('shows fewer rows at the top, since the detail takes the room of rows', () => {
    expect(range(METRICS, { at: 5, height: 200 })).toEqual({ start: 0, end: 6 });
  });

  it('starts the window after the rows the detail pushed down', () => {
    expect(range({ ...METRICS, top: 440 }, { at: 5, height: 200 })).toEqual({ start: 6, end: 16 });
    expect(range({ ...METRICS, top: 800 }, { at: 5, height: 200 })).toEqual({ start: 15, end: 25 });
  });

  it('keeps the rows above the detail when scrolled inside it', () => {
    expect(range({ ...METRICS, top: 280 }, { at: 5, height: 200 }).start).toBeLessThanOrEqual(6);
    expect(range({ ...METRICS, top: 280 }, { at: 5, height: 200 }).end).toBeGreaterThanOrEqual(6);
  });

  it('moves only the rows below the detail', () => {
    const detail = { at: 2, height: 90 };
    expect([0, 1, 2, 3, 9].map((index) => detailShift(index, detail))).toEqual([0, 0, 0, 90, 90]);
    expect(detailShift(5, undefined)).toBe(0);
    expect(detailShift(5, { at: -1, height: 90 })).toBe(0);
  });

  it('gives the row rects the shift, so a marquee finds the rows where they are', () => {
    const items = [0, 1, 2, 3].map((index) => ({ kind: 'row', key: `r:${index}`, row: index }));
    const rects = flatRects({ items, rowHeight: 40, origin: { x: 0, y: 10 }, width: 300, detail: { at: 1, height: 100 } });
    expect(rects.map((rect) => rect.y)).toEqual([10, 50, 190, 230]);
    expect(rects.every((rect) => rect.height === 40)).toBe(true);
  });
});

describe('Escape in a detail', () => {
  const press = (key, defaultPrevented = false) => ({
    key, defaultPrevented, preventDefault: vi.fn(), stopPropagation: vi.fn(),
  });

  it('asks the app to close the detail', () => {
    const onClose = vi.fn();
    const event = press('Escape');
    detailKeyDown(onClose)(event);
    expect(onClose).toHaveBeenCalledOnce();
    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(event.stopPropagation).toHaveBeenCalledOnce();
  });

  it('leaves other keys and an Escape a field already used', () => {
    const onClose = vi.fn();
    detailKeyDown(onClose)(press('Enter'));
    detailKeyDown(onClose)(press('Escape', true));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('adds no handler when the app gave no onDetailClose', () => {
    expect(detailKeyDown(undefined)).toBeUndefined();
  });
});
