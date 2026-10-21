/* @layer renderer-components @kind logic */
import type { ColumnsInput } from './columns-of.type';

const columnsOf = (input: ColumnsInput): string => {
  const { size, shares, folded, foldedSize = 'auto', edgeSize = 'auto' } = input;
  if (folded === 'start') return `${foldedSize} ${edgeSize} minmax(0, 1fr)`;
  if (folded === 'end') return `minmax(0, 1fr) ${edgeSize} ${foldedSize}`;
  if (shares) return `minmax(0, ${size}fr) ${edgeSize} minmax(0, ${100 - size}fr)`;
  return `${size}px ${edgeSize} minmax(0, 1fr)`;
};

export { columnsOf };
