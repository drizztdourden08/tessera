/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { collectGroupUids } from '../src/composites/DataTable/behavior/collect-group-uids';
import { flattenRows } from '../src/composites/DataTable/behavior/flatten-rows';
import { groupUid } from '../src/composites/DataTable/behavior/group-uid';
import { useExpandedGroups } from '../src/composites/DataTable/behavior/useExpandedGroups';
import { renderedIndices } from '../src/composites/DataTable/behavior/rendered-indices';
import { visibleRange } from '../src/composites/DataTable/behavior/visible-range';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const group = (key, rows, path = 'state') => ({
  kind: 'group', level: 0, key, path, count: rows.length, children: rows.map((id) => ({ kind: 'row', row: { id } })),
});

const TREE = [group('Connected', ['a', 'b']), group('Known', ['c', 'd', 'e'])];
const UID = { connected: groupUid('', 'state', 'Connected'), known: groupUid('', 'state', 'Known') };

const mount = (extra = {}, tree = TREE) => {
  const holder = { view: { scrollTop: 0, expanded: [], selectedId: null } };
  const setSessionView = (next) => { holder.view = next; };
  const render = () => useExpandedGroups({
    groupedRows: tree, groupBy: ['state'], sessionView: holder.view, setSessionView, ...extra,
  });
  const hook = mountHook(render);
  hook.rerender(render);
  return { hook, holder };
};

describe('which groups start expanded', () => {
  it('opens every group when defaultExpanded is not given', () => {
    expect(collectGroupUids(TREE)).toEqual([UID.connected, UID.known]);
    const { holder } = mount();
    expect(holder.view.expanded).toEqual([UID.connected, UID.known]);
  });

  it('opens only the listed group keys', () => {
    expect(collectGroupUids(TREE, ['Connected'])).toEqual([UID.connected]);
    const { holder } = mount({ defaultExpanded: ['Connected'] });
    expect(holder.view.expanded).toEqual([UID.connected]);
  });

  it('asks a function for each group with its key and field path', () => {
    const rule = vi.fn((key) => key === 'Known');
    expect(collectGroupUids(TREE, rule)).toEqual([UID.known]);
    expect(rule).toHaveBeenCalledWith('Connected', 'state');
    expect(rule).toHaveBeenCalledWith('Known', 'state');
  });

  it('opens nothing for an empty list, and a nested group follows its own key', () => {
    expect(collectGroupUids(TREE, [])).toEqual([]);
    const nested = [{ ...group('Known', []), children: [group('Hollow Knight', ['c'], 'world')] }];
    expect(collectGroupUids(nested, ['Hollow Knight'])).toEqual([groupUid(UID.known, 'world', 'Hollow Knight')]);
  });

  it('waits for rows before it seeds a grouped table, then leaves later toggles alone', () => {
    const { holder } = mount({ defaultExpanded: ['Connected'] }, []);
    expect(holder.view.expanded).toEqual([]);
    const loaded = mount({ defaultExpanded: ['Connected'] });
    loaded.hook.act((groups) => groups.toggle(UID.known));
    expect(loaded.holder.view.expanded).toEqual([UID.connected, UID.known]);
  });

  it('reports a group as expanded from the session view', () => {
    const { hook } = mount({ defaultExpanded: ['Connected'] });
    expect(hook.current.isExpanded(UID.connected)).toBe(true);
    expect(hook.current.isExpanded(UID.known)).toBe(false);
  });
});

describe('the rows a long table draws', () => {
  const base = { rowHeight: 40, viewport: 400, count: 900, overscan: 2 };

  it('starts at the top with the visible rows and the overscan below', () => {
    expect(visibleRange({ ...base, scrollTop: 0 })).toEqual({ start: 0, end: 12 });
  });

  it('moves with the scroll position and keeps the overscan on both sides', () => {
    expect(visibleRange({ ...base, scrollTop: 4000 })).toEqual({ start: 98, end: 112 });
    expect(visibleRange({ ...base, scrollTop: 4010 })).toEqual({ start: 98, end: 113 });
  });

  it('stops at the last row', () => {
    expect(visibleRange({ ...base, scrollTop: 35600 })).toEqual({ start: 888, end: 900 });
    expect(visibleRange({ ...base, scrollTop: 99999 })).toEqual({ start: 900, end: 900 });
  });

  it('draws nothing for no rows, and everything when the height is unknown', () => {
    expect(visibleRange({ ...base, count: 0, scrollTop: 0 })).toEqual({ start: 0, end: 0 });
    expect(visibleRange({ ...base, rowHeight: 0, scrollTop: 0 })).toEqual({ start: 0, end: 900 });
  });

  it('adds the focused row when it sits outside the range, in row order', () => {
    const range = { start: 10, end: 13 };
    expect(renderedIndices(range, -1)).toEqual([10, 11, 12]);
    expect(renderedIndices(range, 11)).toEqual([10, 11, 12]);
    expect(renderedIndices(range, 2)).toEqual([2, 10, 11, 12]);
    expect(renderedIndices(range, 40)).toEqual([10, 11, 12, 40]);
  });

  it('flattens only the groups that are open', () => {
    const open = (uid) => uid === UID.connected;
    const items = flattenRows({ nodes: TREE, isExpanded: open, getRowId: (row) => row.id });
    expect(items.map((item) => item.key)).toEqual([`g:${UID.connected}`, 'r:a', 'r:b', `g:${UID.known}`]);
  });
});
