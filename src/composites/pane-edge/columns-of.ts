/* @layer renderer-components @kind logic */
import type { ColumnsInput } from './columns-of.type';

const columnsOf = (input: ColumnsInput): string => {
  const { size, shares, folded } = input;
  if (folded === 'start') return 'auto auto minmax(0, 1fr)';
  if (folded === 'end') return 'minmax(0, 1fr) auto auto';
  if (shares) return `minmax(0, ${size}fr) auto minmax(0, ${100 - size}fr)`;
  return `${size}px auto minmax(0, 1fr)`;
};

export { columnsOf };
