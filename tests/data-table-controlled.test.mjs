/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { DataTable, groupUid } from '../src/composites/DataTable';
import { useExpandedGroups } from '../src/composites/DataTable/behavior/useExpandedGroups';
import { useTableView } from '../src/composites/DataTable/behavior/useTableView';
import { buildSchema } from '../src/data';

const ROWS = [
  { id: 'r1', name: 'Bravo', kind: 'a' },
  { id: 'r2', name: 'Alpha', kind: 'a' },
  { id: 'r3', name: 'Charlie', kind: 'b' },
];
const SCHEMA = buildSchema(ROWS, { kinds: { name: 'string', kind: 'string' }, hidden: ['id'] });

const BASE = { rows: ROWS, schema: SCHEMA, getRowId: (row) => row.id };

const draw = (extra) => renderToString(h(DataTable, { ...BASE, ...extra }));

const order = (html) => ['Alpha', 'Bravo', 'Charlie'].sort((a, b) => html.indexOf(a) - html.indexOf(b));

describe('renderCell', () => {
  it('draws what the app returns and falls back to the schema when it returns undefined', () => {
    const renderCell = (row, path) => (path === 'name' ? h('span', { className: 'thumb' }, `T-${row.id}`) : undefined);
    const html = draw({ renderCell });
    expect(html).toContain('<span class="thumb">T-r1</span>');
    expect(html).not.toContain('data-column="name"><span class="text field-kit__text"');
    expect(html).toContain('data-column="kind"><span class="text field-kit__text" title="a">a</span>');
  });

  it('keeps the schema rendering when no renderCell is given', () => {
    expect(draw({})).toContain('Bravo');
  });
});

describe('rowState', () => {
  it('writes data-state on the rows that have one', () => {
    const states = { r1: 'active', r2: 'error' };
    const html = draw({ rowState: (row) => states[row.id] });
    expect(html).toContain('data-state="active"');
    expect(html).toContain('data-state="error"');
    expect((html.match(/data-state=/g) ?? []).length).toBe(2);
  });

  it('writes the warning state and draws it from the warning tone tokens', () => {
    const html = draw({ rowState: (row) => (row.id === 'r1' ? 'warning' : undefined) });
    expect((html.match(/data-state="warning"/g) ?? []).length).toBe(1);
    const css = fs.readFileSync('src/composites/DataTable/DataTable.css', 'utf8');
    expect(css).toMatch(/\[data-state='warning'\]\s*\{\s*background: var\(--c-warning-soft\);/);
    expect(css).toMatch(/\[data-state='warning'\]:not\(\[data-drop\]\)\s*\{\s*box-shadow: inset var\(--size-2\) 0 0 0 var\(--c-warning\);/);
  });

  it('keeps the selected class beside the state', () => {
    const html = draw({ rowState: () => 'muted', selectedId: 'r1' });
    expect(html).toMatch(/class="data-table__row[^"]*--selected[^"]*"[^>]*data-state="muted"|data-state="muted"[^>]*--selected/);
  });
});

describe('rowHeight', () => {
  it('sets the row height variable from the size token', () => {
    const html = draw({ rowHeight: 'size-64' });
    expect(html).toContain('--dt-row-h:var(--size-64)');
    expect(html).toContain('data-row-height="size-64"');
  });
});

const probeView = (input) => {
  const seen = {};
  const Probe = () => {
    seen.view = useTableView({ rows: ROWS, schema: SCHEMA, ...input });
    return null;
  };
  renderToString(h(Probe));
  return seen.view;
};

describe('controlled sort', () => {
  it('sorts by the sort prop and asks the app instead of changing its own order', () => {
    const onSortChange = vi.fn();
    const sort = [{ path: 'name', dir: 'asc' }];
    const { table } = probeView({ sort, onSortChange });
    expect(table.sortedRows.map((row) => row.name)).toEqual(['Alpha', 'Bravo', 'Charlie']);

    table.setSingleSort('name');
    expect(onSortChange).toHaveBeenCalledOnce();
    expect(onSortChange).toHaveBeenCalledWith([{ path: 'name', dir: 'desc' }]);
    expect(table.sortedRows.map((row) => row.name)).toEqual(['Alpha', 'Bravo', 'Charlie']);
  });

  it('follows the prop when the app passes the new sort', () => {
    const { table } = probeView({ sort: [{ path: 'name', dir: 'desc' }], onSortChange: vi.fn() });
    expect(table.sortedRows.map((row) => row.name)).toEqual(['Charlie', 'Bravo', 'Alpha']);
  });

  it('draws the rows in the order of the sort prop', () => {
    expect(order(draw({ sort: [{ path: 'name', dir: 'desc' }] }))).toEqual(['Charlie', 'Bravo', 'Alpha']);
    expect(order(draw({ sort: [{ path: 'name', dir: 'asc' }] }))).toEqual(['Alpha', 'Bravo', 'Charlie']);
  });

  it('still keeps its own sort when no sort prop is given', () => {
    const { table } = probeView({});
    expect(table.sort).toEqual([]);
  });
});

const probeGroups = (input) => {
  const seen = {};
  const Probe = () => {
    seen.groups = useExpandedGroups({
      groupedRows: [], groupBy: [], sessionView: { scrollTop: 0, expanded: [], selectedId: null }, setSessionView: vi.fn(), ...input,
    });
    return null;
  };
  renderToString(h(Probe));
  return seen.groups;
};

describe('controlled expand', () => {
  const top = groupUid('', 'kind', 'a');
  const other = groupUid('', 'kind', 'b');

  it('reads the open groups from the prop and asks the app to change them', () => {
    const onChange = vi.fn();
    const setSessionView = vi.fn();
    const groups = probeGroups({ controlled: new Set([top]), onChange, setSessionView });
    expect(groups.isExpanded(top)).toBe(true);
    expect(groups.isExpanded(other)).toBe(false);

    groups.toggle(other);
    expect(onChange).toHaveBeenCalledOnce();
    expect([...onChange.mock.calls[0][0]].sort()).toEqual([top, other].sort());
    expect(setSessionView).not.toHaveBeenCalled();
    expect(groups.isExpanded(other)).toBe(false);
  });

  it('closes an open group by handing the app the set without it', () => {
    const onChange = vi.fn();
    const groups = probeGroups({ controlled: new Set([top, other]), onChange });
    groups.toggle(top);
    expect([...onChange.mock.calls[0][0]]).toEqual([other]);
    expect(groups.isExpanded(top)).toBe(true);
  });

  it('draws only the groups in the expanded prop', () => {
    const grouped = { fallbackGroupBy: ['kind'] };
    const closed = draw({ ...grouped, expanded: new Set() });
    expect(closed).not.toContain('Alpha');
    const opened = draw({ ...grouped, expanded: new Set([top]) });
    expect(opened).toContain('Alpha');
    expect(opened).toContain('Bravo');
    expect(opened).not.toContain('Charlie');
  });

  it('keeps writing the session view when the app passes no set', () => {
    const setSessionView = vi.fn();
    const groups = probeGroups({ setSessionView });
    groups.toggle(top);
    expect(setSessionView).toHaveBeenCalledWith(expect.objectContaining({ expanded: [top] }));
  });
});
