/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { groupUid } from '../src/composites/DataTable';
import { useExpandedGroups } from '../src/composites/DataTable/behavior/useExpandedGroups';
import { useTableView } from '../src/composites/DataTable/behavior/useTableView';
import { buildSchema } from '../src/data';

const ROWS = [
  { id: 'r1', name: 'Bravo', kind: 'a' },
  { id: 'r2', name: 'Alpha', kind: 'a' },
  { id: 'r3', name: 'Charlie', kind: 'b' },
];
const SCHEMA = buildSchema(ROWS, { kinds: { name: 'string', kind: 'string' }, hidden: ['id'] });

const probeView = (input) => {
  const seen = {};
  const Probe = () => {
    seen.view = useTableView({ rows: ROWS, schema: SCHEMA, ...input });
    return null;
  };
  renderToString(h(Probe));
  return seen.view;
};

describe('K1 controlled sort', { tags: ['critical'] }, () => {
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

describe('K1 controlled expand', { tags: ['critical'] }, () => {
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

  it('keeps writing the session view when the app passes no set', () => {
    const setSessionView = vi.fn();
    const groups = probeGroups({ setSessionView });
    groups.toggle(top);
    expect(setSessionView).toHaveBeenCalledWith(expect.objectContaining({ expanded: [top] }));
  });
});
