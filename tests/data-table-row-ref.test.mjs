/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { attachRef } from '../src/composites/DataTable/behavior/attach-ref';
import { useRowRef } from '../src/composites/DataTable/behavior/useRowRef';

const slots = vi.hoisted(() => ({ list: [], at: 0 }));

vi.mock('react', async (importOriginal) => {
  const real = await importOriginal();
  const take = (make) => {
    const slot = slots.list[slots.at] ?? make();
    slots.list[slots.at] = slot;
    slots.at += 1;
    return slot;
  };
  return {
    ...real,
    useRef: (initial) => take(() => ({ current: initial })),
    useCallback: (fn, deps) => {
      const slot = take(() => ({ fn, deps }));
      if (slot.deps.length !== deps.length || slot.deps.some((dep, at) => dep !== deps[at])) {
        slot.fn = fn;
        slot.deps = deps;
      }
      return slot.fn;
    },
  };
});

const mount = () => {
  const row = { list: [], at: 0 };
  return (input) => {
    slots.list = row.list;
    slots.at = 0;
    return useRowRef(input);
  };
};

const ROWS = Array.from({ length: 5 }, (_, at) => ({ id: `r${at}`, name: `Row ${at}` }));

describe('attachRef', () => {
  it('sets an object ref and clears it', () => {
    const target = { current: null };
    const element = {};
    const detach = attachRef(target, element);
    expect(target.current).toBe(element);
    detach();
    expect(target.current).toBeNull();
  });

  it('calls a callback ref with the element, then with null', () => {
    const target = vi.fn();
    const element = {};
    attachRef(target, element)();
    expect(target.mock.calls).toEqual([[element], [null]]);
  });

  it('runs the cleanup a callback ref returns instead of calling it with null', () => {
    const cleanup = vi.fn();
    const target = vi.fn(() => cleanup);
    attachRef(target, {})();
    expect(cleanup).toHaveBeenCalledOnce();
    expect(target).toHaveBeenCalledOnce();
  });
});

describe('row ref', () => {
  it('gives no ref to a row when the host passes none', () => {
    expect(mount()({ rowRef: undefined, row: ROWS[0], id: 'r0' })).toBeUndefined();
  });

  it('hands the row element to the host ref asked for that row and key', () => {
    const rowRef = vi.fn(() => vi.fn());
    const render = mount();
    const element = {};
    render({ rowRef, row: ROWS[2], id: 'r2' })(element);
    expect(rowRef).toHaveBeenCalledWith(ROWS[2], 'r2');
  });

  it('reaches every rendered row and releases the rows that scroll out', () => {
    const refs = new Map(ROWS.map((row) => [row.id, vi.fn()]));
    const rowRef = (row, key) => refs.get(key);
    const rows = ROWS.map((row) => ({ row, element: { key: row.id }, render: mount() }));
    const callbacks = rows.map(({ row, render }) => render({ rowRef, row, id: row.id }));
    rows.forEach(({ element }, at) => callbacks[at](element));
    rows.forEach(({ element, row }) => expect(refs.get(row.id)).toHaveBeenLastCalledWith(element));

    [0, 1].forEach((at) => callbacks[at](null));
    expect(refs.get('r0')).toHaveBeenLastCalledWith(null);
    expect(refs.get('r1')).toHaveBeenLastCalledWith(null);
    expect(refs.get('r2')).not.toHaveBeenLastCalledWith(null);
  });

  it('keeps the same callback while the key stays, so a new host ref does not churn', () => {
    const render = mount();
    const first = render({ rowRef: () => vi.fn(), row: ROWS[0], id: 'r0' });
    const second = render({ rowRef: () => vi.fn(), row: ROWS[0], id: 'r0' });
    expect(second).toBe(first);
  });

  it('uses the latest host ref when the element mounts', () => {
    const render = mount();
    const old = vi.fn();
    const next = vi.fn();
    render({ rowRef: () => old, row: ROWS[0], id: 'r0' });
    const callback = render({ rowRef: () => next, row: ROWS[0], id: 'r0' });
    const element = {};
    callback(element);
    expect(next).toHaveBeenCalledWith(element);
    expect(old).not.toHaveBeenCalled();
  });
});
