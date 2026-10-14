/* @layer renderer-components @kind logic */
import type { ColumnsInput } from './columns-of.type';

const columnsOf = (input: ColumnsInput): string => {
  const { size, ratio, listFolded, detailFolded } = input;
  if (listFolded) return 'auto minmax(0, 1fr)';
  if (detailFolded) return 'minmax(0, 1fr) auto';
  if (ratio) return `minmax(0, ${size}fr) auto minmax(0, ${100 - size}fr)`;
  return `${size}px auto minmax(0, 1fr)`;
};

export { columnsOf };
