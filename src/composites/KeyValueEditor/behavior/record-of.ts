/* @layer renderer-components @kind util */
import type { KeyValueEntry, KeyValueRow } from '../KeyValueEditor.type';

const recordOf = (rows: readonly KeyValueRow[]): Record<string, KeyValueEntry> =>
  Object.fromEntries(rows.map((row) => [row.key.trim(), row.value]));

export { recordOf };
