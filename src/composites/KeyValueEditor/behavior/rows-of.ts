/* @layer renderer-components @kind util */
import type { KeyValueRecord, KeyValueRow } from '../KeyValueEditor.type';

const rowsOf = (value: KeyValueRecord, stamp: string): KeyValueRow[] =>
  Object.entries(value).map(([key, entry], index) => ({ id: `${stamp}-${index}`, key, value: entry }));

export { rowsOf };
