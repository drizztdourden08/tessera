/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useKeyValueRows } from '../src/composites/KeyValueEditor/behavior/useKeyValueRows';
import { usePathInput } from '../src/composites/PathInput/behavior/usePathInput';
import { TESSERA_STRINGS } from '../src/primitives/strings';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks, useId: () => 'r1', useContext: () => ({}) }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraStrings', async () => ({ useTesseraStrings: () => (TESSERA_STRINGS) }));

describe('KeyValueEditor onProblem', () => {
  const mount = (value, extra = {}) => {
    const calls = { onChange: vi.fn(), onProblem: vi.fn() };
    const view = mountHook(() => useKeyValueRows({ value, keys: ['Lamp', 'Hookshot'], ...calls, ...extra }));
    return { calls, view };
  };

  it('reports the problem of the rows, then null once they are fixed', () => {
    const { calls, view } = mount({ 'Lamp oil': 2 });
    expect(calls.onProblem).toHaveBeenLastCalledWith('Lamp oil is not on the list.');
    const id = view.current.rows[0].id;
    view.act((rows) => rows.setKey(id, 'Lamp'));
    expect(calls.onProblem).toHaveBeenLastCalledWith(null);
    expect(calls.onChange).toHaveBeenLastCalledWith({ Lamp: 2 });
  });

  it('reports a name listed twice and an empty name, and holds onChange meanwhile', () => {
    const { calls, view } = mount({ Lamp: 1, Hookshot: 1 });
    expect(calls.onProblem).toHaveBeenLastCalledWith(null);
    const [first, second] = view.current.rows;
    view.act((rows) => rows.setKey(second.id, 'Lamp'));
    expect(calls.onProblem).toHaveBeenLastCalledWith('Lamp is listed twice.');
    view.act((rows) => rows.setKey(first.id, ''));
    expect(calls.onProblem).toHaveBeenLastCalledWith('Every row needs a name.');
    expect(calls.onChange).not.toHaveBeenCalled();
  });

  it('reports only when the problem changes', () => {
    const { calls, view } = mount({ 'Lamp oil': 2, Rope: 1 });
    const count = calls.onProblem.mock.calls.length;
    view.act((rows) => rows.setValue(rows.rows[0].id, 3));
    expect(calls.onProblem.mock.calls.length).toBe(count);
  });
});

describe('PathInput onBlur', () => {
  it('hands the blur event to the app as the box loses focus', () => {
    const onBlur = vi.fn();
    const view = mountHook(() => usePathInput({ value: 'C:\\Games\\Bram.txt', onChange: vi.fn(), onBlur }));
    const event = { type: 'blur' };
    view.act((path) => path.setFocused(true));
    view.act((path) => path.blur(event));
    expect(onBlur).toHaveBeenCalledWith(event);
  });

  it('works without onBlur', () => {
    const view = mountHook(() => usePathInput({ value: null, onChange: vi.fn() }));
    const blur = () => view.act((path) => path.blur({ type: 'blur' }));
    expect(blur).not.toThrow();
  });
});
