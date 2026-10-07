/* @layer renderer-components @kind hook */
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useReport } from '../../../primitives/dom/useReport';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { KeyValueEditorProps, KeyValueEntry, KeyValueRow, KeyValueRows } from '../KeyValueEditor.type';
import { newEntry } from './new-entry';
import { recordOf } from './record-of';
import { rowsOf } from './rows-of';
import { rowsProblem } from './rows-problem';

const same = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

const useKeyValueRows = (props: KeyValueEditorProps): KeyValueRows => {
  const { value, onChange, keys } = props;
  const strings = useTesseraStrings();
  const stamp = useId();
  const count = useRef(0);
  const [rows, setRows] = useState<readonly KeyValueRow[]>(() => rowsOf(value, stamp));
  const held = useRef<unknown>(value);
  useEffect(() => {
    if (same(value, held.current)) return;
    held.current = value;
    const fresh = `${stamp}-${String(count.current += 1)}`;
    setRows((before) => rowsOf(value, fresh, before));
  }, [value, stamp]);
  const problem = useMemo(() => rowsProblem(rows, keys, strings), [rows, keys, strings]);
  useReport(problem.message, props.onProblem);
  const commit = (next: readonly KeyValueRow[]) => {
    setRows(next);
    if (rowsProblem(next, keys, strings).message !== null) return;
    held.current = recordOf(next);
    onChange(recordOf(next));
  };
  const patch = (id: string, change: Partial<KeyValueRow>) => commit(rows.map((row) => (row.id === id ? { ...row, ...change } : row)));
  return {
    rows, problem,
    setKey: (id, key) => patch(id, { key }),
    setValue: (id, entry: KeyValueEntry) => patch(id, { value: entry }),
    remove: (id) => commit(rows.filter((row) => row.id !== id)),
    add: (key) => commit([...rows, { id: `${stamp}-new-${String(count.current += 1)}`, key, value: newEntry(props) }]),
  };
};

export { useKeyValueRows };
