/* @layer renderer-components @kind util */
import type { KeyValueRecord, KeyValueRow } from '../KeyValueEditor.type';

const rowsOf = (value: KeyValueRecord, stamp: string, before: readonly KeyValueRow[] = []): KeyValueRow[] => {
  const entries = Object.entries(value);
  const byKey = new Map(before.map((row) => [row.key.trim(), row.id]));
  const used = new Set(entries.flatMap(([key]) => byKey.get(key) ?? []));
  return entries.map(([key, entry], index) => {
    const spare = before[index]?.id;
    const id = byKey.get(key) ?? (spare !== undefined && !used.has(spare) ? spare : `${stamp}-${index}`);
    used.add(id);
    return { id, key, value: entry };
  });
};

export { rowsOf };
