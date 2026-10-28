/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useSelectionModel } from '../src/composites/selection/useSelectionModel';

const ORDER = ['a', 'b', 'c', 'd', 'e', 'f'];
const PLAIN = { shiftKey: false, ctrlKey: false, metaKey: false };
const SHIFT = { shiftKey: true, ctrlKey: false, metaKey: false };
const CTRL = { shiftKey: false, ctrlKey: true, metaKey: false };
const CTRL_SHIFT = { shiftKey: true, ctrlKey: true, metaKey: false };

const hooks = vi.hoisted(() => ({ refs: [], cursor: 0 }));

vi.mock('react', async (original) => ({
  ...(await original()),
  useMemo: (make) => make(),
  useRef: (initial) => {
    const at = hooks.cursor;
    hooks.cursor += 1;
    hooks.refs[at] ??= { current: initial };
    return hooks.refs[at];
  },
}));

const modelOf = (extra = {}) => {
  hooks.refs = [];
  const state = { selected: new Set(), changes: [] };
  const fresh = () => {
    hooks.cursor = 0;
    return useSelectionModel({
      order: ORDER,
      selected: state.selected,
      onChange: (keys) => {
        state.changes.push([...keys]);
        state.selected = new Set(keys);
      },
      ...extra,
    });
  };
  return { state, fresh };
};

const key = (name, held = {}, extra = {}) => {
  const target = {};
  return { key: name, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, timeStamp: 0, target, currentTarget: target, preventDefault: vi.fn(), ...held, ...extra };
};

describe('useSelectionModel', () => {
  it('picks one on a click and calls onPick', () => {
    const onPick = vi.fn();
    const { state, fresh } = modelOf({ onPick });
    fresh().click('c', PLAIN);
    expect(state.changes).toEqual([['c']]);
    expect(onPick).toHaveBeenCalledWith('c');
  });

  it('toggles on Ctrl and extends from the anchor on Shift', () => {
    const { state, fresh } = modelOf();
    fresh().click('b', PLAIN);
    fresh().click('d', SHIFT);
    expect([...state.selected]).toEqual(['b', 'c', 'd']);
    fresh().click('f', CTRL);
    expect([...state.selected].sort()).toEqual(['b', 'c', 'd', 'f']);
    fresh().click('a', CTRL_SHIFT);
    expect([...state.selected].sort()).toEqual(ORDER);
  });

  it('keeps the anchor of a plain click while Shift extends and shrinks the range', () => {
    const { state, fresh } = modelOf();
    fresh().click('c', PLAIN);
    fresh().click('f', SHIFT);
    expect([...state.selected]).toEqual(['c', 'd', 'e', 'f']);
    fresh().click('d', SHIFT);
    expect([...state.selected]).toEqual(['c', 'd']);
  });

  it('starts a range from the seed when nothing was clicked', () => {
    const { state, fresh } = modelOf({ seed: 'b' });
    fresh().click('d', SHIFT);
    expect([...state.selected]).toEqual(['b', 'c', 'd']);
  });

  it('takes a rectangle when the cells are known', () => {
    const cells = { a: [0, 0], b: [0, 1], c: [1, 0], d: [1, 1], e: [2, 0], f: [2, 1] };
    const { state, fresh } = modelOf({ cellOf: (name) => ({ row: cells[name][0], column: cells[name][1] }) });
    fresh().click('b', PLAIN);
    fresh().click('e', SHIFT);
    expect([...state.selected].sort()).toEqual(ORDER);
  });

  it('skips holes in a click, a range and select all', () => {
    const { state, fresh } = modelOf({ isHole: (name) => name === 'c' });
    fresh().click('c', PLAIN);
    expect(state.changes).toEqual([]);
    fresh().click('a', PLAIN);
    fresh().click('e', SHIFT);
    expect([...state.selected]).toEqual(['a', 'b', 'd', 'e']);
    fresh().selectAll();
    expect([...state.selected]).toEqual(['a', 'b', 'd', 'e', 'f']);
  });
});

describe('the keys of useSelectionModel', () => {
  it('selects all with Ctrl+A and clears with Escape', () => {
    const { state, fresh } = modelOf();
    const all = key('a', { ctrlKey: true });
    fresh().onKeyDown(all, 'b');
    expect(all.preventDefault).toHaveBeenCalled();
    expect([...state.selected]).toEqual(ORDER);
    fresh().onKeyDown(key('Escape'), 'b');
    expect([...state.selected]).toEqual([]);
  });

  it('leaves Escape alone when nothing is selected, and keys typed in a child', () => {
    const { state, fresh } = modelOf();
    const escape = key('Escape');
    fresh().onKeyDown(escape, 'a');
    expect(escape.preventDefault).not.toHaveBeenCalled();
    expect(state.changes).toEqual([]);
    fresh().onKeyDown(key(' ', {}, { target: {} }), 'a');
    expect(state.changes).toEqual([]);
  });

  it('toggles with Space and extends with Shift+Space', () => {
    const { state, fresh } = modelOf();
    fresh().onKeyDown(key(' '), 'b');
    expect([...state.selected]).toEqual(['b']);
    fresh().onKeyDown(key(' ', { shiftKey: true }), 'd');
    expect([...state.selected]).toEqual(['b', 'c', 'd']);
    fresh().onKeyDown(key(' '), 'c');
    expect([...state.selected]).toEqual(['b', 'd']);
  });

  it('moves focus to the next label that matches what is typed', () => {
    const labels = { a: 'Ant', b: 'Bee', c: 'Cat', d: 'Cow', e: 'Dog', f: 'Eel' };
    const onFocusKey = vi.fn();
    const { fresh } = modelOf({ labelOf: (name) => labels[name], onFocusKey });
    fresh().onKeyDown(key('c', {}, { timeStamp: 100 }), 'a');
    expect(onFocusKey).toHaveBeenLastCalledWith('c');
    fresh().onKeyDown(key('o', {}, { timeStamp: 300 }), 'c');
    expect(onFocusKey).toHaveBeenLastCalledWith('d');
    fresh().onKeyDown(key('e', {}, { timeStamp: 5000 }), 'd');
    expect(onFocusKey).toHaveBeenLastCalledWith('f');
  });

  it('steps a keyboard range from the key that held focus', () => {
    const { state, fresh } = modelOf();
    fresh().step('b', 'c', false);
    expect([...state.selected]).toEqual(['b', 'c']);
    fresh().step('c', 'd', false);
    expect([...state.selected]).toEqual(['b', 'c', 'd']);
  });

  it('reports the state of the select-all box and checks all', () => {
    const { state, fresh } = modelOf();
    expect(fresh().allState).toBe('none');
    fresh().checkAll();
    expect(state.selected.size).toBe(ORDER.length);
    expect(fresh().allState).toBe('all');
  });
});
