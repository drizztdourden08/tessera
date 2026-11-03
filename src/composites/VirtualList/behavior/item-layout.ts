/* @layer renderer-components @kind logic */
import { offsetIndex } from './offset-index';
import type { ItemLayout } from './item-layout.type';

const clampIndex = (index: number, count: number): number => Math.min(Math.max(index, 0), count);

const itemLayout = (count: number, offsets: readonly number[] | undefined, size: number): ItemLayout => {
  if (offsets) {
    return {
      count,
      total: offsets[count] ?? 0,
      startOf: (index) => offsets[clampIndex(index, count)] ?? 0,
      sizeOf: (index) => (offsets[index + 1] ?? 0) - (offsets[index] ?? 0),
      indexAt: (at) => offsetIndex(offsets, at),
    };
  }
  return {
    count,
    total: count * size,
    startOf: (index) => index * size,
    sizeOf: () => size,
    indexAt: (at) => (size > 0 ? clampIndex(Math.floor(at / size), Math.max(0, count - 1)) : 0),
  };
};

export { itemLayout };
