/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { flattenRows } from '../src/composites/DataTable/behavior/flatten-rows';
import { groupActionItems } from '../src/composites/DataTable/behavior/group-action-items';
import { groupUid } from '../src/composites/DataTable/behavior/group-uid';
import { rowAttrs } from '../src/composites/DataTable/behavior/row-attrs';
import { rowDragStart } from '../src/composites/DataTable/behavior/row-drag-start';
import { rowInsertion } from '../src/composites/DataTable/behavior/row-insertion';
import { rowRects } from '../src/composites/DataTable/behavior/row-rects';

const leaf = (id) => ({ kind: 'row', row: { id } });
const group = (key, children, level = 0, path = 'state') => ({
  kind: 'group', level, key, path, count: children.length, children,
});

const ids = (prefix, count) => Array.from({ length: count }, (_, at) => leaf(`${prefix}${at}`));
const TREE = [group('Connected', ids('c', 3)), group('Known', ids('k', 1000))];
const UID = { connected: groupUid('', 'state', 'Connected'), known: groupUid('', 'state', 'Known') };
const getRowId = (row) => row.id;
const open = (...uids) => (uid) => uids.includes(uid);

const rectsOf = (isExpanded) => rowRects({
  items: flattenRows({ nodes: TREE, isExpanded, getRowId }),
  rowHeight: 40,
  origin: { x: 0, y: 36 },
  width: 600,
  getRowId,
});

describe('group actions model', () => {
  const action = (id) => ({ id, label: id, onSelect: () => undefined });

  it('hands the group key and every row of the group to the app', () => {
    const groupActions = vi.fn(() => [action('select')]);
    const items = groupActionItems(TREE[0], groupActions);
    expect(groupActions).toHaveBeenCalledOnce();
    expect(groupActions.mock.calls[0][0]).toBe('Connected');
    expect(groupActions.mock.calls[0][1].map(getRowId)).toEqual(['c0', 'c1', 'c2']);
    expect(items.map((item) => item.id)).toEqual(['select']);
  });

  it('includes the rows of nested groups and of a collapsed group', () => {
    const nested = group('Outer', [group('Inner', ids('n', 2), 1, 'game'), leaf('side')]);
    const groupActions = vi.fn(() => []);
    groupActionItems(nested, groupActions);
    expect(groupActions.mock.calls[0][1].map(getRowId)).toEqual(['n0', 'n1', 'side']);
  });

  it('gives no actions when the app passes no groupActions', () => {
    expect(groupActionItems(TREE[0], undefined)).toEqual([]);
  });
});

describe('row rects from the layout', () => {
  it('gives a rect for every row of an open group, not only the drawn ones', () => {
    const rects = rectsOf(open(UID.connected, UID.known));
    expect(rects).toHaveLength(1003);
    expect(rects[0]).toEqual({ key: 'c0', rect: { x: 0, y: 36 + 40, width: 600, height: 40 } });
    expect(rects[1002].key).toBe('k999');
    expect(rects[1002].rect.y).toBe(36 + 40 * 1004);
  });

  it('leaves out the rows of a collapsed group and moves the next group up', () => {
    const rects = rectsOf(open(UID.known));
    expect(rects.map(({ key }) => key).filter((key) => key.startsWith('c'))).toEqual([]);
    expect(rects).toHaveLength(1000);
    expect(rects[0].key).toBe('k0');
    expect(rects[0].rect.y).toBe(36 + 40 * 2);
    const closed = rectsOf(open(UID.connected));
    expect(closed.map(({ key }) => key)).toEqual(['c0', 'c1', 'c2']);
  });

  it('gives nothing when every group is collapsed', () => {
    expect(rectsOf(open())).toEqual([]);
  });
});

describe('drop index under virtualization', () => {
  const rects = rectsOf(open(UID.connected, UID.known));
  const yOfRow = (at, fraction) => rects[at].rect.y + rects[at].rect.height * fraction;

  it('counts rows by their place in the model, far beyond any drawn window', () => {
    expect(rowInsertion(rects, yOfRow(0, 0.25))).toBe(0);
    expect(rowInsertion(rects, yOfRow(500, 0.25))).toBe(500);
    expect(rowInsertion(rects, yOfRow(500, 0.75))).toBe(501);
  });

  it('skips group headers between rows', () => {
    expect(rowInsertion(rects, yOfRow(2, 0.75))).toBe(3);
    expect(rowInsertion(rects, rects[3].rect.y - 10)).toBe(3);
  });

  it('puts a drop above the first row first and below the last row last', () => {
    expect(rowInsertion(rects, 0)).toBe(0);
    expect(rowInsertion(rects, yOfRow(1002, 0.9))).toBe(1003);
    expect(rowInsertion([], 100)).toBe(0);
  });

  it('follows a collapsed group', () => {
    const shown = rectsOf(open(UID.known));
    expect(rowInsertion(shown, shown[10].rect.y + 30)).toBe(11);
  });
});

describe('row drag attributes', () => {
  const reorder = (dragging) => ({
    total: 5,
    indexOf: (id) => Number(id.slice(1)),
    drag: { dragging, dropMark: (index) => (index === 2 ? 'before' : undefined) },
  });

  it('always marks the row for a marquee', () => {
    expect(rowAttrs({ id: 'r1' }, 'r1', {})).toEqual({ 'data-marquee-key': 'r1' });
  });

  it('marks the position, the key and the drop mark of a reorderable row', () => {
    const attrs = rowAttrs({ id: 'r2' }, 'r2', { reorder: reorder(null) });
    expect(attrs['data-reorder-index']).toBe(2);
    expect(attrs['data-reorder-key']).toBe('r2');
    expect(attrs['data-drop']).toBe('before');
    expect(attrs['data-dragging']).toBeUndefined();
    expect(rowAttrs({ id: 'r3' }, 'r3', { reorder: reorder(3) })['data-dragging']).toBe('yes');
  });

  it('makes a row draggable only when the app gives drag data', () => {
    const rowDragData = (row) => ({ 'text/plain': row.id });
    const attrs = rowAttrs({ id: 'r1' }, 'r1', { rowDragData });
    expect(attrs.draggable).toBe(true);
    expect(typeof attrs.onDragStart).toBe('function');
  });
});

describe('row drag start', () => {
  const eventOf = (target, currentTarget) => ({
    target, currentTarget, preventDefault: vi.fn(), dataTransfer: { effectAllowed: '', setData: vi.fn() },
  });

  it('writes every entry of the app data to the transfer', () => {
    const row = {};
    const event = eventOf(row, row);
    rowDragStart(event, { 'text/plain': 'r1', 'application/x-sprite': '7' }, false);
    expect(event.dataTransfer.setData).toHaveBeenCalledWith('text/plain', 'r1');
    expect(event.dataTransfer.setData).toHaveBeenCalledWith('application/x-sprite', '7');
    expect(event.dataTransfer.effectAllowed).toBe('copyMove');
  });

  it('cancels the drag while the grip reorders the row', () => {
    const row = {};
    const event = eventOf(row, row);
    rowDragStart(event, { 'text/plain': 'r1' }, true);
    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(event.dataTransfer.setData).not.toHaveBeenCalled();
  });

  it('leaves a drag that starts on a link inside the row alone', () => {
    const event = eventOf({}, {});
    rowDragStart(event, { 'text/plain': 'r1' }, false);
    expect(event.dataTransfer.setData).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
