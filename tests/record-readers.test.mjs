/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useRecordReaders } from '../src/composites/RecordEditor/behavior/useRecordReaders';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const FIELD = { path: 'place', label: 'Place', kind: 'idRef', optional: false, targetKind: 'place' };

describe('IdRefOptionResolver', () => {
  it('gets the working record as a third argument, so a reference narrows by a sibling field', () => {
    const resolve = vi.fn((targetKind, field, record) => (record.region === 'marsh' ? [{ value: 'place-3', label: 'Ferry landing' }] : []));
    const state = { working: { region: 'coast', place: 'place-1' } };
    const draw = () => useRecordReaders(state.working, { resolveIdRefOptions: resolve });
    const readers = mountHook(draw);
    expect(readers.current.readIdRefOptions('place', FIELD)).toEqual([]);
    state.working = { region: 'marsh', place: 'place-1' };
    readers.rerender(draw);
    expect(readers.current.readIdRefOptions('place', FIELD)).toEqual([{ value: 'place-3', label: 'Ferry landing' }]);
    expect(resolve).toHaveBeenLastCalledWith('place', FIELD, state.working);
    expect(readers.current.readValue('region')).toBe('marsh');
  });

  it('stays undefined when the app passes no resolver, so a reference falls back to a plain input', () => {
    expect(mountHook(() => useRecordReaders({}, {})).current.readIdRefOptions).toBeUndefined();
  });
});
