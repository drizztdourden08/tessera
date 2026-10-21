/* @layer renderer-components @kind logic */
import type { ColumnsInput } from './columns-of.type';

const columnsOf = (input: ColumnsInput): string => {
  const { size, shares, folded } = input;
  if (folded === 'start') return 'auto 0 minmax(0, 1fr)';
  if (folded === 'end') return 'minmax(0, 1fr) 0 auto';
  if (shares) return `minmax(0, ${size}fr) 0 minmax(0, ${100 - size}fr)`;
  return `${size}px 0 minmax(0, 1fr)`;
};

export { columnsOf };
