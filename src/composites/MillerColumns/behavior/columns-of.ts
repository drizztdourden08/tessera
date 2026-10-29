/* @layer renderer-components @kind logic */
import type { MillerColumn } from '../MillerColumns.type';

const columnsOf = <T,>(
  items: readonly T[],
  path: readonly string[],
  getKey: (item: T) => string,
  getChildren: (item: T) => readonly T[] | undefined,
): MillerColumn<T>[] => {
  const columns: MillerColumn<T>[] = [];
  let level: readonly T[] | undefined = items;
  for (let index = 0; level !== undefined; index += 1) {
    const openKey: string | undefined = path[index];
    columns.push({ index, items: level, openKey });
    const open: T | undefined = openKey === undefined ? undefined : level.find((item) => getKey(item) === openKey);
    level = open === undefined ? undefined : getChildren(open);
  }
  return columns;
};

export { columnsOf };
