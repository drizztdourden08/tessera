/* @layer renderer-components @kind logic */
import type { ListSizing, ListSizingInput } from './list-sizing.type';

const listSizing = (input: ListSizingInput): ListSizing => {
  const { orientation, rowSize, rowHeight, itemSize } = input;
  const sizeOf = typeof itemSize === 'function' ? itemSize : undefined;
  const itemToken = typeof itemSize === 'function' ? undefined : itemSize;
  return { sizeOf, itemToken, sizeKey: (orientation === 'horizontal' ? itemToken : rowHeight) ?? rowSize };
};

export { listSizing };
